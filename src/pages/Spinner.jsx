export default function Spinner({ size = 24, color = "#d4af37" }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        border: `3px solid ${color}33`,
        borderTop: `3px solid ${color}`,
        borderRadius: "50%",
      }}
      className="animate-spin"
    />
  );
}
