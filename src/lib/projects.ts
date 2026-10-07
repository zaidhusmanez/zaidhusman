import fs from 'fs/promises';
import path from 'path';

const PROJECTS_KEY = 'portfolio_projects';
const DATA_PATH = path.join(process.cwd(), 'src/data/projects.json');

// Only use Vercel KV if credentials are configured
const isKvConfigured = !!(process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN);

async function getKv() {
  if (!isKvConfigured) return null;
  const { kv } = await import('@vercel/kv');
  return kv;
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
  const kv = await getKv();

  if (kv) {
    try {
      // 1. Try to get projects from KV (Live persistence)
      let projects = await kv.get<Project[]>(PROJECTS_KEY);

      // 2. If KV is empty, fall back to JSON file and seed KV
      if (!projects) {
        try {
          const fileData = await fs.readFile(DATA_PATH, 'utf-8');
          projects = JSON.parse(fileData);

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
    }
  }

  // No KV or KV failed — use local JSON file
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

  const kv = await getKv();

  if (kv) {
    try {
      await kv.set(PROJECTS_KEY, projects);
    } catch (kvError: any) {
      console.error('KV Save Error:', kvError);
      if (kvError.message?.includes('token') || kvError.message?.includes('URL')) {
        throw new Error(`KV Storage not configured: ${kvError.message}`);
      }
      throw kvError;
    }
  }

  // Always try to write to local JSON (works in dev, silently skipped on Vercel)
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2), 'utf-8');
  } catch (fileError) {
    if (!kv) {
      // If KV isn't configured either, this is a real error
      throw new Error('Failed to save projects: no KV configured and local file write failed');
    }
    console.log('Local file write skipped (normal on Vercel)');
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
