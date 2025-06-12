export default function AuthCard({ title, children, footer }) {
  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="w-full max-w-md shadow-xl bg-white rounded-xl p-8 space-y-4">
        <h2 className="text-2xl font-bold text-center">{title}</h2>
        {children}
        {footer && <div className="text-sm text-center">{footer}</div>}
      </div>
    </div>
  );
}
