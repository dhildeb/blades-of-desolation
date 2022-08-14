import { generateId } from "@/utils/generateId";

export class Item{
  constructor(data){
    this.id = generateId()
    this.name = data.name
    this.requirements = data.requirements
    this.effect = data.effect
    this.value = data.value == 'randomDmgType' ? this.getRandomDmgType() : data.value
    this.type = data.type
    this.price = data.price
    this.rarity = data.rarity
    this.speed = data.speed ?? 0
  }
  getRandomDmgType(){
    let dmgTypeList = ['lightning', 'melee', 'magic', 'acid', 'necrotic', 'poison', 'fire', 'radiant', 'psychic']
    let random = Math.floor(Math.random()*dmgTypeList.length)
    this.name += ' ('+dmgTypeList[random]+')'
    return dmgTypeList[random]
  }
}