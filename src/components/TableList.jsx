import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useState } from 'react';
import AccordionItem from './AccordionItem';
import Search from './Search';
import CatServices from '../services/cats';

function TableList({ isLoading, limit, data }) {
  const { getCatById } = CatServices();
  const [showList, setShowList] = useState(data.slice(0, limit)); // For showing list as accordions
  const [hasMore, setHasMore] = useState(true); // Check if data still exist on the next load of  infinite scroll
  const [searchTerm, setSearchTerm] = useState(''); // Search keyword
  const [listSuggest, setListSuggest] = useState([]); // For filtered list compare to all list
  const [idxOpen, setIdxOpen] = useState(0); // For accordion open / close toggle
  const [images, setImages] = useState([]); // Selected Id by onClick accordion items

  const loadMoreData = () => {
    const lenShowList = showList?.length;
    const lenCatList = data?.length;
    const lenSuggestList = listSuggest?.length;
    if (lenShowList >= lenCatList) {
      setHasMore(false);
      return;
    }

    if (searchTerm.length > 0 && lenShowList >= lenSuggestList) {
      setHasMore(false);
      return;
    }

    // a fake async api call like which sends
    // 10 more records in 1 secs

    if (searchTerm) {
      setTimeout(() => {
        setShowList(listSuggest.slice(0, lenShowList + limit));
      }, 1000);
    } else {
      setTimeout(() => {
        setShowList(data.slice(0, lenShowList + limit));
      }, 1000);
    }
  };

  const toggleAccordion = (index, id) => {
    if (idxOpen === index + 1) {
      setIdxOpen(0);
    } else {
      setIdxOpen(index + 1);
      fethcById(id);
    }
  };

  const fethcById = async (id) => {
    const params = { breeds_ids: id, limit: 5 };
    try {
      const res = await getCatById(params);
      setImages(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Always rerender if user search for the accordion lists
  useEffect(() => {
    if (searchTerm.length > 0) {
      setShowList(listSuggest.slice(0, limit));
      // setHasMore(false);
    } else if (searchTerm.length === 0) {
      setShowList(data.slice(0, limit));
      setHasMore(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, listSuggest]);

  return (
    <div className="mt-10 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <div className="relative border-b border-gray-200 sm:rounded-lg ">
            <div className="my-4 flex justify-between ">
              <div className="flex items-center text-xs sm:text-sm">
                {showList.length} / {data.length} Items
              </div>
              <div className="w-2/3 md:w-2/5">
                <Search
                  data={data}
                  setListSuggest={setListSuggest}
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                />
              </div>
            </div>
            <InfiniteScroll
              dataLength={showList?.length}
              next={loadMoreData}
              hasMore={hasMore}
              loader={
                <h4 className="my-2 text-center">Loading...</h4>
              }
              height={800}
            >
              {isLoading && ' ...Loading'}
              <div className="divide-neutral-0 min-w-full max-w-lg divide-y">
                <div className="w-full">
                  {showList?.length < 1 && 'Empty'}
                  {showList?.map((item, key) => (
                    <AccordionItem
                      item={item}
                      key={key}
                      idx={key}
                      idxOpen={idxOpen}
                      toggleAccordion={toggleAccordion}
                      images={images}
                    />
                  ))}
                </div>
              </div>
            </InfiniteScroll>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TableList;
