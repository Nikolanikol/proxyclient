import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchChapterList, fetchChapterSlides } from "../service/MangaList";
import { IChapterItem } from "../service/MangaList/TypeChapterResponce";
import { TypeChapterSlidesResponce } from "../service/MangaList/TypeChapterSlidesResponce";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/UI/Shadcn/ShadncnSelect";
import { ScrollArea } from "@/UI/Shadcn/ShadcnScrollArea";

const MangaReadPage = () => {
  const { id } = useParams();
  const [chapters, setChapters] = useState<IChapterItem[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currentChapter, setCurrentChapter] = useState<string>();
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
          <div className="w-full flex justify-center ">
            <Select onValueChange={(e) => setCurrentChapter(e)}>
              <SelectValue placeholder="Выбери главу" />

              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выбери главу" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-100">
                  <SelectItem value={null}> Все</SelectItem>
                  {chapters.map((item) => (
                    <SelectItem
                      key={item.id}
                      className="cursor-pointer border-1 border-teal-700"
                      value={item.id}
                    >
                      {" "}
                      {Number(item.chapter)}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
          </div>
          <div className="mt-5  min-h-screen">
            {currentChapter && <MangaChapterView chapterId={currentChapter} />}
          </div>
          <div className="w-full flex justify-center">
            <Select
              value={currentChapter}
              onValueChange={(e) => setCurrentChapter(e)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Выбери жанр" />
              </SelectTrigger>
              <SelectContent>
                <ScrollArea className="h-100">
                  <SelectItem value={null}> Все</SelectItem>
                  {chapters.map((item) => (
                    <SelectItem
                      key={item.id}
                      className="cursor-pointer border-1 border-teal-700"
                      value={item.id}
                    >
                      {" "}
                      {Number(item.chapter)}
                    </SelectItem>
                  ))}
                </ScrollArea>
              </SelectContent>
            </Select>
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

  return (
    <div>
      <div className="flex flex-col items-center ">
        {!loading &&
          data &&
          data.chapter.data.map((item, i) => {
            const baseUrl = data.baseUrl;
            const hash = data.chapter.hash;
            return (
              <img
                key={i}
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
