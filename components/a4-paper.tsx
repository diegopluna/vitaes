import React from 'react';

function A4Paper({ children } : { children : React.ReactNode }) {
    return (
      <div className=" h-[297mm] w-[210mm] overflow-y-scroll bg-white pb-[18mm] pt-[8mm] pr-[14mm] pl-[14mm] shadow-lg text-black">
        {children}
      </div>
    );
  };

export default A4Paper;
