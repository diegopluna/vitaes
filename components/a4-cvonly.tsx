import React from 'react';

function A4CVOnly({ children } : { children : React.ReactNode }) {
    return (
      <div className=" h-min-[297mm] w-[210mm] bg-white p-8 shadow-lg text-black">
        {children}
      </div>
    );
  };

export default A4CVOnly;
