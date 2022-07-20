import { Character } from "@/models/Character"
import $store from '@/store/index.js'
import { getRandomAbility } from "@/utils/getRandomAbility"
import Notify from "@/utils/Notify"
import { animationsService } from "./AnimationsService"
import { spellsService } from "./SpellsService"
class CharacterService{
  getCharacterById(id){
    return $store.state.player.characters.find(c => c.id == id)
  }
  takeTurn(){
    this.prepPhase()
    this.attackPhase()
    this.endPhase()
  }
  prepPhase(){
    this.removeDestroyedCharacters()
    this.resetActions()
    this.autoSelect()
  }
  attackPhase(){

  }
  endPhase(){
    this.regen()
    this.magicRegen()
  }
  resetActions(){
    $store.state.player.characters.forEach(c => {
      c.actions = c.baseActions
    })
  }
  resetExtraHp(){
    $store.state.player.characters.forEach(c => {
      if(c.hp > c.baseHp){
        c.hp = c.baseHp
      }
    })
  }
  getAverageCharacterLvl(){
    let totalLvl = 0
    $store.state.player.characters.forEach(c => totalLvl += c.level)
    if(totalLvl){
      return Math.floor(totalLvl/$store.state.player.characters.length)
    }
    return totalLvl
  }
  getPartyLuck(){
    let luck = 0
    $store.state.player.characters.forEach(c => luck += c.luck)
    return luck
  }
  removeDestroyedCharacters(){
    $store.state.player.characters.forEach(c => {
      if(c.hp < c.baseHp*-2){
        $store.commit('destroyCharacter', c.id)
        Notify.toast(c.name+' was destroyed', 'error')
      }
    })
  }
  autoSelect(){
    if($store.state.selected?.actions > 0){
      return
    }
    $store.state.player.characters.forEach(c => {
      if(c.actions > 0 && c.hp > 0 && c.inBattle){
        $store.state.selected = c
        return
      }
    })
  }
  regen(){
    $store.state.player.characters.forEach(c => {
      if(c.regen > 0 ?? c.inBattle){
        animationsService.fadeOutUp('hit'+c.id, c.regen, '+')
        c.hp += c.regen
      }
    })
  }
  magicRegen(){
    $store.state.player.characters.forEach(c => {
      if(c.magicRegen > 0 ?? c.inBattle){
        c.magic += c.magicRegen
        c.magic = c.magic > c.baseMagic ? c.baseMagic : c.magic
      }
    })
  }
  attemptToFlee(character){
    let enemies = $store.state.combatMonsters.filter(m => m.hp > 0).length
    let party = $store.state.player.characters.filter(c => c.inBattle).length
    let chance = party == enemies ? .5 : party/enemies
    chance += character.luck/100
    let fail = Math.random()
    if(chance > fail){
      character.inBattle = false
      Notify.toast(character.name+' got away', 'success')
    }else{
      Notify.toast('Failed to escape')
    }
  }
  enterBattle(){
    $store.state.player.characters.forEach(c => c.inBattle = true)
  }
  addItemStats(character, item){
    $store.commit('equipItem', {characterId: character.id, item: item})
  }
  removeItemStats(character, item){
    $store.commit('unequipItem', {characterId: character.id, item: item})
  }
  loadCharacter(index, char){
    $store.state.player.characters[index] = new Character(char)
  }
  createCharacter(char){
    let spell = false
    switch(char.classType){
      case 'rogue':
        char["actions"] += 1
        char["dodge"] += 5
        break
      case 'ranger':
        char["actions"] += 1
        char["hp"] += 5
        break
      case 'bard':
        char["luck"] += 3
        char["dodge"] += 2
        char["magicRegen"] = 1
        spell = 'vicious mockery'
        break
      case 'barbarian':
        char["strength"] += 3
        break
      case 'wizard':
        char["magic"] += 3
        char["dmgType"] = 'magic'
        char["magicRegen"] = 1
        spell = spellsService.findRandomLearnableSpell(char)
        break
      case 'cleric':
        char["magic"] += 1
        char["hp"] += 5
        char["dmgType"] = 'magic'
        char["magicRegen"] = 1
        spell = 'light heal'
        break
      case 'fighter':
        char["strength"] += 1
        char["actions"] += 1
        break
      case 'monk':
        char["actions"] += 2
        break
      case 'paladin':
        char["strength"] += 1
        char["thorns"] += 1
        char["magicRegen"] = 1
        spell = 'sacred flame'
        break
      case 'warlock':
        char["magic"] += 1
        char["lifeSteal"] += 10
        char["dmgType"] = 'magic'
        char["magicRegen"] = 1
        spell = 'chill touch'
        break
      default:
        char["classType"] = 'unknown'
        char[getRandomAbility()] += 3
        char[getRandomAbility()] += 3
        char["magicRegen"] = char.magic > 0 ? 1 : 0
        spell = char.magic > 0 ? spellsService.findRandomLearnableSpell(char) : false
        break
    }
    switch(char.race){
      case 'dragonborn':
        char["strength"] += 3
        break
      case 'human':
        char["strength"] += 1
        char["hp"] += 5
        break
      case 'elf':
        char["magic"] += 1
        char["actions"] += 1
        break
      case 'dwarf':
        char["hp"] += 10
        break
      case 'halfling':
        char["luck"] += 3
        break
      default:
        char["race"] = 'unknown'
        char[getRandomAbility()] += 3
        char[getRandomAbility()] += 3
        spell = char.magic > 0 ? spellsService.findRandomLearnableSpell(char) : false
        break
    }
    let newChar = new Character(char)
    if(spell){
      spellsService.learnSpell(spell, newChar)
    }
    $store.state.player.characters.push(newChar)
  }
  deleteCharacter(characterId){
    $store.state.player.characters = $store.state.player.characters.filter(c => c.id !== characterId)
  }
}
export const characterService = new CharacterService()