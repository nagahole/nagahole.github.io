import { systemInfo } from '../data'

export default function SystemInfoCard() {
  return (
    <aside className="hero-card" aria-label="System info">
      <div className="card-head">
        <span className="dot dot-amber" aria-hidden />
        <span>SYSTEM_INFO.log</span>
        <span className="card-head-spacer">0x01</span>
      </div>
      <dl className="kv">
        {systemInfo.map((row) => (
          <div key={row.key}>
            <dt>{row.key}</dt>
            <dd>{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  )
}
