import { generateId } from "@/utils/generateId"

export class CharacterFactory{
  constructor(characterData){
    this.id = generateId()
    this.name = characterData.name ?? 'unknown'
    this.classType = characterData.classType ?? 'unknown'
    this.race = characterData.race ?? 'unknown'
    this.spells = characterData.spells ?? []
    this.equipment = characterData.equipment ?? []
    this.dmgType = characterData.dmgType ?? ''
    this.hp = characterData.hp ?? 5
    this.magic = characterData.magic ?? 0
    this.luck = characterData.luck ?? 0
    this.strength = characterData.strength ?? 1
    this.dodge = characterData.dodge ?? 0
    this.thorns = characterData.thorns ?? 0
    this.actions = characterData.actions ?? 1
    this.lifeDrain = characterData.lifeDrain ?? 0
    this.absorb = characterData.absorb ?? ''
    this.level = characterData.level ?? 1
    this.exp = characterData.exp ?? 0
    switch(this.classType){
      case 'rogue':
        this.actions += 1
        this.dodge += 1
        break
      case 'ranger':
        this.actions += 1
        this.hp += 1
        break
      case 'barbarian':
        this.strength += 2
        break
      case 'wizard':
        this.magic += 2
        break
      case 'cleric':
        this.magic += 1
        this.hp += 1
        break
      case 'fighter':
        this.strength += 1
        this.actions += 1
        break
      case 'monk':
        this.actions += 2
        break
      case 'paladin':
        this.strength += 1
        this.thorns += 1
        break
      case 'warlock':
        this.magic += 1
        this.lifeDrain += 1
        break
      default:
        this.classType = 'unknown'
        this[this.getRandomAbility()] += 1
        this[this.getRandomAbility()] += 1
        break
    }
    switch(this.race){
      case 'dragonborn':
        this.strength += 2
        break
      case 'human':
        this.strength += 1
        this.hp += 1
        break
      case 'elf':
        this.hp += 1
        this.actions += 1
        break
      case 'dwarf':
        this.hp += 2
        break
      case 'halfling':
        this.luck += 2
        break
      default:
        this.race = 'unknown'
        this[this.getRandomAbility()] += 1
        this[this.getRandomAbility()] += 1
        break
    }
    this.baseHp = this.hp
    this.baseStrength = this.strength
    this.baseDodge = this.dodge
    this.baseThorns = this.thorns
    this.baseActions = this.actions
    this.baseLifeDrain = this.lifeDrain
    this.baseLuck = this.luck
    this.baseMagic = this.magic
  }
  getRandomAbility(){
    let random = Math.floor(Math.random()*9)
    let stats = ['hp', 'strength', 'dodge', 'thorns', 'dodge', 'thorns', 'actions', 'lifeDrain', 'luck', 'magic']
    return stats[random]
  }
}