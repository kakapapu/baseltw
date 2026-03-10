import React from 'react';

const TH02: React.FC<{ children?: React.ReactNode }> = ({ children }) => {
  if (children) return <>{children}</>;

  return (
    <div>
      <h1>Thực Hành 02</h1>
    </div>
  );
};

export default TH02;