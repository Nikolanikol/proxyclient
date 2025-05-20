import { useQuery } from "@tanstack/react-query";

import { Link, useParams } from "react-router-dom";
import { fetchMangaById } from "../service/MangaList";
import { ILangValue } from "../service/MangaList/TypeMangaResponce";
import MyImg from "../UI/MyImg";
import { Button } from "@/UI/Shadcn/ShadcnButton";
import TagRow from "@/Components/TagRow";

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
  let flag = false;

  return (
    <div>
      <div className=" rounded-2xl border-b-2 text-2xl font-semibold">
        {data.data.attributes.altTitles.map((item) => {
          if (item.en && !flag) {
            flag = true;
            return <h2>{item.en} </h2>;
          }
        })}
      </div>
      <div className="flex gap-5 justify-between pt-5">
        {" "}
        <MyImg coverId={coverId ? coverId : null} mangaId={data.data.id} />
        {/* go to read title//// */}
        <div className="flex flex-col justify-between items-center">
          <TagRow data={data.data} mode="full" />
          <Button className=" border-gray-400 px-2 py-2  rounded-xl border-2 cursor-pointer">
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
