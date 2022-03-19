import { generateId } from "@/utils/generateId";

export class Item{
constructor(itemData){
  this.id = generateId()
  this.name = itemData.name
  this[itemData.effect] = itemData.value
  this.equiped = itemData.equiped
}
}