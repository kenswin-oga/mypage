import React from 'react';
import { createRoot } from 'react-dom/client';

export const Mofmof = () => {
  return (
    <>
      <div>開発</div>
    </>
  );
};

const container = document.getElementById('mofmof');
if (container) {
  const root = createRoot(container);

  document.addEventListener('DOMContentLoaded', () => {
    root.render(<Mofmof />);
  });
}