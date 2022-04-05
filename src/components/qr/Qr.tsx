import React from 'react';
import QrCode from 'react-qr-code';

interface Props {
  data: string;
}

const Qr: React.FC<Props> = ({ data }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
      }}
    >
      <QrCode value={data} />
    </div>
  );
};

export default Qr;
