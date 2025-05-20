import { FilterStore } from "./FilterStore";
import { MangaStore } from "./MangaStore";

export class RootStore {
  filterStore: FilterStore;
  mangaStore: MangaStore;

  constructor() {
    this.filterStore = new FilterStore();
    this.mangaStore = new MangaStore();
    // Если у вас есть дополнительные сторы – создавайте их здесь.
  }
}
