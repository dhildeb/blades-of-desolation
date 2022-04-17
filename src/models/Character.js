import { generateId } from "@/utils/generateId"
import $store from '@/store/index'
export class Character{
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
    this.mainHand = characterData.mainHand ?? null
    this.offHand = characterData.offHand ?? null
    this.armor = characterData.armor ?? null
    this.cloak = characterData.cloak ?? null
    this.accessory = characterData.accessory
    this.dmgType = characterData.dmgType ?? 'melee'
    this.hp = characterData.hp ?? 5
    this.magic = characterData.magic ?? 0
    this.luck = characterData.luck ?? 0
    this.strength = characterData.strength ?? 1
    this.dodge = characterData.dodge ?? 0
    this.thorns = characterData.thorns ?? 0
    this.actions = characterData.actions ?? 1
    this.physicalResistance = characterData.physicalResistance ?? 0
    this.magicResistance = characterData.magicResistance ?? 0
    this.immunities = characterData.immunities ?? []
    this.vulnerabilities = characterData.vulnerabilities ?? []
    this.resistances = characterData.resistances ?? []
    this.lifeSteal = characterData.lifeSteal ?? 0
    this.regen = characterData.regen ?? 0
    this.magicRegen = characterData.magicRegen ?? 0
    this.absorb = characterData.absorb ?? ''
    this.level = characterData.level ?? 0
    this.exp = characterData.exp ?? 0
    this.inBattle = characterData.inBattle ?? true
    this.baseHp = characterData.baseHp ?? this.hp
    this.baseActions = characterData.baseActions ?? this.actions
    this.baseMagic = characterData.baseMagic ?? this.magic
    this.buffs = []
    this.debuffs = []
  }
  randomCharacterImg(){
    let img = ''
    let random = Math.floor(Math.random()*$store.state.characterImgList.length)
    img = $store.state.characterImgList[random]
    this.img = img
  }
}