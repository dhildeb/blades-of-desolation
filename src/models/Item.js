import { generateId } from "@/utils/generateId";

export class Item{
  constructor(data){
    this.id = generateId()
    this.name = data.name
    this.requirements = data.requirements ?? []
    this.statusEffects = data.statusEffects ?? []
    this.effect = data.effect ?? 'none'
    this.value = data.value == 'randomDmgType' ? this.getRandomDmgType() : data.value ?? 0
    this.type = data.type ?? 'none'
    this.price = data.price ?? 0
    this.rarity = data.rarity ?? 'none'
    this.speed = data.speed ?? 0
    this.scroll = data.scroll ?? false
  }
  getRandomDmgType(){
    let dmgTypeList = ['lightning', 'melee', 'magic', 'acid', 'necrotic', 'poison', 'fire', 'radiant', 'psychic']
    let random = Math.floor(Math.random()*dmgTypeList.length)
    this.name += ' ('+dmgTypeList[random]+')'
    return dmgTypeList[random]
  }
}