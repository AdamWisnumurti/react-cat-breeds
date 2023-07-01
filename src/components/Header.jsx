import React, { useState, useCallback, useRef } from 'react';
import AutoComplete from './AutoComplete';
import CatServices from '../services/cats';
// import { useNavigate } from 'react-router-dom';
import { BsCaretDownFill } from 'react-icons/bs';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useEffect } from 'react';
import useBoolean from '../hooks/useBoolean';
import DetailModal from './DetailModal';

export default function Header() {
  const { getAllCats, getCatById } = CatServices();
  // const navigate = useNavigate();
  const toggleLogout = useRef(null);
  const [isLoad, setIsLoad] = useState(true);
  const [openProfile, { on: toggleOn, off: toggleOff }] =
    useBoolean(false);
  const [optionList, setOptionList] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState('');
  const [modal, setModal] = useState({
    isOpen: false,
    data: {},
    images: [],
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
      console.log(optionList);
      console.log(selectedData);
      setModal({
        ...modal,
        isOpen: true,
        data: selectedData,
        images: res.data,
      });
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fethcList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        toggleLogout.current &&
        !toggleLogout.current.contains(event.target)
      ) {
        toggleOff();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
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
      <section className="fixed z-40 w-full" ref={toggleLogout}>
        <div className="text-darkgrey grid h-20 grid-cols-6 items-center space-x-4 bg-white px-4 py-4 shadow-sm md:px-8">
          Hello Cat Lover
          <div className="col-span-3 items-center rounded-md bg-gray-200 px-2 py-1">
            <div className="flex w-full items-center ">
              <AutoComplete
                options={optionList}
                setSelected={setSelectedOptions}
                maxSuggest={5}
                isLoad={isLoad}
              />
            </div>
          </div>
          <div className="col-span-2">
            <div className="flex items-center justify-end space-x-2">
              <IoNotificationsOutline className="text-md md:text-2xl" />
              <div>
                <div
                  className="border-darkgrey cursor-pointer items-center rounded border bg-white p-1"
                  onClick={() => {
                    openProfile ? toggleOff() : toggleOn();
                  }}
                >
                  <div className="flex w-full items-center ">
                    <div className="flex items-center text-sm">
                      <span className="border-primary mr-1 rounded-md p-1 uppercase">
                        <span className="rounded-lg bg-gray-300 px-2 py-1"></span>
                      </span>
                      <span className="pl-0">
                        <BsCaretDownFill />
                      </span>
                    </div>
                  </div>
                </div>
                {openProfile && (
                  <div className="fixed z-[60] mt-1 cursor-pointer rounded bg-gray-200 px-2 py-2 text-xs shadow-md hover:bg-white">
                    <div className="text-darkgrey">
                      <span>Log out</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <DetailModal
        modal={modal}
        setModal={setModal}
        setSelectedOptions={setSelectedOptions}
      />
    </>
  );
}
