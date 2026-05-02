"use client";

import { useEffect } from "react";

export function AnimationObserver() {
  useEffect(() => {
    // Scroll-reveal: mark all [data-reveal] elements as pre → in on intersection
    const revealEls = document.querySelectorAll<HTMLElement>("[data-reveal]");
    revealEls.forEach((el) => el.classList.add("reveal", "pre"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove("pre");
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );

    revealEls.forEach((el) => observer.observe(el));

    // Nav scroll shadow
    const nav = document.querySelector(".nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return null;
}
