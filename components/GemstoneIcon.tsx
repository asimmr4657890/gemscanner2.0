
import React from 'react';

export const GemstoneIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M6 3h12l4 6-10 12L2 9z" />
    <path d="M11 3l-4 6 5 12" />
    <path d="M13 3l4 6-5 12" />
    <path d="M2 9h20" />
  </svg>
);
