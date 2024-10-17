import React from 'react';

type FrameProps = {
  scale: number;
  children: React.ReactNode;
};

export const DisplayFrame = ({scale, children }: FrameProps) => {
  return (
    <div className="relative size-fit">
      <div className="origin-top" style={{
        transform: `scale(${scale})`,
      }}>
        {children}
      </div>
    </div>
  );
}