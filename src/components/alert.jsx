import React, { Fragment, useEffect, useCallback } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { CgDanger } from 'react-icons/cg';
import { Button } from '.';

export default function Alert({ modal, setModal }) {
  const { isOpen, message } = modal;
  const toggleClose = useCallback(() => {
    setModal({ ...modal, isOpen: false });
  }, [modal, setModal]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        setModal({ ...modal, isOpen: false });
      }, 3000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  return (
    <>
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
                <Dialog.Panel className="min-w-[25%] max-w-sm rounded-[12px] bg-white px-8 py-5 text-center">
                  <Dialog.Title className="flex flex-col items-center justify-center space-y-4 font-medium">
                    <CgDanger className="text-6xl text-red-500" />
                    <span className="pb-4 text-sm">{message}</span>
                    <Button
                      variant="primary"
                      label="Close"
                      onClick={toggleClose}
                    />
                  </Dialog.Title>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
