import React from 'react';
import { Button } from '..';
import { useNavigate } from 'react-router-dom';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { FiAlertTriangle } from 'react-icons/fi';

const ModalResponse = (props) => {
  const { modal, setModal } = props;
  const { isOpen, isError, messageModal } = modal;
  const navigate = useNavigate();

  if (isOpen) {
    return (
      <div
        id="popup-modal"
        tabIndex="-1"
        className="fixed inset-0 mx-auto flex items-center justify-center overflow-hidden bg-black bg-opacity-25 p-4 "
        onMouseDown={() =>
          setModal({
            ...modal,
            isOpen: false,
          })
        }
      >
        <div className="h-full w-full max-w-md md:h-auto">
          <div className="relative rounded-lg bg-gray-100 shadow-lg dark:bg-gray-100">
            <button
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
            </button>
            <div className="p-6 text-center">
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
              <h3 className="text-darkgrey dark:text-darkgrey mb-5 pb-2 text-lg font-normal">
                {messageModal}
              </h3>
              <div className="flex justify-center">
                <div>
                  <Button
                    type={'submit'}
                    variant={isError ? 'danger' : 'primary'}
                    onClick={() =>
                      messageModal === 'Register Success'
                        ? navigate('/profile')
                        : setModal({
                            ...modal,
                            isOpen: false,
                          })
                    }
                  >
                    {isError ? 'Close' : messageModal}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default ModalResponse;
