import React, { useMemo } from 'react';
import classNames from 'classnames';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const Button = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  ...props
}) => {
  const variantButton = useMemo(() => {
    switch (variant) {
      case 'primary':
        return 'text-white bg-blue-900 dark:bg-blue-900 enabled:hover:opacity-90 enabled:dark:hover:opacity-90 dark:focus:ring-blue-800 focus:outline-blue-800 disabled:opacity-60';
      case 'secondary':
        return 'text-darkgrey bg-secondary dark:bg-secondary-1 dark:hover:bg-secondary dark:focus:ring-primary-800 border border-lightgrey ';
      case 'danger':
        return 'text-white bg-red-600 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-red-600 dark:focus:ring-red-800 border border-red-600 hover:border-red-600 ';
      default:
        return 'text-white bg-primary hover:bg-secondary dark:bg-primary dark:hover:bg-secondary dark:focus:ring-primary focus:outline-none focus:ring-primary ';
    }
  }, [variant]);

  const baseClass =
    'font-semibold rounded-[45px] py-3 text-center align-center items-center flex justify-center outline-none disabled:cursor-not-allowed disabled:bg-grey dark:disabled:bg-grey';

  const sizeClasses = useMemo(() => {
    switch (size) {
      case 'lg':
        return ['h-10', 'text-md', 'px-8', 'py-5'];
      case 'md':
        return ['h-8', 'text-sm', 'px-6', 'py-4'];
      default:
        return ['h-6', 'text-[0.8125rem]', 'px-4', 'py-3'];
    }
  }, [size]);

  return (
    <button
      className={classNames(
        variantButton(variant),
        sizeClasses,
        baseClass
      )}
      {...props}
    >
      {isLoading ? (
        <AiOutlineLoading3Quarters className="my-0.5 animate-spin" />
      ) : (
        props.label ?? props.children
      )}
    </button>
  );
};

export default Button;
