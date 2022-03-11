import $store from '@/store/index.js'
import { useToast } from "vue-toastification"
import { characterService } from "./CharacterService"
class MonstersService{
  takeTurn(){
    this.prepPhase()
    this.attackPhase()
    this.endPhase()
  }
  prepPhase(){
    this.resetActions()
  }
  attackPhase(){
    let numTargets = $store.state.player.characters.length
    $store.state.combatMonsters.forEach(m => {
      console.log(m)
      if(m.actions && m.hp > 0){
        for(m.actions; m.actions > 0; m.actions--){
        let target = $store.state.player.characters[Math.floor(Math.random()*numTargets)]
        target.hp -= m.strength
        _toast.warning(target.name+' was attacked by '+m.name+' for '+m.strength+'DMG', {timeout: 5000})
        }
      }
    })
  }
  endPhase(){
    characterService.resetActions()
  }
  resetActions(){
    $store.state.monsters[1].forEach(m => {
      if(m.hp > 0){
        m.actions = m.baseActions
      }
    })
  }
}
const _toast = useToast()
export const monstersService = new MonstersService()