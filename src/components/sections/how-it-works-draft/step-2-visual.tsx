import Image from "next/image";

export function Step2Visual() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[0.8cqw]">
      <Image
        src="/images/how-it-works/step-2/pill-top.png"
        alt=""
        width={184}
        height={69}
        className="h-auto w-[60cqw] translate-x-[4%] lg:w-[42.4cqw]"
      />
      <Image
        src="/images/how-it-works/step-2/pill-center.png"
        alt=""
        width={183}
        height={65}
        className="h-auto w-[60cqw] -translate-x-[5%] lg:w-[42.2cqw]"
      />
      <Image
        src="/images/how-it-works/step-2/pill-bottom.png"
        alt=""
        width={202}
        height={69}
        className="h-auto w-[60cqw] translate-x-[3%] lg:w-[46.5cqw]"
      />
    </div>
  );
}
