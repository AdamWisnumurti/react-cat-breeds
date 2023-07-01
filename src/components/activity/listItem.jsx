import React, { Fragment } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { BsChevronDown } from 'react-icons/bs';
import { Dot } from '..';

export default function ListItem({ selected, setSelected, options }) {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <div className="relative mt-1 pb-6">
        <Listbox.Button className="border-gray-90 relative flex cursor-pointer justify-items-start rounded-lg border bg-white py-2 pl-3 pr-10 text-left text-sm font-normal focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 md:text-base md:font-medium">
          <span className="min-w-14 flex items-center truncate">
            <Dot type={selected} />
            {options.find((item) => item.value === selected)?.name ||
              ''}
          </span>
          <span className="absolute inset-y-0 right-0 flex items-center pr-2">
            <BsChevronDown />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 overflow-auto rounded-md bg-white py-1 text-sm font-normal shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm md:text-base md:font-medium">
            {options.map((item, index) => (
              <Listbox.Option
                key={`${item.value}-${index}`}
                className={({ active }) =>
                  `relative cursor-pointer select-none px-4 py-2 ${
                    active
                      ? 'bg-blue-200 text-black'
                      : 'text-gray-900'
                  }`
                }
                value={item.value}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`flex items-center truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      <Dot type={item.value} />
                      {item.name}
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
