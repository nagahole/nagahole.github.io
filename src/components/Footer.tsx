import { profile } from '../data'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <span>
          © {new Date().getFullYear()} {profile.name.toUpperCase()}
        </span>
        <span className="footer-dim">/// END_OF_TRANSMISSION</span>
      </div>
    </footer>
  )
}
