import { experience } from '../data'
import { roman } from '../format'
import { stagger } from '../hooks'

export default function Experience() {
  return (
    <ol className="panel rows">
      {experience.map((role, i) => (
        <li key={`${role.org}-${role.period}`} className="row reveal" style={stagger(i)}>
          <span className="row-num label faint">{roman(i + 1)}</span>
          <span className="row-period label">{role.period}</span>
          <div className="row-main">
            <h3 className="row-title">
              {role.title}
              <span className="row-at"> — </span>
              {role.orgHref ? (
                <a className="link row-org" href={role.orgHref} target="_blank" rel="noreferrer">
                  {role.org}
                </a>
              ) : (
                <span className="row-org">{role.org}</span>
              )}
            </h3>
            <p className="row-summary">{role.summary}</p>
          </div>
          <span className="row-loc label faint">{role.location}</span>
        </li>
      ))}
    </ol>
  )
}
