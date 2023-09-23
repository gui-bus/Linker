import { ReactNode } from "react";

interface SocialProps {
  url: string;
  children: ReactNode;
}

export function Social({ url, children }: SocialProps) {
  return (
    <a href={url} rel="noopener noreferrer" target="_blank" className="text-white transition-all duration-300 ease-in-out hover:scale-105 hover:text-orangeLinker">
      {children}
    </a>
  );
}
