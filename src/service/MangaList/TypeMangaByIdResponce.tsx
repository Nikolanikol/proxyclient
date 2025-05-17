// Интерфейс для API-ответа
export interface MangaByIdResponse {
  result: string;
  response: string;
  data: IData;
}
// Интерфейс для манги (вся структура данных)
interface IData {
  id: string;
  type: string;
  attributes: IAttributes;
  relationships: Relationship[];
}

// Интерфейс для основных атрибутов манги
interface IAttributes {
  title: { [lang: string]: string };

  altTitles: any[];
  description: { [lang: string]: string };
  isLocked: boolean;
  links: { [lang: string]: string };
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string | null;
  status: string;
  year: number;
  contentRating: string;

  tags: ITag[];

  state: string;
  chapterNumbersResetOnNewVolume: boolean;
  createdAt: string;
  updatedAt: string;
  version: number;
  availableTranslatedLanguages: string[];
  latestUploadedChapter: string;
  relationships: { id: string; type: string }[];
}

// Интерфейс для тегов (жанры, темы и т. д.)
interface ITagAttributes {
  name: { [lang: string]: string };
  description: any;
  group: string;
  version: number;
}

interface ITag {
  id: string;
  type: string;
  attributes: ITagAttributes;
  relationships: any[];
}

// Интерфейс для связей (автор, художник, обложка и т. д.)
interface Relationship {
  id: string;
  type: "author" | "artist" | "cover_art" | "creator";
}
