import { IDataMangaItem } from "@/service/MangaList/TypeMangaResponce";
import TagItem from "@/UI/TagItem";
import { FC } from "react";

interface TagRowProps {
  data: IDataMangaItem;
  mode: "full" | "chunk";
}
const TagRow: FC<TagRowProps> = ({ data, mode }) => {
  return (
    <div className="flex flex-wrap  gap-x-2 gap-y-0.5">
      {data.attributes.tags.map((obj, i) => {
        if (i < 8) {
          return <TagItem data={obj} />;
        }
      })}
    </div>
  );
};

export default TagRow;
