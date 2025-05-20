import { FC } from "react";
import { IDataMangaItem } from "../service/MangaList/TypeMangaResponce";

import { Link } from "react-router-dom";
import MyImg from "../UI/MyImg";
import { Button } from "@/UI/Shadcn/ShadcnButton";
import TagItem from "@/UI/TagItem";
import TagRow from "./TagRow";
interface MangaCardProps {
  propsData: IDataMangaItem;
}

const MangaCard: FC<MangaCardProps> = ({ propsData }) => {
  let coverArtId: string | undefined = propsData.relationships.find(
    (i) => i.type === "cover_art"
  )?.id;

  return (
    <div
      key={propsData.id}
      className="border-2 border-teal-700 flex gap-2 h-50 overflow-hidden
      max-w-screen "
    >
      <MyImg
        className="w-[150px] h-[200px]"
        mangaId={propsData.id}
        coverId={coverArtId ? coverArtId : null}
      />
      <div className="py-2 px-3 w-full h-full">
        <div className="flex flex-col items-center w-full h-full justify-between ">
          <h3 className="line-clamp-custom">{propsData.attributes.title.en}</h3>
          {/* //tag row */}
          <TagRow data={propsData} mode="chunk" />

          <Button className="py-3 px-4 border-2 rounded-2xl cursor-pointer">
            <Link to={`manga/${propsData.id}`}> Перейти</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default MangaCard;
