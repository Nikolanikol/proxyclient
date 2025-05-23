import { fetchMangaAll } from "../service/MangaList";
import { useQuery } from "@tanstack/react-query";
import MangaCard from "../Components/MangaCard";

import { useStores } from "../Store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Pagination } from "antd";
import { useEffect, useState } from "react";

const Catalog = observer(() => {
  const { filterStore } = useStores();
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  /////ПРЕОБРАЗУЕМ ФИЛЬТРЫ
  useEffect(() => {
    const page = localStorage.getItem("page")
      ? localStorage.getItem("page")
      : null;
    if (page) setCurrentPage(Number(currentPage));
  });

  const { data, isError, isLoading } = useQuery({
    queryKey: [
      currentPage,
      filterStore.tagFilter,
      filterStore.yearFilter,
      filterStore.fetchMode,
      filterStore.searchQuery,
    ],
    queryFn: () =>
      fetchMangaAll(
        limit,
        limit * currentPage,
        filterStore.tagFilter,
        filterStore.yearFilter,
        null,
        filterStore.searchQuery,
        filterStore.fetchMode
      ),

    staleTime: 1000 * 60 * 5, // 5 минут — пока свежие, без повторного запроса
    // cacheTime: 1000 * 60 * 30, // 30 минут — пока запрос остаётся в кэше
  });
  const handlePaginationClick = (value: number) => {
    setCurrentPage(Number(value));
    localStorage.setItem("page", value.toString());
  };
  if (isError) return <div>error</div>;
  //   console.log(data);
  return (
    <div className="py-5">
      <div className="grid grid-cols-6 min-h-screen py-5">
        {/* блок фильтра// */}

        <div className="col-span-6">
          {/* {" "}блок каталога */}
          <div className="flex flex-col gap-2">
            {!isLoading &&
              data &&
              data.data.map((item, i) => {
                return (
                  //экземпляр карты
                  <MangaCard key={i} propsData={item} />
                );
              })}
          </div>
        </div>
      </div>
      {/* //пагинация */}
      <div>
        {" "}
        <Pagination
          defaultCurrent={currentPage}
          current={currentPage}
          total={data?.total}
          onChange={(value) => handlePaginationClick(value)}
        />
      </div>
    </div>
  );
});
export default Catalog;
