import Image from "next/image";
import { LogoMark } from "@/components/ui/logo-mark";

const LOGO_BG_PATH =
  "M0 4.90479C0 2.39015 2.19961 0.441957 4.69584 0.74569L54.2181 6.77138C56.3208 7.02724 57.9018 8.81226 57.9018 10.9305V60.1962C57.9018 62.3145 56.3208 64.0995 54.2181 64.3553L4.69584 70.381C2.19961 70.6848 0 68.7366 0 66.2219V4.90479Z";

export function Step1Visual() {
  return (
    <div className="absolute inset-0">
      <div className="pointer-events-none absolute top-[18%] right-0 w-[50%] opacity-50 blur-[0.5px]">
        <Image
          src="/images/archived/how-it-works/step-1/voice.png"
          alt=""
          width={622}
          height={166}
          className="h-auto w-full"
        />
      </div>

      <div className="absolute top-1/2 left-[12%] flex -translate-y-1/2 items-center gap-[0.625em] text-[3.7cqw] leading-none">
        <div className="relative h-[4.5em] w-[3.69em] shrink-0">
          <svg
            viewBox="0 0 59 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute inset-0 size-full"
            aria-hidden
          >
            <path d={LOGO_BG_PATH} className="fill-green-300" />
          </svg>
          <div className="absolute inset-0 grid place-items-center">
            <LogoMark className="h-[55%] w-auto" />
          </div>
        </div>
        <div className="border-mid-gray flex h-[3.5em] items-center rounded-[0.375em] border border-dashed bg-white px-[1.0625em]">
          <span className="text-text font-medium whitespace-nowrap">
            Create an opportunity in Odoo.
          </span>
          <span
            aria-hidden
            className="bg-text ml-[0.1875em] inline-block h-[1.125em] w-[0.125em]"
          />
        </div>
        <Image
          src="/images/archived/how-it-works/step-1/cursor.svg"
          alt=""
          width={23}
          height={30}
          className="absolute top-[68%] right-[18%] h-[6.9cqw] w-auto"
        />
      </div>

      <div className="pointer-events-none absolute bottom-[12%] left-[12%] w-[60%] opacity-40 blur-[1px]">
        <Image
          src="/images/archived/how-it-works/step-1/mail.png"
          alt=""
          width={745}
          height={295}
          className="h-auto w-full"
        />
      </div>
    </div>
  );
}
