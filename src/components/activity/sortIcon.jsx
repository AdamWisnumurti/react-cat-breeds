import React from 'react';
import {
  TbSortDescending,
  TbSortAscending,
  TbSortAscendingLetters,
  TbSortDescendingLetters,
  TbArrowsSort,
} from 'react-icons/tb';

export default function SortIcon({ type }) {
  const Icon = () => {
    switch (type) {
      case 'Terlama':
        return <TbSortAscending />;
      case 'A-Z':
        return <TbSortDescendingLetters />;
      case 'Z-A':
        return <TbSortAscendingLetters />;
      case 'Belum Selesai':
        return <TbArrowsSort />;
      default:
        return <TbSortDescending />;
    }
  };
  return (
    <div className="text-primary-0">
      <Icon />
    </div>
  );
}
