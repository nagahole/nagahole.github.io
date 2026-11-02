import { profile } from '../data'

export default function StatusCard() {
  return (
    <aside className="status-card" aria-label="Current project">
      <div className="card-head card-head-accent">
        <span className="dot" aria-hidden />
        <span>STATUS.log</span>
        <span className="card-head-spacer">0x00</span>
      </div>
      <p className="status-body">{profile.status}</p>
    </aside>
  )
}
