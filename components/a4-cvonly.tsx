import React from 'react';

function A4CVOnly({ children } : { children : React.ReactNode }) {
    return (
      <div className=" h-min-[297mm] w-[210mm] pr-[14mm] pl-[14mm] bg-white">
        {children}
      </div>
    );
  };

export default A4CVOnly;
