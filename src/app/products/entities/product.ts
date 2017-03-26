import { List } from "./list";

export class Product {
  constructor(
    public id: number,
    public list: List,
    public name: string,
    public quantity: number,
    public added: boolean
  ) {}
}
