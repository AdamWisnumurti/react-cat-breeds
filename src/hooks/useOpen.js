import { useState } from 'react';

export default function useOpen(initValue = false) {
  const [val, setVal] = useState(initValue);
  const handleOpen = () => {
    setVal((prev) => !prev);
  };

  return [val, handleOpen];
}
