import fs from 'fs/promises';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data/projects.json');

// KV credentials — only used on Vercel
const KV_URL = process.env.KV_REST_API_URL;
const KV_TOKEN = process.env.KV_REST_API_TOKEN;
const PROJECTS_KEY = 'portfolio_projects';
const isKvConfigured = !!(KV_URL && KV_TOKEN);

// Lightweight KV access via REST (no SDK needed — avoids env-var throw at startup)
async function kvGet<T>(key: string): Promise<T | null> {
  try {
    const res = await fetch(`${KV_URL}/get/${key}`, {
      headers: { Authorization: `Bearer ${KV_TOKEN}` },
      cache: 'no-store',
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.result as T | null;
  } catch {
    return null;
  }
}

async function kvSet(key: string, value: unknown): Promise<void> {
  const res = await fetch(`${KV_URL}/set/${key}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${KV_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(value),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`KV set failed: ${text}`);
  }
}

export interface CustomLink {
  label: string;
  url: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  category: string;
  image: string;
  images: string[];
  featured: boolean;
  link?: string;
  github?: string;
  customLinks?: CustomLink[];
}

export async function getProjects(): Promise<Project[]> {
  if (isKvConfigured) {
    try {
      const projects = await kvGet<Project[]>(PROJECTS_KEY);
      if (projects && projects.length > 0) return projects;

      // KV empty — seed from JSON file
      const fileData = await fs.readFile(DATA_PATH, 'utf-8');
      const parsed: Project[] = JSON.parse(fileData);
      if (parsed.length > 0) await kvSet(PROJECTS_KEY, parsed);
      return parsed;
    } catch (error) {
      console.error('KV getProjects error:', error);
    }
  }

  // Local JSON fallback
  try {
    const fileData = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(fileData);
  } catch {
    return [];
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  if (!projects || !Array.isArray(projects)) {
    throw new Error('Invalid projects data format');
  }

  if (isKvConfigured) {
    await kvSet(PROJECTS_KEY, projects);
    // Also try local write (silently fails on Vercel read-only FS)
    try { await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2), 'utf-8'); } catch {}
    return;
  }

  // Local-only: write to JSON file
  await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2), 'utf-8');
}

export async function addProject(project: Omit<Project, 'id'>): Promise<Project> {
  const projects = await getProjects();
  const newProject: Project = { ...project, id: Date.now().toString() };
  projects.push(newProject);
  await saveProjects(projects);
  return newProject;
}

export async function updateProject(id: string, updatedProject: Partial<Project>): Promise<Project | null> {
  const projects = await getProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return null;
  projects[index] = { ...projects[index], ...updatedProject };
  await saveProjects(projects);
  return projects[index];
}

export async function deleteProject(id: string): Promise<boolean> {
  const projects = await getProjects();
  const filtered = projects.filter((p) => p.id !== id);
  if (filtered.length === projects.length) return false;
  await saveProjects(filtered);
  return true;
}
