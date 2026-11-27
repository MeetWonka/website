export function getSiteUrl(): string {
  const normalize = (url: string) => {
    const withoutTrailingSlash = url.replace(/\/+$/, "");
    return withoutTrailingSlash === "https://wonka-ai.com"
      ? "https://www.wonka-ai.com"
      : withoutTrailingSlash;
  };

  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return normalize(process.env.NEXT_PUBLIC_SITE_URL);
  }
  if (process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL) {
    return normalize(`https://${process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL}`);
  }
  if (process.env.NEXT_PUBLIC_VERCEL_URL) {
    return normalize(`https://${process.env.NEXT_PUBLIC_VERCEL_URL}`);
  }
  if (process.env.NODE_ENV === "production") {
    return "https://www.wonka-ai.com";
  }
  return "http://localhost:3000";
}
