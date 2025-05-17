import { useQuery } from "@tanstack/react-query";

import { Link, useParams } from "react-router-dom";
import { fetchMangaById } from "../service/MangaList";
import { ILangValue } from "../service/MangaList/TypeMangaResponce";
import MyImg from "../UI/MyImg";

const MangaById = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["mangaTitleData"],
    queryFn: () => (id ? fetchMangaById(id) : Promise.resolve(null)),
  });

  if (isLoading) return <div>loading</div>;
  if (isError) return <div>error;</div>;
  if (!data) return <div>title not fiunded</div>;
  console.log(data);
  const coverId = data.data.relationships.find(
    (i) => i.type === "cover_art"
  )?.id;
  return (
    <div>
      {/* title name //// */}
      <div className="border-2 rounded-2xl border-teal-600">
        <h2>название тайтла</h2>
        <h3>{data.data.id} </h3>
        {data.data.attributes.altTitles.map((item, i) => {
          const title: string = Object.values(item)[0] as string;

          return <h2 key={i}>{title} </h2>;
        })}
      </div>
      {/* description///// */}
      <div>{data.data.attributes.description["en"]}</div>
      {/* ////cover for img */}
      <div className=" p-4 border-teal-600  border-2 rounded-3xl min-h-[200px] minw-[300px]">
        {" "}
        <div className="flex gap-5 justify-between">
          {" "}
          <MyImg coverId={coverId ? coverId : null} mangaId={data.data.id} />
          {/* go to read title//// */}
          <button className=" border-gray-400 px-5 py-3 rounded-3xl border-2 cursor-pointer">
            <Link
              className="border-2 h-full flex items-center "
              to={`/mangaread/${data.data.id}`}
            >
              перейти к чтению
            </Link>
          </button>
        </div>
      </div>
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
