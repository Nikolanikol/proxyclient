import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChapterList, fetchChapterSlides } from "../service/MangaList";
import { IChapterItem } from "../service/MangaList/TypeChapterResponce";
import { TypeChapterSlidesResponce } from "../service/MangaList/TypeChapterSlidesResponce";
import { useStores } from "@/Store/RootStoreContext";

const MangaReadPage = () => {
  const { id } = useParams();
  const [chapters, setChapters] = useState<IChapterItem[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<string>("1");
  useEffect(() => {
    if (id) {
      fetchChapterList(id)
        .then((res) => setChapters(res))
        .catch(() => setError(true))
        .finally(() => setLoading(false));
    }
  }, [id]);
  const mangaName = localStorage.getItem("mangaName")
    ? localStorage.getItem("mangaName")
    : "не найдено";

  return (
    <div>
      {!loading && chapters && (
        <div className="w-screen text-2xl font-semibold py-5">
          <h3>{mangaName}</h3>
          <div>
            <select
              name=""
              id=""
              value={currentChapter}
              onChange={(e) => setCurrentChapter(e.target.value)}
            >
              <option value={""}>Все</option>
              {chapters.map((item, i) => (
                <option key={i} value={item.id}>
                  {Number(item.chapter)}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-5 border-2 border-teal-800">
            {currentChapter && <MangaChapterView chapterId={currentChapter} />}
          </div>
          <div>
            <select
              name=""
              id=""
              value={currentChapter}
              onChange={(e) => setCurrentChapter(e.target.value)}
            >
              <option value={""}>Все</option>
              {chapters.map((item, i) => (
                <option key={i} value={item.id}>
                  {Number(item.chapter)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default MangaReadPage;

interface MangaChapterViewProps {
  chapterId: string | undefined;
}
const MangaChapterView: FC<MangaChapterViewProps> = ({ chapterId }) => {
  const [data, setData] = useState<TypeChapterSlidesResponce | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    setLoading(true);
    if (chapterId) {
      fetchChapterSlides(chapterId)
        .then((res) => setData(res))
        .catch((e) => console.log(e))
        .finally(() => setLoading(false));
    }
  }, [chapterId]);
  console.log(data);
  if (loading) return <div>loading</div>;
  if (error) return <div>error</div>;
  if (!data) return <div>not found</div>;
  return (
    <div>
      {" "}
      {/* <h2>{chapterId} </h2> */}
      <div className="flex flex-col items-center ">
        {data.chapter.data.map((item) => {
          const baseUrl = data.baseUrl;
          const hash = data.chapter.hash;
          return (
            <img
              width={300}
              height={400}
              className="w-full"
              src={baseUrl + "/data" + "/" + hash + "/" + item}
              alt=""
            />
          );
        })}
      </div>
    </div>
  );
};
