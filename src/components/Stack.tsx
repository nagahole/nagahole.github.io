import { stackGroups, type StackGroup as StackGroupT } from '../data'
import SectionHead from './SectionHead'

function StackGroup({ group }: { group: StackGroupT }) {
  return (
    <div className="stack-group">
      <p className="stack-label">{group.label}</p>
      <ul className="stack">
        {group.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  )
}

export default function Stack() {
  return (
    <section id="stack" className="section">
      <SectionHead num="03" title="STACK" hint="tools_of_the_trade" />
      {stackGroups.map((g) => (
        <StackGroup key={g.label} group={g} />
      ))}
    </section>
  )
}
