import { projects, type Project } from '../data'
import SectionHead from './SectionHead'

function ProjectCard({ project }: { project: Project }) {
  return (
    <a
      className="project"
      href={project.href}
      target="_blank"
      rel="noreferrer"
    >
      <div className="project-head">
        <span className="project-id">{project.id}</span>
        <span className="project-type">{project.type}</span>
        <span className="project-year">{project.year}</span>
      </div>
      <h3 className="project-name">{project.name}</h3>
      <p className="project-role">{project.role}</p>
      <p className="project-desc">{project.desc}</p>
      <ul className="project-stack">
        {project.stack.map((s) => (
          <li key={s}>{s}</li>
        ))}
      </ul>
      <div className="project-cta">
        <span>VIEW</span>
        <span className="arrow">↗</span>
      </div>
    </a>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <SectionHead num="01" title="PROJECTS" hint="selected_builds" />
      <div className="projects">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  )
}
