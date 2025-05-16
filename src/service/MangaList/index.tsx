import axios from "axios";
import { IResponceManga } from "./TypeMangaResponce";
import { ICoverResponce } from "./TypeCoverResponce";

//начальные данные
const mode: "dev" | "prod" = "prod";
const BASEURL =
  mode === "dev"
    ? "http://localhost:3000"
    : "https://proxyserver2-rho.vercel.app";

//получаем главный каталог
const fetchManga = async (): Promise<IResponceManga> => {
  const res = await axios
    .get<IResponceManga>(`${BASEURL}/manga`, {
      params: {
        offset: 20,
        limit: 20,
      },
    })
    .then((res) => {
      return res.data;
    });
  return res;
};

const fetchCoverManga = async (id: string): Promise<ICoverResponce> => {
  const res = await axios
    .get<ICoverResponce>(BASEURL + "/cover", {
      params: {
        id,
      },
    })
    .then((res) => res.data);
  return res;
};

const testCover = async (query: string) => {
  const res = await axios.get(BASEURL + "/test", {
    params: { query },
    responseType: "blob",
  });
  return res;
};

export { fetchManga, fetchCoverManga, testCover };
