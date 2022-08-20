import { generateId } from "@/utils/generateId"
export class Ability{
  constructor(data){
    this.id = generateId()
    this.name = data.name
    this.level = data.level ?? 1
    this.dmgType = data.dmgType
    this.strength = data.strength
    this.areaEffect = data.areaEffect ?? false
    this.effect = data.effect
    this.value = data.value
    // this.numEffect = data.numEffect //{hp: 5}
    // this.stringEffect = data.stringEffect // {dmgType: necrotic}
    // this.arrayEffect = data.arrayEffect // {resistence: cold}
    this.buff = data.buff ?? false
    this.debuff = data.debuff ?? false
    this.title = data.title ?? null
    this.classType = data.classType ?? 'any'
    this.uses = data.uses ?? 1
    this.baseUses = data.baseUses ?? 1
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