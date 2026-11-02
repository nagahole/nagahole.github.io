import { education } from '../data'

export default function Education() {
  return (
    <div className="entry reveal">
      <div className="entry-head">
        <h3 className="entry-title">{education.school}</h3>
        <span className="entry-period">{education.period}</span>
      </div>
      <p className="entry-meta">{education.degree}</p>
      <dl className="details">
        <div>
          <dt>Results</dt>
          <dd>{education.results}</dd>
        </div>
        <div>
          <dt>Awards</dt>
          <dd>{education.awards}</dd>
        </div>
        <div>
          <dt>Activities</dt>
          <dd>{education.activities}</dd>
        </div>
      </dl>
    </div>
  )
}
