import { generateId } from "@/utils/generateId"
import { getRandomAbility } from "@/utils/getRandomAbility"
import $ from 'jquery'
export class CharacterFactory{
  constructor(characterData){
    this.id = generateId()
    this.name = characterData.name ?? 'unknown'
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
        this.lifeSteal += 1
        break
      default:
        this.classType = 'unknown'
        this[getRandomAbility()] += 1
        this[getRandomAbility()] += 1
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
        this[getRandomAbility()] += 1
        this[getRandomAbility()] += 1
        break
    }
    this.baseHp = this.hp
    this.baseStrength = this.strength
    this.baseDodge = this.dodge
    this.baseThorns = this.thorns
    this.baseActions = this.actions
    this.baseLifeSteal = this.lifeSteal
    this.baseLuck = this.luck
    this.baseMagic = this.magic
    this.basePhysicalResistance = this.physicalResistance
    this.baseMagicResistance = this.magicResistance
  }
  randomCharacterImg(){
    // FIXME deperecated
    let folder = "assets/characters/"
    let characterImgList = []
    let img = ''
    $.ajax({
      url: folder,
      async: false,
      success: function(data){
        $(data).find("a").attr("href", function (i, val) {
          if( val.match(/\.(jpe?g|png|gif)$/) ) { 
              characterImgList.push(val)
          } 
      })
      let random = Math.floor(Math.random()*characterImgList.length)
      img = characterImgList[random]
    }
  })
  this.img = img
  }
}