import loanServices from "../../public/images/loan-services.jpg";
import realEstate from "../../public/images/real-estate.jpg";

/** Brand photography, keyed so plain config (e.g. nav data) can reference it by name. */
export const brandImages = {
  loans: loanServices,
  realEstate,
} as const;

export type BrandImageKey = keyof typeof brandImages;
