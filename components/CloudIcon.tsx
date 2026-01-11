
import React from 'react';

interface CloudIconProps {
  className?: string;
  size?: number;
}

export const CloudIcon: React.FC<CloudIconProps> = ({ className = "", size = 50 }) => (
  <svg 
    width={size} 
    height={size} 
    viewBox="0 0 50 50" 
    fill="none" 
    className={`cloud-shape ${className}`}
  >
    <ellipse cx="25" cy="30" rx="18" ry="12" fill="#93c5fd" />
    <ellipse cx="15" cy="28" rx="10" ry="8" fill="#bfdbfe" />
    <ellipse cx="35" cy="28" rx="10" ry="8" fill="#bfdbfe" />
    <ellipse cx="25" cy="24" rx="12" ry="9" fill="#dbeafe" />
    <circle cx="25" cy="32" r="3" fill="#60a5fa" />
    <path d="M22 30 Q25 26 28 30" stroke="#60a5fa" stroke-width="1.5" fill="none" stroke-linecap="round" />
  </svg>
);
