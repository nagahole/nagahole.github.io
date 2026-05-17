type Props = {
  num: string
  title: string
  hint: string
}

export default function SectionHead({ num, title, hint }: Props) {
  return (
    <header className="section-head">
      <span className="section-num">[{num}]</span>
      <span className="section-bar" aria-hidden />
      <h2 className="section-title">{title}</h2>
      <span className="section-hint">// {hint}</span>
    </header>
  )
}
