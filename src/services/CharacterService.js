import $store from '@/store/index.js'
import Notify from "@/utils/Notify"
import { animationsService } from "./AnimationsService"
class CharacterService{
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
  }
  addCharacter(character){
    $store.state.player.characters.push(character)
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
}
export const characterService = new CharacterService()