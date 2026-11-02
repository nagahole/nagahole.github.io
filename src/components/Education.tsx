import { education } from '../data'

export default function Education() {
  return (
    <div className="panel edu reveal">
      <div className="edu-head">
        <div>
          <h3 className="row-title">{education.school}</h3>
          <p className="row-summary">{education.degree}</p>
        </div>
        <span className="label">{education.period}</span>
      </div>
      <dl className="edu-rows">
        {education.rows.map((row) => (
          <div key={row.key}>
            <dt className="label faint">{row.key}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
