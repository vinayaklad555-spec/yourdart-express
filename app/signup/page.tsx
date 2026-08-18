import type { Metadata } from "next";
import { AuthPage } from "@/components/sections/auth-page";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Create an account",
  description:
    "Create a Your Dart Express account for your business.",
  path: "/signup",
  index: false,
});

export default function SignupPage() {
  return <AuthPage mode="signup" />;
}
