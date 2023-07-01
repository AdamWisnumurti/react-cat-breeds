import React, { Fragment } from 'react';
import { Transition, Dialog } from '@headlessui/react';
import { CgDanger } from 'react-icons/cg';

export default function Alert({ modal, setModal }) {
  return (
    <>
      <Transition appear show={modal.isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setModal({ ...modal, isOpen: false })}
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
                <Dialog.Panel className="rounded-[12px] bg-white py-5 pl-8 pr-16 text-center">
                  <Dialog.Title className="flex items-center space-x-3 font-medium">
                    <CgDanger
                      className={
                        modal.isError
                          ? 'text-danger '
                          : 'text-[#00A790] '
                      }
                    />
                    <span className="text-sm">
                      {modal?.responseMassage}
                    </span>
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
