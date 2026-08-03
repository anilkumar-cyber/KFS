import { createElement } from "react";
import { getIcon } from "@/lib/icon-map";

export function ServiceIcon({ name, className }: { name: string; className?: string }) {
  return createElement(getIcon(name), { className });
}
