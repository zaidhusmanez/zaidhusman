import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'All Projects',
  description: 'Explore my complete portfolio of software development, web design, and creative branding projects.',
}

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
