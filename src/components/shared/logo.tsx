import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { cn } from "@/lib/utils";
import logoColor from "../../../public/images/logo-color.png";
import logoLight from "../../../public/images/logo-light.png";

const imageClass = "h-11 lg:h-12 w-auto";

export function Logo({ light, className }: { light?: boolean; className?: string }) {
  return (
    <Link href="/" aria-label={`${siteConfig.name} home`} className={cn("flex items-center shrink-0", className)}>
      {light ? (
        <Image src={logoLight} alt={siteConfig.name} className={imageClass} />
      ) : (
        <>
          <Image src={logoColor} alt={siteConfig.name} className={cn(imageClass, "dark:hidden")} />
          <Image src={logoLight} alt="" aria-hidden className={cn(imageClass, "hidden dark:block")} />
        </>
      )}
    </Link>
  );
}
