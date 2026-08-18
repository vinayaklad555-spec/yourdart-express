import type { Metadata } from "next";
import { AuthPage } from "@/components/sections/auth-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Log in",
  description:
    "Log in to your Your Dart Express account.",
  path: "/login",
  // Account pages have no search value; keep them out of the index.
  index: false,
});

export default function LoginPage() {
  return <AuthPage mode="login" />;
}
