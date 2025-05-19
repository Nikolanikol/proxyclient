import { fetchManga } from "../service/MangaList";
import { useQuery } from "@tanstack/react-query";
import MangaCard from "../Components/MangaCard";
import TagFilter from "../Components/TagFilter";
import { useStores } from "../Store/RootStoreContext";
import { observer } from "mobx-react-lite";
import { Pagination } from "antd";
import { useState } from "react";

const Catalog = observer(() => {
  const { filterStore } = useStores();
  const [limit, setLimit] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["manga", currentPage, filterStore.tagFilter],
    queryFn: () =>
      fetchManga(limit, limit * currentPage, filterStore.tagFilter),
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  console.log(data);
  return (
    <div>
      <h2>Catalog Catalog</h2>
      <div className="grid grid-cols-6">
        {/* блок фильтра// */}
        <div className="col-span-2">
          <TagFilter />
        </div>
        <div className="col-span-4">
          {/* {" "}блок каталога */}
          <div className="flex flex-col gap-2">
            {data &&
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
