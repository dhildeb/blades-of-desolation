import { generateId } from "@/utils/generateId"
import { getRandomAbility } from "@/utils/getRandomAbility"
import $store from '@/store/index'
export class CharacterFactory{
  constructor(characterData){
    this.id = generateId()
    this.name = characterData.name == '' ? 'unknown' : characterData.name
    this.classType = characterData.classType ?? 'unknown'
    this.race = characterData.race ?? 'unknown'
    this.img = characterData.img
    if(!this.img){
      this.randomCharacterImg()
    }
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
    this.physicalResistance = characterData.physicalResistance ?? 0
    this.magicResistance = characterData.magicResistance ?? 0
    this.lifeSteal = characterData.lifeSteal ?? 0
    this.absorb = characterData.absorb ?? ''
    this.level = characterData.level ?? 0
    this.exp = characterData.exp ?? 0
    switch(this.classType){
      case 'rogue':
        this.actions += 1
        this.dodge += 5
        break
      case 'ranger':
        this.actions += 1
        this.hp += 5
        break
      case 'bard':
        this.luck += 3
        this.dodge += 2
        break
      case 'barbarian':
        this.strength += 3
        break
      case 'wizard':
        this.magic += 3
        break
      case 'cleric':
        this.magic += 1
        this.hp += 5
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
        this.lifeSteal += 10
        break
      default:
        this.classType = 'unknown'
        this[getRandomAbility()] += 3
        this[getRandomAbility()] += 3
        break
    }
    switch(this.race){
      case 'dragonborn':
        this.strength += 3
        break
      case 'human':
        this.strength += 1
        this.hp += 5
        break
      case 'elf':
        this.hp += 5
        this.actions += 1
        break
      case 'dwarf':
        this.hp += 10
        break
      case 'halfling':
        this.luck += 3
        break
      default:
        this.race = 'unknown'
        this[getRandomAbility()] += 3
        this[getRandomAbility()] += 3
        break
    }
    this.baseHp = characterData.baseHp ?? this.hp
    this.baseStrength = characterData.baseStrength ?? this.strength
    this.baseDodge = characterData.baseDodge ?? this.dodge
    this.baseThorns = characterData.baseThorns ?? this.thorns
    this.baseActions = characterData.baseActions ?? this.actions
    this.baseLifeSteal = characterData.baseLifeSteal ?? this.lifeSteal
    this.baseLuck = characterData.baseLuck ?? this.luck
    this.baseMagic = characterData.baseMagic ?? this.magic
    this.basePhysicalResistance = characterData.basePhysicalResistance ?? this.physicalResistance
    this.baseMagicResistance = characterData.baseMagicResistance ?? this.magicResistance
  }
  randomCharacterImg(){
    let img = ''
    let random = Math.floor(Math.random()*$store.state.characterImgList.length)
    img = $store.state.characterImgList[random]
    this.img = img
  }
}