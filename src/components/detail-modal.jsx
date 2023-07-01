import React, { Fragment, useEffect } from 'react';
import { Button, CategoryRating, ImageCarousel } from '.';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import ReactCountryFlag from 'react-country-flag';

export default function DetailModal({
  modal,
  setModal,
  setSelectedOptions,
}) {
  const { isOpen, data, images } = modal;
  const toggleClose = () => {
    setModal({ ...modal, isOpen: false, data: {}, images: [] });
  };
  useEffect(() => {
    setSelectedOptions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-50"
        onClose={toggleClose}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto font-poppins">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-sm rounded-[12px] bg-white text-center md:max-w-lg">
                <Dialog.Title className="border-gray-90 flex items-center justify-between border-b px-8 py-6 font-semibold">
                  <span>
                    <span>{data?.name || ''}</span>
                    <span className="ml-4">
                      <ReactCountryFlag
                        countryCode={data?.country_code || ''}
                        svg
                        style={{
                          width: '1.5em',
                          height: 'auto',
                        }}
                        className=" rounded-lg"
                        title={data?.country_code || ''}
                      />
                    </span>
                  </span>
                  <span
                    className="text-darkgray cursor-pointer"
                    onClick={() =>
                      setModal({
                        ...modal,
                        isOpen: false,
                        data: {},
                        images: [],
                      })
                    }
                  >
                    <RxCross2 />
                  </span>
                </Dialog.Title>
                <div className="flex h-60 flex-col space-y-4 overflow-auto px-8 py-4 text-xs">
                  <div className="h-full">
                    <ImageCarousel imageList={images} />
                  </div>
                  <span>{data?.description || ''}</span>
                  <span className="font-semibold">
                    {data?.temperament || ''}
                  </span>
                  <CategoryRating data={data} />
                </div>
                <div className="border-gray-90 flex justify-end space-x-5 border-t px-8 pb-5 pt-4">
                  <Button
                    variant="primary"
                    label="Close"
                    onClick={toggleClose}
                  />
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
