import { IChapterItem } from "../service/MangaList/TypeChapterResponce";

interface IObj {
  result: string;
  volumes: INone | IVolumes;
}
interface IVolumes {
  [key: string]: {
    count: number;
    volume: string;
    chapters: {
      [key: string]: IChapterItem;
    };
  };
}
interface INone {
  none: {
    count: number;

    chapters: {
      [number: string]: IChapterItem;
    };
  };
}
const getChaptersForMangaPage = (res: IObj): IChapterItem[] => {
  let data: IChapterItem[] = [];

  if (res.volumes.none) {
    data = Object.values(res.volumes.none.chapters);
  } else {
    Object.entries(res.volumes).forEach(([volumeKey, volumeData]) => {
      Object.entries(volumeData.chapters).forEach(
        ([chapterKey, chapterData]) => {
          data.push(chapterData as IChapterItem);
        }
      );
    });
  }

  return data;
};

export default getChaptersForMangaPage;
