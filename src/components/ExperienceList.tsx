import { experience, type Role } from '../data'
import { stagger } from '../hooks'

function Entry({ role, index }: { role: Role; index: number }) {
  return (
    <li className="entry reveal" style={stagger(index)}>
      <div className="entry-head">
        <h3 className="entry-title">
          {role.title}
          <span className="entry-sep">,</span>{' '}
          {role.orgHref ? (
            <a className="link" href={role.orgHref} target="_blank" rel="noreferrer">
              {role.org}
            </a>
          ) : (
            role.org
          )}
        </h3>
        <span className="entry-period">{role.period}</span>
      </div>
      <p className="entry-meta">{role.location}</p>
      <p className="entry-summary">{role.summary}</p>
    </li>
  )
}

export default function ExperienceList() {
  return (
    <ol className="entries">
      {experience.map((role, i) => (
        <Entry key={`${role.org}-${role.period}`} role={role} index={i} />
      ))}
    </ol>
  )
}
