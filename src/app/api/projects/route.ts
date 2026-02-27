import { getProjects, addProject, updateProject, deleteProject } from '@/lib/projects';
import { getSession } from '@/lib/auth';
import { NextRequest, NextResponse } from 'next/server';

export async function GET() {
  const projects = await getProjects();
  return NextResponse.json(projects);
}

export async function POST(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const projectData = await request.json();
    const newProject = await addProject(projectData);
    return NextResponse.json(newProject, { status: 201 });
  } catch (error: any) {
    console.error('Project creation error:', error);
    return NextResponse.json({ 
      message: 'Failed to add project', 
      error: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getSession();
    if (!session) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    const { id, ...updatedProject } = await request.json();
    const result = await updateProject(id, updatedProject);

    if (result) {
      return NextResponse.json(result);
    } else {
      return NextResponse.json({ message: 'Project not found' }, { status: 404 });
    }
  } catch (error: any) {
    console.error('Project update error:', error);
    return NextResponse.json({ 
      message: 'Failed to update project', 
      error: error.message || 'Unknown error' 
    }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  const { id } = await request.json();
  const success = await deleteProject(id);

  if (success) {
    return NextResponse.json({ message: 'Project deleted' });
  } else {
    return NextResponse.json({ message: 'Project not found' }, { status: 404 });
  }
}
