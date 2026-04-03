"use client";

import Image, { type ImageProps } from "next/image";
import { useState } from "react";
import RevealImageReady from "./RevealImageReady";

type RevealImageProps = Omit<ImageProps, "className" | "onLoad"> & {
  className?: string;
  readyClassName?: string;
  notReadyClassName?: string;
  transitionClassName?: string;
  onLoad?: ImageProps["onLoad"];
};

export default function RevealImage({
  alt,
  className = "",
  readyClassName,
  notReadyClassName,
  transitionClassName,
  onLoad,
  ...imageProps
}: RevealImageProps) {
  const [ready, setReady] = useState(false);

  return (
    <RevealImageReady
      ready={ready}
      className={className}
      readyClassName={readyClassName}
      notReadyClassName={notReadyClassName}
      transitionClassName={transitionClassName}
    >
      {(mergedClassName) => (
        <Image
          {...imageProps}
          alt={alt}
          className={mergedClassName}
          onLoad={(event) => {
            // Prefer revealing after decode to avoid a brief blurry/partial paint on some browsers.
            const img = event.currentTarget;
            const decode = (img as unknown as { decode?: () => Promise<void> }).decode;
            if (typeof decode === "function") {
              decode
                .call(img)
                .catch(() => {})
                .finally(() => setReady(true));
            } else {
              setReady(true);
            }

            onLoad?.(event);
          }}
        />
      )}
    </RevealImageReady>
  );
}
