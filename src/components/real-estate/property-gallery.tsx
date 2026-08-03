"use client";

import * as React from "react";
import { Expand } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";

export function PropertyGallery({ images, title }: { images: string[]; title: string }) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) return;
    api.scrollTo(activeIndex, true);
    const onSelect = () => setActiveIndex(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [api]);

  function openLightbox(index: number) {
    setActiveIndex(index);
    setOpen(true);
  }

  return (
    <div>
      <div className="relative">
        <button
          type="button"
          onClick={() => openLightbox(activeIndex)}
          className="group relative block h-72 sm:h-96 w-full overflow-hidden rounded-2xl"
        >
          <img
            src={images[activeIndex]}
            alt={`${title} - image ${activeIndex + 1}`}
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-black/60 px-3 py-1.5 text-xs font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
            <Expand className="size-3.5" /> View Gallery
          </span>
        </button>

        {images.length > 1 && (
          <div className="mt-3 grid grid-cols-4 sm:grid-cols-6 gap-2">
            {images.map((img, i) => (
              <button
                type="button"
                key={img + i}
                onClick={() => openLightbox(i)}
                className={cn(
                  "relative h-16 sm:h-20 overflow-hidden rounded-lg ring-2 transition-all",
                  activeIndex === i ? "ring-secondary" : "ring-transparent opacity-80 hover:opacity-100"
                )}
              >
                <img src={img} alt={`${title} thumbnail ${i + 1}`} className="size-full object-cover" />
              </button>
            ))}
          </div>
        )}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-3xl sm:max-w-4xl bg-black/95 p-2 sm:p-4 ring-0">
          <DialogTitle className="sr-only">{title} - Image Gallery</DialogTitle>
          <Carousel setApi={setApi} opts={{ align: "start", loop: true, startIndex: activeIndex }} className="w-full">
            <CarouselContent>
              {images.map((img, i) => (
                <CarouselItem key={img + i}>
                  <img
                    src={img}
                    alt={`${title} - image ${i + 1}`}
                    className="max-h-[70vh] w-full rounded-lg object-contain"
                  />
                </CarouselItem>
              ))}
            </CarouselContent>
            {images.length > 1 && (
              <>
                <CarouselPrevious className="text-white" />
                <CarouselNext className="text-white" />
              </>
            )}
          </Carousel>
        </DialogContent>
      </Dialog>
    </div>
  );
}
