import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BsArrowDownUp, BsCheck2 } from 'react-icons/bs';
import { SortIcon } from '..';

export default function Sort({ selected, setSelected }) {
  const options = [
    'Terbaru',
    'Terlama',
    'A-Z',
    'Z-A',
    'Belum Selesai',
  ];

  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 font-poppins">
        <Listbox.Button className="border-darkgray focus-visible:border-darkgray focus-visible:ring-darkgray focus-visible:ring-offset-darkgray relative cursor-pointer rounded-full border bg-white p-3 text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-offset-2 ">
          <BsArrowDownUp />
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {options.map((item, index) => (
              <Listbox.Option
                key={`${item}-${index}`}
                className={({ active }) =>
                  `relative cursor-pointer select-none px-4 py-2 ${
                    active
                      ? 'bg-blue-200 text-black'
                      : 'text-gray-900'
                  }`
                }
                value={item}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`flex items-center space-x-3 truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      <SortIcon type={item} />
                      <span>{item}</span>
                      {selected ? (
                        <span className=" text-primary-0 flex items-center">
                          <BsCheck2 className="h-5 w-5" />
                        </span>
                      ) : null}
                    </span>
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
  );
}
