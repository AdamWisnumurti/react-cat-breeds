import { AiOutlineLoading3Quarters } from 'react-icons/ai';

export default function Loading() {
  return (
    <div
      className={
        'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-hidden bg-black bg-opacity-10 pb-16'
      }
    >
      <div className="text-neutral-40 flex flex-col items-center justify-center overflow-hidden">
        <AiOutlineLoading3Quarters
          className={'m-0 animate-spin p-0 text-4xl text-blue-400'}
        />
      </div>
    </div>
  );
}
