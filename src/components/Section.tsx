import type { ReactNode } from 'react'
import { roman } from '../format'
import { Divider } from './Viz'

type Props = {
  id: string
  index: number
  title: string
  meta?: string
  children: ReactNode
}

export default function Section({ id, index, title, meta, children }: Props) {
  return (
    <section id={id} className="section" aria-labelledby={`${id}-title`}>
      <header className="section-head reveal">
        <span className="label faint">{roman(index)}</span>
        <Divider seed={id} />
        {meta && <span className="label faint">{meta}</span>}
      </header>
      <h2 id={`${id}-title`} className="section-title reveal">
        {title}
      </h2>
      {children}
    </section>
  )
}
