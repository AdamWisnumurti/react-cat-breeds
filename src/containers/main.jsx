import React, { useEffect, useState } from 'react';
import useBoolean from '../hooks/useBoolean';
import CatServices from '../services/cats';
import { TableList } from '../components';

export default function MainPage() {
  const { getAllCats } = CatServices();
  const [catList, setCatList] = useState([]);
  const [isLoad, { on: loadTrue, off: loadFalse }] = useBoolean(true);
  const [modalResponse, setModalResponse] = useState({
    isOpen: false,
    isError: false,
    message: '',
  });

  const fethcList = async () => {
    loadTrue();
    try {
      const res = await getAllCats();
      setCatList(res.data);
    } catch (err) {
      setModalResponse({
        ...modalResponse,
        isOpen: true,
        isError: true,
        message: err?.response?.data?.message || 'Service error',
      });
    } finally {
      loadFalse();
    }
  };

  useEffect(
    () => {
      fethcList();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  if (isLoad) {
    return <div className="animate-bounce">Loading...</div>;
  }
  return (
    <>
      <div className="mb-4 flex justify-start md:mb-8">
        <p className="text-base font-bold md:text-4xl">Cat List</p>
      </div>
      <TableList isLoading={isLoad} data={catList} limit={10} />
      {/* <Alert modal={modalResponse} setModal={setModalResponse} /> */}
    </>
  );
}
