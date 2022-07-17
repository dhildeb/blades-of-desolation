import { generateId } from "@/utils/generateId"

export class Ability{
  constructor(abilityData){
    this.id = generateId()
    this.name = abilityData.name
    this.level = abilityData.level ?? 1
    this.dmgType = abilityData.dmgType
    this.strength = abilityData.strength
    this.areaEffect = abilityData.areaEffect ?? false
    this.effect = abilityData.effect ?? []
    this.value = abilityData.value ?? []
    this.buff = abilityData.buff ?? false
    this.title = abilityData.title ?? null
    this.classType = abilityData.classType ?? 'any'
    this.uses = abilityData.uses ?? 1
    this.baseUses = abilityData.baseUses ?? 1
  }
  getTitle(){
    let title = ''
    if(this.strength){
      title = this.strength+' '+this.dmgType+' dmg'
    }else{
      title = this.buff ? '+' : '-'
      title += this.value+' '+this.effect
    }
    title += this.areaEffect ? ' (Mass effect)' :  ''
    return title
  }
}