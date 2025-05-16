import { fetchManga } from "../service/MangaList";
import { useQuery } from "@tanstack/react-query";
import MangaCard from "../Components/MangaCard";
const Catalog = () => {
  const { data, isError, isLoading } = useQuery({
    queryKey: ["manga"],
    queryFn: fetchManga,
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  console.log(data);
  return (
    <div>
      <h2>Catalog Catalog</h2>

      <div className="flex flex-col gap-2">
        {data &&
          data.data.map((item, i) => {
            return (
              //экземпляр карты
              <MangaCard propsData={item} />
            );
          })}
      </div>
    </div>
  );
};

export default Catalog;
