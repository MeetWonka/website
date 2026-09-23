interface NavStatusTooltipProps {
  id: string;
}

export function NavStatusTooltip({ id }: NavStatusTooltipProps) {
  return (
    <span
      id={id}
      role="tooltip"
      className="type-eyebrow pointer-events-none absolute left-0 top-full z-10 mt-2 translate-y-1 whitespace-nowrap rounded-xs bg-black px-2.5 py-1.5 text-white opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-y-0 group-hover:opacity-100 group-focus:translate-y-0 group-focus:opacity-100"
    >
      Coming soon
    </span>
  );
}
