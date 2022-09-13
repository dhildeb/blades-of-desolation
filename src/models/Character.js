import { generateId } from "@/utils/generateId"
import $store from '@/store/index'
export class Character{
  constructor(data){
    this.id = generateId()
    this.name = data.name == '' ? 'unknown' : data.name
    this.classType = data.classType ?? 'unknown'
    this.race = data.race ?? 'unknown'
    this.img = data.img
    if(!this.img){
      this.randomCharacterImg()
    }
    this.spells = data.spells ?? []
    this.equipment = data.equipment ?? []
    this.mainHand = data.mainHand ?? null
    this.offHand = data.offHand ?? null
    this.armor = data.armor ?? null
    this.cloak = data.cloak ?? null
    this.accessory = data.accessory ?? null
    this.sets = data.sets ?? []
    this.dmgType = data.dmgType ?? 'melee' 
    this.hp = data.hp ?? 5
    this.magic = data.magic ?? 0
    this.luck = data.luck ?? 0
    this.strength = data.strength ?? 1
    this.dodge = data.dodge ?? 0
    this.thorns = data.thorns ?? 0
    this.actions = data.actions ?? 6
    this.physicalResistance = data.physicalResistance ?? 0
    this.magicResistance = data.magicResistance ?? 0
    this.immunities = data.immunities ?? []
    this.vulnerabilities = data.vulnerabilities ?? []
    this.resistances = data.resistances ?? []
    this.statusEffects = data.statusEffects ?? []
    this.lifeSteal = data.lifeSteal ?? 0
    this.regen = data.regen ?? 0
    this.magicRegen = data.magicRegen ?? 0
    this.absorb = data.absorb ?? ''
    this.level = data.level ?? 0
    this.statBonus = data.statBonus ?? 0
    this.exp = data.exp ?? 0
    this.inBattle = data.inBattle ?? true
    this.baseHp = data.baseHp ?? this.hp
    this.baseActions = data.baseActions ?? this.actions
    this.baseMagic = data.baseMagic ?? this.magic
    this.baseStrength = data.baseStrength ?? this.strength
    this.buffs = []
    this.debuffs = []
    this.abilities = []
  }
  randomCharacterImg(){
    let img = ''
    let random = Math.floor(Math.random()*$store.state.characterImgList.length)
    img = $store.state.characterImgList[random]
    this.img = img
  }
}