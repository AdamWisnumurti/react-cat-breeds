import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';
import { ImageCarousel, CategoryRating } from '.';

export default function AccordionItem({
  item,
  idx,
  idxOpen,
  toggleAccordion,
  images,
}) {
  return (
    <div
      className=" mb-4 flex w-full flex-col rounded-xl bg-white shadow-sm"
      key={item?.id || idx}
    >
      <div
        className="flex cursor-pointer justify-between px-8  py-2"
        onClick={() => toggleAccordion(idx, item?.id)}
      >
        <div className="flex items-center space-x-8 py-4">
          <div className="flex items-center">
            <div className="text-neutral-20 text-sm md:text-lg">
              {item?.name || ''}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end">
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
          <div className="text-neutral-20 grid grid-cols-6 justify-start border border-t-gray-300 px-8 py-4 text-sm">
            <div className="col-span-6 grid w-full flex-col content-start space-y-4 md:col-span-2">
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
            <div className="col-span-6 mt-4 grid flex-col space-y-4 pl-0 md:col-span-4 md:pl-4">
              {images?.length > 0 && (
                <ImageCarousel imageList={images} />
              )}

              <CategoryRating data={item} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
