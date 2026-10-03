import Image from "next/image";
import { brandImages, type BrandImageKey } from "@/lib/images";

/**
 * Photo background for a page header section. The parent section must be
 * `relative overflow-hidden` and its content `relative`.
 */
export function PageHeroImage({ image, position = "center" }: { image: BrandImageKey; position?: string }) {
  return (
    <div className="pointer-events-none absolute inset-0">
      <Image
        src={brandImages[image]}
        alt=""
        fill
        sizes="100vw"
        placeholder="blur"
        loading="eager"
        fetchPriority="high"
        className="object-cover"
        style={{ objectPosition: position }}
      />
      <div className="absolute inset-0 bg-[#0A2540]/75" />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A2540]/30 via-transparent to-[#061627]/60" />
    </div>
  );
}
