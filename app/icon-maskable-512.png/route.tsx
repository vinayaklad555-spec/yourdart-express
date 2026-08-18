import { renderIcon } from "@/lib/icon-image";

export const dynamic = "force-static";

export function GET() {
  return renderIcon(512, { maskable: true });
}
