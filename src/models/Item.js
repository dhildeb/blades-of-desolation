import { generateId } from "@/utils/generateId";

export class Item{
  constructor(itemData){
    this.id = generateId()
    this.name = itemData.name
    this.required = itemData.required
    this.effect = itemData.effect
    this.value = itemData.value
  }
}
