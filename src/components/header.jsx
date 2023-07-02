import React, { useState } from 'react';
import { AutoComplete, DetailModal, Alert } from '.';
import CatServices from '../services/cats';
import { BsCaretDownFill } from 'react-icons/bs';
import { FaCat } from 'react-icons/fa';
import { useEffect } from 'react';

export default function Header() {
  const { getAllCats, getCatById } = CatServices();
  const [isLoad, setIsLoad] = useState(true);
  const [optionList, setOptionList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState('');
  const [modal, setModal] = useState({
    isOpen: false,
    data: {},
    images: [],
  });
  const [modalResponse, setModalResponse] = useState({
    isOpen: false,
    isError: false,
    message: '',
  });

  const fethcList = async () => {
    setIsLoad(true);
    try {
      const res = await getAllCats();
      setOptionList(
        res.data.map((item) => {
          return { value: item.id, ...item };
        })
      );
      setIsLoad(false);
    } catch (err) {
      console.log(err);
      setIsLoad(false);
    }
  };

  const fethcById = async (id) => {
    const params = { breeds_ids: id, limit: 5 };
    try {
      const res = await getCatById(params);
      const selectedData = optionList.find((item) => item.id === id);
      setModal({
        ...modal,
        isOpen: true,
        data: selectedData,
        images: res.data,
      });
    } catch (err) {
      console.log(err);
      setModalResponse({
        ...modalResponse,
        isOpen: true,
        isError: true,
        message: err?.response?.data?.message || 'Service error',
      });
    }
  };

  useEffect(() => {
    fethcList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (selectedOptions) {
      fethcById(selectedOptions);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedOptions]);

  return (
    <>
      <section className="fixed z-40 w-full">
        <div className="text-darkgrey grid h-20 grid-cols-6 items-center bg-white px-4 py-4 shadow-sm md:px-8">
          <span className="hidden sm:block">Hi, Cat Lovers</span>
          <div className="col-span-4 flex w-full items-center rounded-md bg-gray-200 px-2 py-1 md:col-span-4 ">
            <AutoComplete
              options={optionList}
              setSelected={setSelectedOptions}
              maxSuggest={5}
              isLoad={isLoad}
            />
          </div>
          <div className="col-span-2 flex items-center justify-end space-x-2 sm:col-span-1">
            <div className="border-darkgrey cursor-pointer items-center rounded border bg-white p-1">
              <div className="flex w-full items-center ">
                <div className="flex items-center text-sm">
                  <span className="border-primary mr-1 rounded-md p-1 uppercase">
                    <span>
                      <FaCat className="rounded-lg bg-gray-300 p-1 text-2xl" />
                    </span>
                  </span>
                  <span className="pl-0">
                    <BsCaretDownFill />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DetailModal
          modal={modal}
          setModal={setModal}
          setSelectedOptions={setSelectedOptions}
        />
        <Alert modal={modalResponse} setModal={setModalResponse} />
      </section>
    </>
  );
}
