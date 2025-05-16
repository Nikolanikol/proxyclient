// Интерфейс для ответа от API
export interface ICoverResponce {
  result: string;
  response: string;
  data: IData;
}

// Интерфейс для данных обложки
interface IData {
  id: string;
  type: string;
  attributes: IAttributes;
  relationships: IRelationship[];
}

// Интерфейс для атрибутов обложки
interface IAttributes {
  description: string;
  volume: string | null;
  fileName: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}

// Интерфейс для связей (relationships)
interface IRelationship {
  id: string;
  type: "manga" | "user";
}
