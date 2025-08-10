import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

import "./ScrambledText.css";

gsap.registerPlugin(ScrambleTextPlugin);

type ScrambledTextProps = {
  radius?: number;
  duration?: number;
  speed?: number;
  scrambleChars?: string;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
};

export default function ScrambledText({
  radius = 100,
  duration = 1.2,
  speed = 0.5,
  scrambleChars = ".:",
  className = "",
  style = {},
  children,
}: ScrambledTextProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const charsRef = useRef<HTMLElement[]>([]);
  const originalHtmlRef = useRef<string>("");

  useEffect(() => {
    const rootElement = rootRef.current;
    if (!rootElement) return;

    const paragraphElement = rootElement.querySelector("p");
    if (!paragraphElement) return;

    // Store original HTML to revert on cleanup
    originalHtmlRef.current = paragraphElement.innerHTML;

    // If already split, revert then split again based on latest children
    if (paragraphElement.querySelector(".char")) {
      paragraphElement.innerHTML = originalHtmlRef.current;
    }

    const textContent = paragraphElement.textContent ?? "";

    // Split text into individual spans (avoid GSAP SplitText Club plugin)
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < textContent.length; index += 1) {
      const currentCharacter = textContent[index];
      // Preserve whitespace as raw text so it never gets animated/scrambled
      if (currentCharacter.match(/\s/)) {
        fragment.appendChild(document.createTextNode(currentCharacter));
        continue;
      }
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = currentCharacter;
      span.setAttribute("data-content", currentCharacter);
      fragment.appendChild(span);
    }
    paragraphElement.innerHTML = "";
    paragraphElement.appendChild(fragment);

    charsRef.current = Array.from(paragraphElement.querySelectorAll<HTMLElement>(".char"));

    charsRef.current.forEach((character) => {
      gsap.set(character, {
        attr: { "data-content": character.innerHTML },
      });
    });

    const handleMove = (event: PointerEvent) => {
      charsRef.current.forEach((character) => {
        // Skip scrambling whitespace to avoid odd glyphs like zeros in gaps
        const originalChar = (character.dataset.content as string) ?? "";
        if (originalChar.trim() === "") {
          return;
        }
        const { left, top, width, height } = character.getBoundingClientRect();
        const deltaX = event.clientX - (left + width / 2);
        const deltaY = event.clientY - (top + height / 2);
        const distance = Math.hypot(deltaX, deltaY);

        if (distance < radius) {
          gsap.to(character, {
            overwrite: true,
            duration: duration * (1 - distance / radius),
            scrambleText: {
              text: originalChar,
              chars: scrambleChars,
              speed,
            },
            ease: "none",
          });
        }
      });
    };

    rootElement.addEventListener("pointermove", handleMove);

    return () => {
      rootElement.removeEventListener("pointermove", handleMove);
      paragraphElement.innerHTML = originalHtmlRef.current;
    };
  }, [radius, duration, speed, scrambleChars]);

  return (
    <div ref={rootRef} className={`text-block ${className}`} style={style}>
      <p>{children}</p>
    </div>
  );
}


