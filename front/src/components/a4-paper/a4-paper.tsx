import React from 'react';

interface A4PaperProps {
  children: React.ReactNode
}

export const A4Paper = ({ children } : A4PaperProps) => {
  return (
    <div className="h-[297mm] w-[210mm] overflow-y-scroll bg-white pb-[18mm] pt-[8mm] pr-[14mm] pl-[14mm] shadow-lg">
      {children}
    </div>
  );
};