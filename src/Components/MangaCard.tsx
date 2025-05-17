import { FC } from "react";
import { IDataMangaItem } from "../service/MangaList/TypeMangaResponce";

import { Link } from "react-router-dom";
import MyImg from "../UI/MyImg";
interface MangaCardProps {
  propsData: IDataMangaItem;
}
const COVER_BASE_URL = "https://uploads.mangadex.org/covers";
const MangaCard: FC<MangaCardProps> = ({ propsData }) => {
  let coverArtId: string | undefined = propsData.relationships.find(
    (i) => i.type === "cover_art"
  )?.id;

  return (
    <div key={propsData.id} className="border-2 border-teal-700 flex gap-2">
      <span>2</span> <h3>{propsData.attributes.title.en}</h3>
      <MyImg mangaId={propsData.id} coverId={coverArtId ? coverArtId : null} />
      <button className="py-3 px-4 border-2 rounded-2xl cursor-pointer">
        <Link to={`manga/${propsData.id}`}> Перейти</Link>
      </button>
    </div>
  );
};
export default MangaCard;
