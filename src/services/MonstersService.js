import $store from '@/store/index.js'
import { useToast } from "vue-toastification"
import { characterService } from "./CharacterService"
class MonstersService{
  getRandomMonsters(num){
    let monsters = []
    for(let i=0; i<num; i++){
      let index = Math.floor(Math.random()*_monsters.length)
      monsters.push(_monsters[index])
    }
    this.$store.commit('getMonsters', monsters)
  }
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
    $store.state.monsters[1].forEach(m => {
      if(m.actions){
        for(m.actions; m.actions > 0; m.actions--){
        let target = $store.state.player.characters[Math.floor(Math.random()*numTargets)]
        target.hp -= m.strength
        _toast.warning(target.name+' was attacked by '+m.name+' for '+m.strength+'DMG', {timeout: 5000})
        }
      }
    })
  }
  endPhase(){
    characterService.newTurn()
  }
  resetActions(){
    $store.state.monsters[1].forEach(m => {
      if(m.hp > 0){
        m.actions = m.baseActions
      }
    })
  }
}
const _monsters = [{name: 'Goblin', id: 1}, {name: 'Dragon', id: 100}]
const _toast = useToast()
export const monstersService = new MonstersService()