import Image from "next/image";

export function Step3Visual() {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/how-it-works/step-3/circles.png"
        alt=""
        width={1302}
        height={1428}
        className="absolute inset-0 size-full object-contain"
      />

      <Image
        src="/images/how-it-works/step-3/center-icon.svg"
        alt=""
        width={120}
        height={120}
        className="absolute top-1/2 left-1/2 h-auto w-[20cqw] -translate-x-1/2 -translate-y-1/2"
      />

      <Image
        src="/images/how-it-works/step-3/card-crm.png"
        alt=""
        width={268}
        height={100}
        className="absolute top-[18%] right-[10%] h-auto w-[20.5cqw] opacity-60 blur-[2px]"
      />

      <Image
        src="/images/how-it-works/step-3/card-notes.png"
        alt=""
        width={378}
        height={133}
        className="absolute top-[35%] left-[9%] h-auto w-[29cqw] opacity-80 blur-[2px]"
      />

      <Image
        src="/images/how-it-works/step-3/cardo-order.png"
        alt=""
        width={378}
        height={129}
        className="absolute top-[63%] right-[10%] h-auto w-[32cqw] blur-[2px]"
      />

      <Image
        src="/images/how-it-works/step-3/card-pipeline.png"
        alt=""
        width={292}
        height={100}
        className="absolute top-[70%] left-[10%] h-auto w-[22.4cqw] opacity-60 blur-[1px]"
      />
    </div>
  );
}
