import { useQuery } from "@tanstack/react-query";
import React from "react";
import { fetchTags } from "../service/MangaList";
import { FilterStore } from "../Store/FilterStore";
import { useStores } from "../Store/RootStoreContext";

const TagFilter = () => {
  const { filterStore } = useStores();

  const { data, isError, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5,
  });

  const handleClick = (id: string) => {
    filterStore.setTag(id);
  };
  if (isLoading) return <div>loading</div>;
  if (isError) return <div> error</div>;
  if (!data) return <div>no Data</div>;

  return (
    <div>
      <h2>TagFilter TagFilter</h2>
      {data.map((item) => (
        <div
          key={item.id}
          onClick={() => handleClick(item.id)}
          className="cursor-pointer border-1 border-teal-700"
        >
          {" "}
          {item.attributes.name.en}
        </div>
      ))}
    </div>
  );
};

export default TagFilter;
