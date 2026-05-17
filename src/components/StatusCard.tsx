export default function StatusCard() {
  return (
    <aside className="status-card" aria-label="Availability">
      <div className="card-head card-head-accent">
        <span className="dot" aria-hidden />
        <span>STATUS.log</span>
        <span className="card-head-spacer">0x00</span>
      </div>
      <p className="status-body">open to '26/27 new grad</p>
    </aside>
  )
}
