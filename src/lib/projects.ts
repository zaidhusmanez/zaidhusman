import { kv } from '@vercel/kv';
import fs from 'fs/promises';
import path from 'path';

const PROJECTS_KEY = 'portfolio_projects';
const DATA_PATH = path.join(process.cwd(), 'src/data/projects.json');

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
  try {
    // 1. Try to get projects from KV (Live persistence)
    let projects = await kv.get<Project[]>(PROJECTS_KEY);

    // 2. If KV is empty, fall back to JSON file (Initial data)
    if (!projects) {
      try {
        const fileData = await fs.readFile(DATA_PATH, 'utf-8');
        projects = JSON.parse(fileData);
        
        // Seed KV with initial data if available
        if (projects && projects.length > 0) {
          await kv.set(PROJECTS_KEY, projects);
        }
      } catch (fileError) {
        console.error('JSON file error:', fileError);
        return [];
      }
    }

    return projects || [];
  } catch (error) {
    console.error('KV Storage error:', error);
    // Even if KV fails, try one last time from the JSON file
    try {
      const fileData = await fs.readFile(DATA_PATH, 'utf-8');
      return JSON.parse(fileData);
    } catch {
      return [];
    }
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  try {
    // Always save to KV for live site persistence
    await kv.set(PROJECTS_KEY, projects);
    
    // Also try to save to local JSON file for local dev (might fail on Vercel, which is fine)
    try {
      await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2), 'utf-8');
    } catch {
      // Ignore write errors on Vercel's read-only filesystem
    }
  } catch (error) {
    console.error('Error saving projects data:', error);
    throw new Error('Failed to save projects to permanent storage');
  }
}

export async function addProject(project: Omit<Project, 'id'>): Promise<Project> {
  const projects = await getProjects();
  const newProject = {
    ...project,
    id: Date.now().toString(),
  };
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
  const filteredProjects = projects.filter((p) => p.id !== id);
  if (filteredProjects.length === projects.length) return false;

  await saveProjects(filteredProjects);
  return true;
}
