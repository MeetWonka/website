import createMiddleware from "next-intl/middleware";
import { routing } from "@/i18n/config";

export default createMiddleware(routing);

export const config = {
  matcher: [
    "/en",
    "/en/:path*",
    "/(fr|nl)/:path*",
    "/blog",
    "/blog/:path*",
    "/integrations",
    "/integrations/:path*",
    "/learn",
    "/learn/:path*",
    "/vs",
    "/vs/:path*",
    "/case-studies",
    "/case-studies/:path*",
    "/apprendre",
    "/apprendre/:path*",
    "/leren",
    "/leren/:path*",
    "/cas-clients",
    "/cas-clients/:path*",
    "/klantcases",
    "/klantcases/:path*",
  ],
};
