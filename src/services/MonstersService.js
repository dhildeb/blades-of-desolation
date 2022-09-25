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
  }
  prepPhase() {
    this.resetActions()
    this.triggerStatusEffects()
  }
  attackPhase() {
    let numTargets = $store.state.player.characters.filter(c => c.inBattle).length
    let delay = 1000
    $('#app').css('pointer-events', 'none')
    $('*').css('cursor', 'progress')
    $store.state.combatMonsters.forEach(m => {
      if (m.actions <= 0 || m.hp <= 0) {
        return
      }
      for (m.actions; m.actions > 0; m.actions--) {
        sleep(delay).then(() => {
          if(m.hp > 0){
            animationsService.pounce('monster' + m.id)
            let target = $store.state.player.characters.filter(c => c.inBattle)[Math.floor(Math.random() * numTargets)]
            battleService.handleAttack(m, target)
          }
        })
        delay += 1000
      }
    })
    setTimeout(()=>{
      $('#app').css('pointer-events', '')
      $('*').css('cursor', '')
      this.endPhase()
    }, delay)
  }
  endPhase() {
    clearInterval($store.state.timerInterval)
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
  triggerStatusEffects(){
    $store.state.combatMonsters.forEach(cm => {
      cm.statusEffects.forEach(se => {
        if(!se.negative || typeof se.value !== 'number'){return}
        cm[se.effect] = se.value > 0 ? cm[se.effect] - se.value : se.value
        if(se.effect == 'hp'){
          animationsService.fadeOutUp('hit'+cm.id, se.value, '-')
        }
      })
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

  triggerAbilities(monster, target){
    monster.abilities.forEach(ability => {
      let random = Math.ceil(Math.random()*100)
      if(random > ability.chance){return}
      ability.effect.forEach(function(e, i){
        if(Array.isArray(target[e])){
          target[e].push(ability.value[i])
        }else if(typeof ability.value[i] !== 'number'){
          target[e] = ability.value[i]
        }else{
          if(ability.buff){
            monster[e] += ability.value[i]
          }else{
            target[e] -= ability.value[i]
          }
        }
      })
      if(ability.buff){
        ability.effect.forEach(function(e, i){
          monster['buffs'].push({effect: e, value: ability.value[i]})
        })
        animationsService.fadeOutUp('hit'+monster.id, ability.name, '+')
      }else{
        ability.effect.forEach(function(e, i){
          target['debuffs'].push({effect: e, value: ability.value[i]})
        })
        animationsService.fadeOutUp('hit'+target.id, ability.name, '-')
      }
    })
  }
}
export const monstersService = new MonstersService()