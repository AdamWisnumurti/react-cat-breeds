import React, { Fragment } from 'react';
import { Button } from '.';
import { Dialog, Transition } from '@headlessui/react';
import { RxCross2 } from 'react-icons/rx';
import ImageCarousel from './ImageCarousel';
import CategoryRating from './CategoryRating';

export default function DetailModal({
  modal,
  setModal,
  setSelectedOptions,
}) {
  const { isOpen, data, images } = modal;
  const toggleClose = () => {
    setModal({ ...modal, isOpen: false, data: {}, images: [] });
  };
  setSelectedOptions();

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
                  <span>{data?.name || ''}</span>
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
                <div className="flex flex-col space-y-4 px-8 text-xs">
                  <ImageCarousel imageList={images} />
                  <span>{data?.description || ''}</span>
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
