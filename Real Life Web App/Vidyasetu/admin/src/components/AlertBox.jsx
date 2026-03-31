export default function AlertBox({ type = "info", message }) {
  if (!message) return null;

  const styles = {
    success:
      "bg-emerald-500/10 border border-emerald-500/30 text-emerald-200",
    error: "bg-red-500/10 border border-red-500/30 text-red-200",
    info: "bg-blue-500/10 border border-blue-500/30 text-blue-200",
  };

  return (
    <div className={`p-3 rounded-xl text-sm ${styles[type] || styles.info}`}>
      {message}
    </div>
  );
}