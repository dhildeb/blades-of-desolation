import $store from '@/store/index.js'
import Notify from "@/utils/Notify"
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

  }
  addCharacter(character){
    $store.state.player.characters.push(character)
  }
  resetActions(){
    $store.state.player.characters.forEach(c => {
      c.actions = c.baseActions
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
      if(c.actions){
        $store.state.selected = c
        return
      }
    })
  }
}
export const characterService = new CharacterService()