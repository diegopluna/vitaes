import React from 'react';

function A4Paper({ children } : { children : React.ReactNode }) {
    return (
      <div className=" h-[297mm] w-[210mm] overflow-hidden bg-white p-8 shadow-lg text-black">
        {children}
      </div>
    );
  };

export default A4Paper;
