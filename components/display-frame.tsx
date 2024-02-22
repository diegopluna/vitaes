import React from 'react';

export default function DisplayFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-fit">
          <div className="transform scale-[0.8]">
            {children}
          </div>
        </div>
      );
}