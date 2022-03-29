import { generateId } from "@/utils/generateId";

export class Item{
  constructor(itemData){
    this.id = generateId()
    this.name = itemData.name
    this.requirements = itemData.requirements
    this.effect = itemData.effect
    this.value = itemData.value == 'randomDmgType' ? this.getRandomDmgType() : itemData.value
    this.type = itemData.type
    this.price = itemData.price
    this.rarity = itemData.rarity
  }
  getRandomDmgType(){
    let dmgTypeList = ['lightning', 'melee', 'magic', 'acid', 'necrotic', 'poison', 'fire', 'radiant', 'psychic', 'force']
    let random = Math.floor(Math.random()*dmgTypeList.length)
    this.name += ' ('+dmgTypeList[random]+')'
    return dmgTypeList[random]
  }
}