import { contactItems, type ContactItem } from '../data'
import SectionHead from './SectionHead'

function ContactRow({ item }: { item: ContactItem }) {
  const content = (
    <>
      <span className="contact-key">{item.key}</span>
      <span className="contact-val">{item.value}</span>
      {item.href && <span className="arrow">↗</span>}
    </>
  )

  if (!item.href) {
    return <div className="contact-link contact-static">{content}</div>
  }

  return (
    <a
      className="contact-link"
      href={item.href}
      {...(item.external && { target: '_blank', rel: 'noreferrer' })}
    >
      {content}
    </a>
  )
}

export default function Contact() {
  return (
    <section id="contact" className="section">
      <SectionHead num="04" title="CONTACT" hint="end_of_transmission" />
      <div className="contact-grid">
        {contactItems.map((item) => (
          <ContactRow key={item.key} item={item} />
        ))}
      </div>
    </section>
  )
}
