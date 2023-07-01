import React, { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { Button } from '..';
import { FiAlertTriangle } from 'react-icons/fi';
import { AiOutlineCheckCircle } from 'react-icons/ai';

export default function ResponseModal({ modal, setModal }) {
  const { isOpen, isError, messageModal } = modal;
  const navigate = useNavigate();

  return (
    <Transition appear show={isOpen} as={Fragment}>
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
              <Dialog.Panel className="w-full max-w-xs rounded-[12px] bg-white px-8 pb-5 pt-6 text-center md:max-w-md md:px-16 md:pb-10 md:pt-12">
                <Button
                  type="button"
                  className="text-darkgrey absolute right-2.5 top-3 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm"
                  data-modal-hide="popup-modal"
                  onClick={() =>
                    setModal({
                      ...modal,
                      isOpen: false,
                    })
                  }
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </Button>
                {isError && (
                  <div className="mb-4 flex h-16 justify-center text-[60px] text-red-500">
                    <FiAlertTriangle />
                  </div>
                )}
                {isOpen && !isError && (
                  <>
                    <div className="mb-4 flex h-16 justify-center text-[60px] text-green-500">
                      <AiOutlineCheckCircle />
                    </div>
                  </>
                )}
                <Dialog.Description className="mb-12 font-bold">
                  {messageModal}
                </Dialog.Description>
                <div className="flex justify-center space-x-5">
                  <Button
                    variant={isError ? 'danger' : 'primary'}
                    label="Close"
                    onClick={() => {
                      messageModal === 'Register Success'
                        ? navigate('/dashboard')
                        : setModal({ ...modal, isOpen: false });
                    }}
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
