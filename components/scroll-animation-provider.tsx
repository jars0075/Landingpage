'use client'

import { useEffect, useRef } from 'react'

export function ScrollAnimationProvider({ children }: { children: React.ReactNode }) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    // Small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      observerRef.current = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '50px'
      });

      // Observe all animation elements
      const animationElements = document.querySelectorAll('.scroll-animation, .scroll-animation-right, .scroll-animation-left');
      animationElements.forEach((element) => {
        observerRef.current?.observe(element);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
    };
  }, []);

  return <>{children}</>;
}

