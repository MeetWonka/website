/**
 * This route is just a friendly landing page for `npm run dev` — the real
 * deliverable of this project is Storybook (`npm run storybook`), where every
 * ported component lives with its interactive states and motion brief.
 */
export default function App() {
  return (
    <div style={{ maxWidth: 640, margin: '80px auto', padding: '0 24px', fontFamily: 'Inter, sans-serif' }}>
      <h1 style={{ fontSize: 28, marginBottom: 8 }}>wonkachat-motion-lab</h1>
      <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>
        This is a companion project to WonkaChat for iterating on motion design.
        Run <code>npm run storybook</code> to browse every ported component,
        its states, and its motion brief.
      </p>
    </div>
  );
}
