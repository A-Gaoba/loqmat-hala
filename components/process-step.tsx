interface ProcessStepProps {
  number: string
  title: string
  description: string
  icon: string
}

export default function ProcessStep({ number, title, description, icon }: ProcessStepProps) {
  return (
    <div className="glass-effect rounded-xl p-6 text-center">
      <div className="mb-4 text-4xl">{icon}</div>
      <div className="mb-2 inline-block rounded-full bg-primary px-4 py-1 text-sm font-bold">{number}</div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-sm text-slate-600">{description}</p>
    </div>
  )
}
