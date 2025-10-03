'use client'

import { Button } from "@/components/ui/button"

interface ScrollToFormButtonProps {
  children: React.ReactNode
  size?: "sm" | "lg" | "default"
  className?: string
}

export function ScrollToFormButton({ children, size = "default", className }: ScrollToFormButtonProps) {
  const handleClick = () => {
    document.getElementById('contact-form')?.scrollIntoView({ 
      behavior: 'smooth',
      block: 'center'
    });
  };

  return (
    <Button 
      size={size}
      className={className}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
}

