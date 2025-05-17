import axios from "axios";
import { IResponceManga } from "./TypeMangaResponce";
import { ICoverResponce } from "./TypeCoverResponce";
import { MangaByIdResponse } from "./TypeMangaByIdResponce";
import { DEV_URL, PROD_URL } from "../../Variables/Variables";
import { IChapterItem } from "./TypeChapterResponce";
import getChaptersForMangaPage from "../../Utils/getChaptersForMangaPage";
import { TypeChapterSlidesResponce } from "./TypeChapterSlidesResponce";

//начальные данные
const mode: "dev" | "prod" = "dev";
const BASEURL = mode === "dev" ? DEV_URL : PROD_URL;

//получаем главный каталог
const fetchManga = async (
  limit: number = 10,
  offset: number = 0
): Promise<IResponceManga> => {
  const res = await axios
    .get<IResponceManga>(`${BASEURL}/manga/catalog`, {
      params: {
        offset,
        limit,
      },
    })
    .then((res) => {
      return res.data;
    });
  return res;
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

  return data;
};

////получаем слайды к chapters
const fetchChapterSlides = async (
  id: string
): Promise<TypeChapterSlidesResponce> => {
  const res = await axios.get<TypeChapterSlidesResponce>(
    BASEURL + "/manga/chapter" + "/" + id
  );

  return res.data;
};

export {
  fetchManga,
  fetchCoverFileName,
  fetchImgMirror,
  fetchMangaById,
  fetchChapterList,
  fetchChapterSlides,
};
