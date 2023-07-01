import React from 'react';
import { Dot } from '..';
import { TbPencil, TbTrash } from 'react-icons/tb';

export default function CheckBoxList({
  list,
  toggleCheck,
  handleOpenEdit,
  setModalDel,
}) {
  return (
    <div className=" mt-20 md:mt-16 ">
      {list?.map((item, key) => {
        return (
          <div
            className="shadow-0 mb-4 grid w-full grid-cols-6 items-center rounded-[12px] bg-white p-[28px] font-poppins text-sm md:text-lg"
            key={`${item.id}-check-${key}`}
          >
            <div className="col-span-5 flex items-center">
              <input
                type="checkbox"
                onChange={() => {
                  toggleCheck(item?.id);
                }}
                checked={item.is_active === 0}
                className="mr-2 cursor-pointer"
              />
              <span className="mx-1 md:mx-4">
                <Dot type={item?.priority} />
              </span>
              <div
                className={
                  item.is_active === 0
                    ? 'text-secondary-0 line-through'
                    : ''
                }
              >
                <p className="truncate...">{item?.title}</p>
              </div>
              <span
                className="text-secondary-0 ml-4 cursor-pointer text-sm md:text-base"
                onClick={() => handleOpenEdit(item.id)}
              >
                <TbPencil />
              </span>
            </div>
            <div
              onClick={() =>
                setModalDel({
                  isOpen: true,
                  id: item?.id,
                  title: item?.title,
                })
              }
              className="text-secondary-0 grid cursor-pointer justify-end text-lg"
            >
              <TbTrash className="" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
