import { generateId } from "@/utils/generateId";

export class Item{
  constructor(itemData){
    this.id = generateId()
    this.name = itemData.name
    this.requirements = itemData.requirements
    this.effect = itemData.effect
    this.value = itemData.value
    this.type = itemData.type
  }
}
