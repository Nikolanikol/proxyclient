import { useQuery } from "@tanstack/react-query";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/UI/Shadcn/ShadncnSelect";
import { ScrollArea } from "@/UI/Shadcn/ShadcnScrollArea";
import { useState } from "react";
import { TagIcon } from "lucide-react";
import { fetchTags } from "@/service/MangaList";
import { useStores } from "@/Store/RootStoreContext";
import { useNavigate } from "react-router-dom";

const TagFilter = () => {
  const navigate = useNavigate();
  const { filterStore } = useStores();
  const [activeTag, setActiveTag] = useState<string | null>(
    filterStore.tagFilter
  );
  const { data, isError, isLoading } = useQuery({
    queryKey: ["tags"],
    queryFn: fetchTags,
    staleTime: 1000 * 60 * 5,
  });

  const handleClick = (id: string) => {
    filterStore.setTagFilter(id);
    setActiveTag(id);
    filterStore.setFetchMode("noSearch");
    navigate("/");
  };
  if (isLoading) return <div>loading</div>;
  if (isError) return <div> error</div>;
  if (!data) return <div>no Data</div>;

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-left">
        <div className="flex gap-2">
          <TagIcon />
          <span>Choose Tag</span>
        </div>
      </h2>
      <Select value={activeTag} onValueChange={(e) => handleClick(e)}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Выбери жанр" />
        </SelectTrigger>
        <SelectContent>
          <ScrollArea className="h-100">
            <SelectItem value={null}> Все</SelectItem>
            {data.map((item) => (
              <SelectItem
                key={item.id}
                className="cursor-pointer border-1 border-teal-700"
                value={item.id}
              >
                {" "}
                {item.attributes.name.en}
              </SelectItem>
            ))}
          </ScrollArea>
        </SelectContent>
      </Select>
    </div>
  );
};

export default TagFilter;
