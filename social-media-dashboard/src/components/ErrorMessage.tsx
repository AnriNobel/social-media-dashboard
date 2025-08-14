
export default function ErrorMessage({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : String(error)
  return <div role="alert" className="muted">Error: {message}</div>
}
