import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import ImageCarousel from './ImageCarousel';
import CategoryRating from './CategoryRating';

export default function AccordionItem({
  item,
  idx,
  idxOpen,
  toggleAccordion,
  images,
}) {
  return (
    <div
      className=" mb-4 flex flex-col rounded-xl bg-white shadow-sm"
      key={item?.id || idx}
    >
      <div
        className="flex cursor-pointer px-8 py-2"
        onClick={() => toggleAccordion(idx, item?.id)}
      >
        <div className="flex w-4/5 items-center space-x-8 py-4">
          <div className="flex items-center">
            <div className="text-neutral-20 text-lg">
              {item?.name || ''}
            </div>
          </div>
        </div>

        <div className="flex w-1/5 items-center justify-end">
          <div className="text-xxs text-neutral-20 ">
            {idxOpen === idx + 1 ? (
              <BsChevronUp />
            ) : (
              <BsChevronDown />
            )}
          </div>
        </div>
      </div>
      {/* Only open if index + 1 is equal idxOpen */}
      {idxOpen === idx + 1 && (
        <>
          <div className=" border border-t-gray-300 py-0">
            <div className="text-neutral-20 flex w-full justify-start space-x-2 px-8 py-4 text-sm">
              <div className="flex w-full flex-col space-y-4 md:w-2/5">
                <span className=" font-semibold">
                  <span className="mr-4">
                    <ReactCountryFlag
                      countryCode={item?.country_code || ''}
                      svg
                      style={{
                        width: '2em',
                        height: '2em',
                      }}
                      className=" rounded-xl"
                      title={item?.country_code || ''}
                    />
                  </span>{' '}
                  {item?.origin || ''}
                </span>
                <span>{item?.description || ''}</span>
                <span className="text-xs font-semibold">
                  <span>{item?.temperament || ''}</span>
                </span>
              </div>
              <div className="flex w-full flex-col space-y-4 md:w-3/5">
                {images?.length > 0 && (
                  <ImageCarousel imageList={images} />
                )}

                <CategoryRating data={item} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
