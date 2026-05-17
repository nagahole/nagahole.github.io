import { experience, type ExperienceEntry } from '../data'
import SectionHead from './SectionHead'

function ExperienceItem({ entry }: { entry: ExperienceEntry }) {
  return (
    <li className="exp-item">
      <div className="exp-marker">
        <span className="exp-id">{entry.id}</span>
      </div>
      <div className="exp-body">
        <div className="exp-head">
          <h3 className="exp-role">{entry.role}</h3>
          <span className="exp-period">{entry.period}</span>
        </div>
        <div className="exp-meta">
          <span className="exp-org">{entry.org}</span>
          <span className="exp-sep">·</span>
          <span className="exp-loc">{entry.loc}</span>
        </div>
        <p className="exp-desc">{entry.desc}</p>
      </div>
    </li>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="section">
      <SectionHead num="02" title="EXPERIENCE" hint="recent_first" />
      <ol className="exp">
        {experience.map((e) => (
          <ExperienceItem key={e.id} entry={e} />
        ))}
      </ol>
    </section>
  )
}
