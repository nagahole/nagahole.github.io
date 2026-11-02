import { projects, type Project } from '../data'
import { roman } from '../format'
import { stagger } from '../hooks'
import { Spark } from './Viz'

function Card({ project, index }: { project: Project; index: number }) {
  const [primary, ...extra] = project.links

  return (
    <li className="card reveal" style={stagger(index % 3)}>
      <div className="card-top label">
        <span>
          <span className="faint">{roman(index + 1)}</span> · {project.kind}
        </span>
        <span className="faint">{project.status ?? project.year}</span>
      </div>

      <Spark seed={project.name} />

      <h3 className="card-name">
        {/* The ::after of this link covers the whole card, so the card is clickable */}
        <a className="card-link" href={primary.href} target="_blank" rel="noreferrer">
          {project.name}
          <span className="card-arrow" aria-hidden>
            ↗
          </span>
        </a>
      </h3>
      <p className="card-summary">{project.summary}</p>

      <div className="card-foot label">
        <span className="faint">{project.tech.join(' · ')}</span>
        {extra.map((link) => (
          <a key={link.href} className="link card-extra" href={link.href} target="_blank" rel="noreferrer">
            {link.label} ↗
          </a>
        ))}
      </div>
    </li>
  )
}

export default function Projects() {
  return (
    <ul className="panel cards">
      {projects.map((project, i) => (
        <Card key={project.name} project={project} index={i} />
      ))}
    </ul>
  )
}
