// user-data-layout.tsx
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const UserDataLayout: React.FC<Props> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column',  justifyContent: 'center', }}>
      <h2>User Details</h2>
      {children}
    </div>
  );
};

export default UserDataLayout;
