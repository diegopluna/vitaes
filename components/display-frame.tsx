import React from 'react';

type FrameProps = {
  scale: number;
  children: React.ReactNode;
};

export default function DisplayFrame({scale, children }: FrameProps) {
    return (
        <div className="relative w-fit h-fit">
          <div className={`origin-top `} style={{scale: scale}}>
            {children}
          </div>
        </div>
      );
}