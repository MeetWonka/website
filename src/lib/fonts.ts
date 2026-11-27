import localFont from "next/font/local";

export const interDisplay = localFont({
  src: [
    {
      path: "../../public/fonts/InterDisplay-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/InterDisplay-Medium.woff2",
      weight: "500",
      style: "normal",
    },
  ],
  variable: "--font-wonka-sans",
  display: "swap",
  preload: false,
});

export const gtSectra = localFont({
  src: [
    {
      path: "../../public/fonts/GT-Sectra-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-wonka-serif",
  display: "swap",
});

export const fontVariables = `${interDisplay.variable} ${gtSectra.variable}`;
