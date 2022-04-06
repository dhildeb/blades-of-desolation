import $store from '@/store/index.js'
import { animationsService } from "./AnimationsService"
import { battleService } from "./BattleService"
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
    let numTargets = $store.state.player.characters.filter(c => c.inBattle).length
    // let duration = 1000
    $store.state.combatMonsters.forEach(m => {
      if(m.actions && m.hp > 0){
        for(m.actions; m.actions > 0; m.actions--){
          // var date = Date.now();
          // var curDate = null;
            let target = $store.state.player.characters.filter(c => c.inBattle)[Math.floor(Math.random()*numTargets)]
            battleService.handleAttack(m, target)
            animationsService.shake('charImg'+target.id)
            // do {
                // curDate = Date.now();
            // } while (curDate-date < duration);
            // console.log('hit')
        }
      }
    })
  }
  endPhase(){
    this.regen()
    characterService.takeTurn()
  }
  regen(){
    $store.state.combatMonsters.forEach(m => {
      if(m.regen > 0){
        animationsService.fadeOutUp('hit'+m.id, m.regen, '+')
        m.hp += m.regen
      }
    })
  }
  resetActions(){
    $store.state.combatMonsters.forEach(m => {
      if(m.hp > 0){
        m.actions = m.baseActions
      }
    })
  }
  addItemStats(monster, itemName){
    $store.commit('addStatsToMonster', {monsterId: monster.id, item: itemName})
  }
}
export const monstersService = new MonstersService()