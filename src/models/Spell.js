import { generateId } from "@/utils/generateId"

export class Spell{
  constructor(spellData){
    this.id = generateId()
    this.name = spellData.name
    this.level = spellData.level ?? 1
    this.cost = spellData.cost ?? 1
    this.dmgType = spellData.dmgType ?? 'magic'
    this.strength = spellData.strength
    this.areaEffect = spellData.areaEffect ?? false
    this.effect = spellData.effect ?? []
    this.value = spellData.value ?? []
  }
}