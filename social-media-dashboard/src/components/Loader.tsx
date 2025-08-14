
export default function Loader({ label = 'Loading...' }: { label?: string }) {
  return <div role="status" aria-live="polite" className="muted">{label}</div>
}
