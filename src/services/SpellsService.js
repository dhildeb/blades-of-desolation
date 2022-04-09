import { battleService } from "./BattleService"
import $store from "@/store/index"
import { Spell } from "@/models/Spell"
import Notify from "@/utils/Notify"

class SpellsService{
  castSpell(spell, target){
    if(spell.areaEffect){
      if(target == 'enemies'){
        $store.state.combatMonsters.forEach(m => {
          spell['areaEffect'] = false
          this.castSpell(spell, m)
        })
      }else{
        $store.state.player.characters.forEach(c => {
          spell['areaEffect'] = false
          this.castSpell(spell, c)
        })
      }
      return
    }
    if(spell.strength){
      spell['actions'] = 1
      spell['hp'] = 1
      spell['lifeSteal'] = 0
      spell['luck'] = 0
      battleService.handleAttack(spell, target)
    }
    if(spell.effect){
      if(Array.isArray(target[spell.effect])){
        target[spell.effect].push(spell.value)
      }else{
        target[spell.effect] -= spell.value
      }
    }
  }
  learnSpell(spellName, character){
    if(character.spells.find(s => s.name == spellName)){
      this.levelUpSpell(spellName, character)
      return
    }
    let spellData = $store.state.spells.find(s => s.name == spellName)
    character.spells.push(new Spell(spellData))
  }
  levelUpSpell(spellName, character){
    let spell = character.spells.find(s => s.name == spellName)
    if(spell.level < character.level){
      spell.level++
    }else{
      Notify.toast('can\'t improve that spell at this time', 'warning')
    }
  }
}

export const spellsService = new SpellsService()