import React from 'react';

export default function DisplayFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-3/4">
          <div className="transform scale-75">
            {children}
          </div>
        </div>
      );
}