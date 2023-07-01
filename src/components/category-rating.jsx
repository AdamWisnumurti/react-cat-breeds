import React from 'react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';

const category = [
  'Adaptability',
  'Affection Level',
  'Child Friendly',
  'Energy Level',
  'Intelligence',
  'Health Issues',
];

export function Stars({ num }) {
  return (
    <div className="flex text-yellow-500">
      {[1, 2, 3, 4, 5].map((item) => {
        if (num >= item) {
          return <AiFillStar key={item} />;
        } else {
          return <AiOutlineStar key={item} />;
        }
      })}
    </div>
  );
}

export default function CategoryRating({ data }) {
  const painWords = (text) => text.replace(' ', '_').toLowerCase();
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3">
      {category.map((item, key) => {
        return (
          <div key={key} className="text-start text-xs">
            {item}
            <Stars num={data[painWords(item)]} />
          </div>
        );
      })}
    </div>
  );
}
