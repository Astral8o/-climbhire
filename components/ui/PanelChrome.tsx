import { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

interface PanelChromeProps {
  label?: string;
  status?: string;
  statusColor?: "lime" | "teal";
  children: ReactNode;
  className?: string;
  shadowClass?: string;
}

export default function PanelChrome({
  label = "Component::ClimbHire_v1",
  status = "Live",
  statusColor = "lime",
  children,
  className = "",
  shadowClass = "",
}: PanelChromeProps) {
  const dotColor = statusColor === "lime" ? "#D4FF5E" : "#70A4A4";
  const dotGlow =
    statusColor === "lime"
      ? "0 0 0 2px rgba(212,255,94,0.25)"
      : "0 0 0 2px rgba(112,164,164,0.25)";

  return (
    <div
      className={["border-2 border-ink rounded-squircle-md overflow-hidden bg-white", shadowClass, className].join(" ")}
    >
      <div className="bg-ink text-white/40 px-5 py-3 flex justify-between items-center gap-3 font-mono text-[10px] uppercase tracking-[0.22em]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-[18px] h-[18px] bg-lime rounded-[6px] flex items-center justify-center text-ink flex-shrink-0">
            <ArrowUpRight size={11} strokeWidth={2.5} />
          </div>
          <span className="overflow-hidden text-ellipsis whitespace-nowrap">{label}</span>
        </div>
        <div className="flex items-center gap-2.5 flex-shrink-0">
          <span
            className="inline-flex items-center gap-1.5"
            style={{ color: dotColor }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: dotColor, boxShadow: dotGlow }}
            />
            {status}
          </span>
          <div className="flex gap-1">
            <span className="w-2 h-2 rounded-full bg-white/20" />
            <span className="w-2 h-2 rounded-full bg-white/20" />
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
