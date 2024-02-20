import React from 'react';

// function A4Paper({ children } : { children : React.ReactNode }) {
//   return (
//     <div className="bg-white rounded-lg shadow-md p-8 w-11/12 max-w-2xl text-black">
//       {children}
//     </div>
//   );
// };

function A4Paper({ children } : { children : React.ReactNode }) {
    return (
      <div className="m-4 h-[297mm] w-[210mm] overflow-hidden rounded-md bg-white p-8 shadow-lg text-black">
        {children}
      </div>
    );
  };

export default A4Paper;
