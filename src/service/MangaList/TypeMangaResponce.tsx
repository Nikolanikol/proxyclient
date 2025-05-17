export interface IResponceManga {
  data: IDataMangaItem[];
  total: number;
}
export interface IDataMangaItem {
  id: string;
  type: string;
  attributes: IAttributes;
  relationships: Relationship[];
}

// Определяем интерфейс для основных атрибутов манги
interface IAttributes {
  title: ILangValue; // Например, { en: "Haru no \bHikari ni Noma rete mo" }
  altTitles: ILangValue[]; // Альтернативные названия с ключами языков (например, { ja: "..." })
  description: ILangValue; // Описание, сейчас пустой объект, но может быть расширено
  isLocked: boolean;

  links: { [resourseName: string]: string }; // Ссылки на внешние ресурсы, здесь пустой объект
  originalLanguage: string;
  lastVolume: string;
  lastChapter: string;
  publicationDemographic: string;
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
}
export interface ILangValue {
  [lang: string]: string;
}
interface ITag {
  id: string;
  type: string;
  relationships: IRelationships[]; // Если в будущем появятся объекты-отношения, можно уточнить тип
  attributes: ITagAttributes;
}

interface IRelationships {
  id?: string;
  type?: string;
}

// Определяем интерфейс для тегов (tags)
interface ITagAttributes {
  name: { [lang: string]: string }; // Например, { en: "Girls' Love" }
  description: Record<string, any>; // Пустой объект, но может содержать данные
  group: string;
  version: number;
}

// Определяем интерфейс для отношений (relationships)
interface Relationship {
  id: string;
  type: string;
}

// Определяем интерфейс для всей сущности манги
//////////////////////////////////////////////////
