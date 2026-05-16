import { cn } from "@/lib/utils";

type BrandLogoProps = Readonly<{
  className?: string;
}>;

export function BrandLogo({ className }: BrandLogoProps) {
  return (
    <div
      className={cn(
        "flex w-[178px] items-center justify-center leading-none sm:w-[218px]",
        className
      )}
      aria-label="MARK'S RAFFLE"
    >
      <span className="select-none whitespace-nowrap font-black italic tracking-tight text-[#f3229d] drop-shadow-[0_0_8px_rgba(243,34,157,0.45)]">
        <span className="text-[1.35rem] sm:text-[1.55rem]">MARK&apos;S</span>
        <span className="ml-1 text-[0.82rem] not-italic tracking-[0.18em] text-white sm:text-[0.95rem]">
          RAFFLE
        </span>
      </span>
    </div>
  );
}
