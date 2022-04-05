import React from 'react';

export const formatNumber = (number: number) => {
  return ('0' + number).slice(-2);
};
