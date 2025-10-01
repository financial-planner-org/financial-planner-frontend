import React from 'react';

interface UpdateIconProps {
  className?: string;
}

export const UpdateIcon: React.FC<UpdateIconProps> = ({ className = 'w-4 h-4' }) => {
  return (
    <svg className={className} viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <path
        d='M8 1V15M8 1L3 6M8 1L13 6'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};
