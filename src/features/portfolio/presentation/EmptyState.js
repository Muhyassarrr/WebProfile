export function EmptyState({ title, body }) {
  return (
    <div className="empty-state" role="status">
      <div className="empty-state__mark" aria-hidden="true">—</div>
      <div>
        <h2>{title}</h2>
        <p>{body}</p>
      </div>
    </div>
  );
}
