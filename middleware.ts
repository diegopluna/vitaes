export { auth as default } from "@/auth";

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
  unstable_allowDynamic: ["/node_modules/@react-email/tailwind/**"],
};
