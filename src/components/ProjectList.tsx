import { projects, type Project } from '../data'
import { stagger } from '../hooks'

function Arrow() {
  return (
    <svg className="arrow" viewBox="0 0 12 12" aria-hidden>
      <path d="M3.5 8.5l5-5M4.5 3.5h4v4" />
    </svg>
  )
}

function ProjectRow({ project, index }: { project: Project; index: number }) {
  const [primary, ...extra] = project.links

  return (
    <li className="project reveal" style={stagger(index)}>
      <div className="project-head">
        <h3 className="project-name">
          {/* The ::after of this link covers the whole row, so the row is clickable */}
          <a className="project-link" href={primary.href} target="_blank" rel="noreferrer">
            {project.name}
            <Arrow />
          </a>
        </h3>
        {project.status && <span className="badge">{project.status}</span>}
        <span className="project-year">{project.year}</span>
      </div>
      <p className="project-summary">{project.summary}</p>
      <p className="project-meta">
        <span>{project.tech}</span>
        {extra.map((link) => (
          <span key={link.href}>
            <span className="dot" aria-hidden>·</span>
            <a className="link project-extra" href={link.href} target="_blank" rel="noreferrer">
              {link.label}
            </a>
          </span>
        ))}
      </p>
    </li>
  )
}

export default function ProjectList() {
  return (
    <ul className="projects">
      {projects.map((project, i) => (
        <ProjectRow key={project.name} project={project} index={i} />
      ))}
    </ul>
  )
}
