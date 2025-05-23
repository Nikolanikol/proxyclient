import { FC, useEffect, useState } from "react";
import { fetchCoverFileName, fetchImgMirror } from "../service/MangaList";
import clsx from "clsx";

interface MyImgProps {
  coverId: string | null;
  mangaId: string;
  className?: string;
}
const COVER_BASE_URL = "https://uploads.mangadex.org/covers";

const MyImg: FC<MyImgProps> = ({ coverId, mangaId, className }) => {
  const [imgSrc, setImgSrc] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (coverId)
      fetchCoverFileName(coverId)
        .then((res) => {
          const query = `${COVER_BASE_URL}/${mangaId}/${res.data.attributes.fileName}.256.jpg`;
          fetchImgMirror(query).then((res) => {
            const imgUrl = URL.createObjectURL(res.data); // Создаем URL для изображения
            setImgSrc(imgUrl); // Устанавливаем его в state
          });
        })
        .catch((e) => setIsError(true))
        .finally(() => setIsLoading(false));
  }, [coverId, mangaId]);

  if (isError) return <div>error</div>;
  return (
    <div>
      {!isLoading && (
        <div
          className={clsx(
            className,
            "flex items-center justify-center  min-w-[100px] min-h-[100px]"
          )}
        >
          {/* {coverId} */}

          <img className={clsx("w-full h-full")} src={imgSrc} alt="" />
        </div>
      )}
    </div>
  );
};

export default MyImg;
