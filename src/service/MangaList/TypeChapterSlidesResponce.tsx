export interface TypeChapterSlidesResponce {
  baseUrl: string;
  result: string;
  chapter: {
    hash: string;
    data: string[];
    dataSaver: string[];
  };
}
