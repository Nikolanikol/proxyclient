import { makeAutoObservable } from "mobx";

export class FilterStore {
  tagFilter: string | null = null;
  yearFilter: string | null = null;
  contentRating: string[] = [];
  constructor() {
    // makeAutoObservable автоматически сделает все свойства наблюдаемыми,
    // а методы – экшенами.
    makeAutoObservable(this);
  }
  setContentRating(string: string) {
    this.contentRating = [string];
  }
  setTagFilter(string: string) {
    if (string != "Все") {
      this.tagFilter = string;
    } else {
      this.tagFilter = null;
    }
  }
  setYearFilter(string: string) {
    if (string != "Все") {
      this.yearFilter = string + "-00-00T00:00:00";
    } else {
      this.yearFilter = null;
    }
  }
}

// Экспортируем инстанс стора для удобного использования в компонентах
