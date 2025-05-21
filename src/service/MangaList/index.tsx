import axios from "axios";
import { IResponceManga } from "./TypeMangaResponce";
import { ICoverResponce } from "./TypeCoverResponce";
import { MangaByIdResponse } from "./TypeMangaByIdResponce";
import { DEV_URL, PROD_URL } from "../../Variables/Variables";
import { IChapterItem } from "./TypeChapterResponce";
import getChaptersForMangaPage from "../../Utils/getChaptersForMangaPage";
import { TypeChapterSlidesResponce } from "./TypeChapterSlidesResponce";
import { TypeTagsResponce } from "./TypeTagsResponce";

//начальные данные
const mode: "dev" | "prod" = "prod";
const BASEURL = mode === "dev" ? DEV_URL : PROD_URL;

//получаем главный каталог
const fetchManga = async (
  limit: number = 10,
  offset: number = 0,
  includedTag: string | null,
  createdAtSince: string | null,
  contentRating: string | null
): Promise<IResponceManga> => {
  const res = await axios
    .get<IResponceManga>(`${BASEURL}/manga/catalog`, {
      params: {
        offset,
        limit,
        includedTags: includedTag,
        createdAtSince,
        contentRating,
      },
    })
    .then((res) => {
      return res.data;
    });
  return res;
};
//поиск через название
const fetchMangaByTitle = async (title: string) => {
  //   console.log("title");
  //   console.log("asdad", title);
  const res = await axios.get(BASEURL + "/manga/search", {
    params: {
      title,
    },
  });
  console.log(res.data);
  return res.data;
};

const fetchMangaAll = async (
  limit: number = 10,
  offset: number = 0,
  includedTag: string | null,
  createdAtSince: string | null,
  contentRating: string | null,
  title: string | null,
  mode: "search" | "noSearch"
): Promise<IResponceManga> => {
  if (mode === "search") {
    if (title) return fetchMangaByTitle(title);
  }
  return fetchManga(limit, offset, includedTag, createdAtSince, contentRating);
};

/////модуль для получения изображение через зеркало
const fetchCoverFileName = async (id: string): Promise<ICoverResponce> => {
  const res = await axios
    .get<ICoverResponce>(BASEURL + "/cover", {
      params: {
        id,
      },
    })
    .then((res) => res.data);
  return res;
};

const fetchImgMirror = async (query: string) => {
  const res = await axios.get(BASEURL + "/cover/img", {
    params: { query },
    responseType: "blob",
  });
  return res;
};

///получаем данные для личной страницы манги
const fetchMangaById = async (id: string): Promise<MangaByIdResponse> => {
  const res = await axios.get<MangaByIdResponse>(BASEURL + "/manga" + "/" + id);
  return res.data;
};

/////получаем список доступных глав
// не типизирован ответ т.к. ответы не стандартизированы будем обратывать в компонете MangaReadPage
const fetchChapterList = async (id: string) => {
  const res = await axios.get(BASEURL + "/manga" + "/" + id + "/chapters");
  let data: IChapterItem[] = getChaptersForMangaPage(res.data);
  console.log("fetchChapterList", data);
  return data;
};

////получаем слайды к chapters
const fetchChapterSlides = async (
  id: string
): Promise<TypeChapterSlidesResponce> => {
  const res = await axios.get<TypeChapterSlidesResponce>(
    BASEURL + "/manga/chapter" + "/" + id
  );
  console.log("getslides", res);
  return res.data;
};

///получаем теги
const fetchTags = async (): Promise<TypeTagsResponce[]> => {
  const res = await axios.get(BASEURL + "/tags");
  return res.data;
};
export {
  fetchManga,
  fetchMangaByTitle,
  fetchCoverFileName,
  fetchImgMirror,
  fetchMangaById,
  fetchChapterList,
  fetchChapterSlides,

  ////////
  fetchTags,
  ////
  fetchMangaAll,
};
