import { cn } from "@/lib/utils";
import { CheckmarkIcon } from "@/components/ui/icons/checkmark-icon";

const CENTER_ITEMS = [
  "Assess AI readiness of your people",
  "Audit your tech stack for AI-accessibility",
  "Introduce AI agents in your processes",
  "Deploy a secure AI system connected to your data & tools",
  "Share AI agents with your team",
  "Level up your people",
];

const OPACITIES = [0.3, 0.65, 1, 1, 0.65, 0.3] as const;

const GHOST_LEFT = "Map processes across all agents";
const GHOST_RIGHT_TOP = "Set security and guardrails";
const GHOST_RIGHT_BOTTOM = "Connect your AI to your tools";

function CheckItem({
  text,
  featured = false,
  small = false,
}: {
  text: string;
  featured?: boolean;
  small?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2.5 rounded-xl border border-border bg-white shadow-subtle",
        featured ? "px-4 py-3" : "px-3 py-2",
        small && "px-2.5 py-1.5",
      )}
    >
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-green-100">
        <CheckmarkIcon className="h-3 w-3 text-green-700" />
      </div>
      <span
        className={cn(
          "text-text leading-snug",
          featured ? "text-sm font-semibold" : "text-xs",
          small && "text-xs",
        )}
      >
        {text}
      </span>
    </div>
  );
}

export function CardFourVisual() {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Ghost — left center */}
      <div
        className="absolute left-[-3%] top-[42%] w-[30%] -translate-y-1/2 opacity-40 blur-[2.5px]"
        aria-hidden
      >
        <CheckItem text={GHOST_LEFT} small />
      </div>

      {/* Ghost — right top */}
      <div
        className="absolute right-[-3%] top-[18%] w-[30%] opacity-40 blur-[2.5px]"
        aria-hidden
      >
        <CheckItem text={GHOST_RIGHT_TOP} small />
      </div>

      {/* Ghost — right bottom */}
      <div
        className="absolute right-[-3%] top-[68%] w-[30%] opacity-40 blur-[2.5px]"
        aria-hidden
      >
        <CheckItem text={GHOST_RIGHT_BOTTOM} small />
      </div>

      {/* Center column */}
      <div className="absolute inset-0 flex items-center justify-center px-[4%]">
        <div className="flex w-[62%] flex-col gap-2">
          {CENTER_ITEMS.map((text, i) => (
            <div key={text} style={{ opacity: OPACITIES[i] }}>
              <CheckItem text={text} featured={i === 2 || i === 3} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
