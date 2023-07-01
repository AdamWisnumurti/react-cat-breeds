import React from 'react';
import Button from './button';

const PageNotFound = () => {
  // const router = useRouter();
  return (
    <div
      id="popup-modal"
      // tabIndex="-1"
      className="flex items-center justify-center fixed mx-auto z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 bg-gradient-to-br from-[#787777] to-[#E9E9E9]"
    >
      <div className="relative w-full h-full max-w-md md:h-auto">
        <div className="relative bg-gray-100 rounded-lg shadow-lg dark:bg-gray-100">
          <div className="p-6 text-center">
            <svg
              aria-hidden="true"
              className="mx-auto mb-4 text-red-500 w-16 h-16 dark:text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h3 className="mb-5 pb-2 text-lg font-normal text-darkgrey dark:text-darkgrey">
              Page Not Found
            </h3>
            <div className="flex justify-center">
              {/* <Link to="/login" className="w-1/2">
                <Button
                  type={'submit'}
                  variant={'primary'}
                  label={'Back to home'}
                />
              </Link> */}
              <Button>Back To Home</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
