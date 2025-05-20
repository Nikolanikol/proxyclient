import { useQuery } from "@tanstack/react-query";

import { Link, useParams } from "react-router-dom";
import { fetchMangaById } from "../service/MangaList";
import { ILangValue } from "../service/MangaList/TypeMangaResponce";
import MyImg from "../UI/MyImg";
import { Button } from "@/UI/Shadcn/ShadcnButton";
import TagRow from "@/Components/TagRow";
import { useStores } from "@/Store/RootStoreContext";
//получаем название манги
const getMangaName = (arr: { [lang: string]: string }[]) => {
  if (arr) {
    if (arr.length > 0) {
      let flag = false;
      let res: string = Object.values(arr[0])[0];
      arr.map((item) => {
        if (item.en && !flag) {
          flag = true;
          res = item.en;
        } else if (item.ru) {
          flag = true;
          res = item.ru;
        } else if (item.ko) {
          flag = true;
          res = item.ko;
        }
      });

      return res;
    } else return "mistake";
  }
};
const MangaById = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mangaTitleData"],
    queryFn: () => (id ? fetchMangaById(id) : Promise.resolve(null)),
    // staleTime: 1000 * 60 * 5, // 5 минут — пока свежие, без повторного запроса
  });

  const coverId = data
    ? data.data.relationships.find((i) => i.type === "cover_art")?.id
    : "";
  const mangaName = getMangaName(data?.data.attributes.altTitles);
  //   console.log(data.data.attributes.altTitles);
  return (
    <div>
      {!isLoading && data && (
        <div className=" w-screen overflow-hidden">
          <div className=" rounded-2xl border-b-2 text-2xl font-semibold">
            <h2>{mangaName}</h2>
          </div>
          <div className="flex gap-1 justify-between pt-5">
            {" "}
            <MyImg
              className="w-[180px] h-[220px] shrink-0"
              coverId={coverId ? coverId : null}
              mangaId={data.data.id}
            />
            {/* go to read title//// */}
            <div className="flex flex-col justify-between items-center pr-5">
              <TagRow data={data.data} mode="full" />
              <Button
                onClick={() => localStorage.setItem("mangaName", mangaName)}
                className=" border-gray-400 px-2 py-2  rounded-xl border-2 cursor-pointer"
              >
                <Link
                  className="h-full w-full flex items-center "
                  to={`/mangaread/${data.data.id}`}
                >
                  Перейти к чтению
                </Link>
              </Button>
            </div>
          </div>
          {/* title name //// */}

          {/* description///// */}
          <div>{data.data.attributes.description["en"]}</div>
          {/* ////cover for img */}
        </div>
      )}
    </div>
  );
};

export default MangaById;

const getDataFromArr = (arr: ILangValue[]): string => {
  let string: string = "";

  for (let item of arr) {
    if (item[0] === "en") {
      string = item[1];
    }
  }

  return string;
};
