import { FC, useEffect, useState } from "react";
import { IDataMangaItem } from "../service/MangaList/TypeMangaResponce";
import { fetchCoverManga, testCover } from "../service/MangaList";

import { ICoverResponce } from "../service/MangaList/TypeCoverResponce";
interface MangaCardProps {
  propsData: IDataMangaItem;
}
const MangaCard: FC<MangaCardProps> = ({ propsData }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  //   const [data, setData] = useState<ICoverResponce>();
  const [imgSrc, setImgSrc] = useState();
  useEffect(() => {
    const coverArtId: string | undefined = propsData.relationships.find(
      (i) => i.type === "cover_art"
    )?.id;

    if (coverArtId)
      fetchCoverManga(coverArtId)
        .then((res) => {
          const query = `https://uploads.mangadex.org/covers/${propsData.id}/${res.data.attributes.fileName}.256.jpg`;
          testCover(query).then((res) => {
            const imgUrl = URL.createObjectURL(res.data); // Создаем URL для изображения
            setImgSrc(imgUrl); // Устанавливаем его в state
            console.log("imgUrl", imgUrl);
          });
          // .then((blob) => setImgSrc(URL.createObjectURL(blob)))
          // .then(() => console.log(imgSrc));
        })
        .catch((e) => setIsError(true))
        .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error</div>;
  //   if (!data) return <div>not fiund</div>;
  //   const fileName: string = data.data.attributes.fileName;
  //   testCover(query);
  return (
    <div key={propsData.id} className="border-2 border-teal-700 flex gap-2">
      <span>2</span> <h3>{propsData.attributes.title.en}</h3>
      <img width={100} height={100} src={imgSrc} alt="" />
    </div>
  );
};
export default MangaCard;
