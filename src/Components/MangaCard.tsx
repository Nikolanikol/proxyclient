import { FC, useEffect, useState } from "react";
import { IDataMangaItem } from "../service/MangaList/TypeMangaResponce";
import { fetchCoverManga } from "../service/MangaList";

import { ICoverResponce } from "../service/MangaList/TypeCoverResponce";
interface MangaCardProps {
  propsData: IDataMangaItem;
}
const MangaCard: FC<MangaCardProps> = ({ propsData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState<ICoverResponce>();
  useEffect(() => {
    const coverArtId: string | undefined = propsData.relationships.find(
      (i) => i.type === "cover_art"
    )?.id;

    if (coverArtId)
      fetchCoverManga(coverArtId)
        .then((res) => setData(res))
        .catch((e) => setIsError(true))
        .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  if (!data) return <div>not fiund</div>;
  const fileName: string = data.data.attributes.fileName;
  console.log(data.data.attributes.fileName);
  console.log(propsData);
  return (
    <div key={propsData.id} className="border-2 border-teal-700 flex gap-2">
      <span>2</span> <h3>{propsData.attributes.title.en}</h3>
      <img
        width={100}
        height={100}
        src={`https://uploads.mangadex.org/covers/${propsData.id}/${fileName}.256.jpg`}
        alt=""
      />
    </div>
  );
};
export default MangaCard;
