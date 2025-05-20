import { fetchManga } from "../service/MangaList";
import { useQuery } from "@tanstack/react-query";
import MangaCard from "../Components/MangaCard";

import { useStores } from "../Store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Pagination } from "antd";
import { useState } from "react";
import { MySidebar } from "@/Components/Sidebar/indexSidebar";

const Catalog = observer(() => {
  const { filterStore } = useStores();
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  /////ПРЕОБРАЗУЕМ ФИЛЬТРЫ

  const { data, isError, isLoading } = useQuery({
    queryKey: [
      "manga",
      currentPage,
      filterStore.tagFilter,
      filterStore.yearFilter,
    ],
    queryFn: () =>
      fetchManga(
        limit,
        limit * currentPage,
        filterStore.tagFilter,
        filterStore.yearFilter,
        null
      ),
  });

  if (isError) return <div>error</div>;

  return (
    <div className="py-5">
      <MySidebar />

      <div className="grid grid-cols-6 min-h-screen">
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
          total={data?.total}
          onChange={(value) => setCurrentPage(Number(value))}
        />
      </div>
    </div>
  );
});
export default Catalog;
