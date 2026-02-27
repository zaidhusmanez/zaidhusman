import fs from 'fs/promises';
import path from 'path';

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
  image: string; // Keeping for backward compatibility (main image)
  images: string[]; // Support up to 5 images
  featured: boolean;
  link?: string;
  github?: string;
  customLinks?: CustomLink[];
}

export async function getProjects(): Promise<Project[]> {
  try {
    const data = await fs.readFile(DATA_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error reading projects data:', error);
    return [];
  }
}

export async function saveProjects(projects: Project[]): Promise<void> {
  try {
    await fs.writeFile(DATA_PATH, JSON.stringify(projects, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error saving projects data:', error);
    throw new Error('Failed to save projects');
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
