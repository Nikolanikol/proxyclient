import { makeAutoObservable } from "mobx";

export class FilterStore {
  tagFilter: string[] | null = [];
  contentRating: string[] = [];
  constructor() {
    // makeAutoObservable автоматически сделает все свойства наблюдаемыми,
    // а методы – экшенами.
    makeAutoObservable(this);
  }
  setContentRating(string: string) {
    this.contentRating = [string];
  }
  setTag(string: string) {
    console.log(string);
    this.tagFilter = [string];
  }
}

// Экспортируем инстанс стора для удобного использования в компонентах
