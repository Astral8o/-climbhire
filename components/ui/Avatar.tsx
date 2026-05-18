interface AvatarProps {
  initials: string;
  size?: number;
  bg?: string;
  color?: string;
  className?: string;
}

export default function Avatar({
  initials,
  size = 40,
  bg = "#1C1C18",
  color = "#00C9B1",
  className = "",
}: AvatarProps) {
  return (
    <div
      className={["border border-ink flex-shrink-0 flex items-center justify-center font-display font-bold", className].join(" ")}
      style={{
        width: size,
        height: size,
        background: bg,
        color,
        borderRadius: size * 0.35,
        fontSize: size * 0.32,
      }}
    >
      {initials}
    </div>
  );
}
