import { makeAutoObservable } from "mobx";

export class FilterStore {
  tagFilter: string | null = null;
  yearFilter: string | null = null;
  searchQuery: string | null = null;
  fetchMode: "search" | "noSearch" = "noSearch";
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
    if (string) {
      this.yearFilter = string + "-00-00T00:00:00";
    } else {
      this.yearFilter = null;
    }
  }
  setSearchQuery(string: string) {
    this.searchQuery = string;
    console.log(string);
  }
  setFetchMode(string: "search" | "noSearch") {
    this.fetchMode = string;
    console.log(string);
  }
}

// Экспортируем инстанс стора для удобного использования в компонентах
