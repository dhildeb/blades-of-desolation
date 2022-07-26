import $store from '@/store/index.js'
import { animationsService } from "./AnimationsService"
import { battleService } from "./BattleService"
import { characterService } from "./CharacterService"
import { sleep } from "../utils/sleep"
import $ from "jquery"
class MonstersService {
  takeTurn() {
    this.prepPhase()
    this.attackPhase()
    this.endPhase()
  }
  prepPhase() {
    this.resetActions()
  }
  attackPhase() {
    let numTargets = $store.state.player.characters.filter(c => c.inBattle).length
    let delay = 1000
    $('#app').css('pointer-events', 'none')
    $('*').css('cursor', 'progress')
    $store.state.combatMonsters.forEach(m => {
      if (m.actions && m.hp > 0) {
        for (m.actions; m.actions > 0; m.actions--) {
          sleep(delay).then(() => {
            animationsService.shake('monster' + m.id)
            let target = $store.state.player.characters.filter(c => c.inBattle)[Math.floor(Math.random() * numTargets)]
            battleService.handleAttack(m, target)
          })
        }
        delay += 1500
      }
    })
    setTimeout(()=>{
      $('#app').css('pointer-events', '')
      $('*').css('cursor', '')
    }, delay-1000)
  }
  endPhase() {
    this.regen()
    characterService.takeTurn()
  }
  regen() {
    $store.state.combatMonsters.forEach(m => {
      if (m.regen > 0) {
        animationsService.fadeOutUp('hit' + m.id, m.regen, '+')
        m.hp += m.regen
      }
    })
  }
  resetActions() {
    $store.state.combatMonsters.forEach(m => {
      if (m.hp > 0) {
        m.actions = m.baseActions
      }
    })
  }
  addItemStats(monster, itemName) {
    $store.commit('addStatsToMonster', { monsterId: monster.id, item: itemName })
  }
  getMonsterById(id) {
    return $store.state.combatMonsters.find(m => m.id == id)
  }
}
export const monstersService = new MonstersService()