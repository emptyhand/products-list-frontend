import { Product } from "./product";

export class List {
  constructor(
    public id: number,
    public name: string,
    public products: Product[] = [],
    public completed: boolean = false,
    public count: number = 0
  ) {}
}
