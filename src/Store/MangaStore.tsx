import { makeAutoObservable } from "mobx";

export class MangaStore {
  mangaName: string | null = null;

  constructor() {
    // makeAutoObservable автоматически сделает все свойства наблюдаемыми,
    // а методы – экшенами.
    makeAutoObservable(this);
  }
  setMangaName(string: string) {
    this.mangaName = string;
  }
}
