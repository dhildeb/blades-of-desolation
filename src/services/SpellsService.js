import { battleService } from "./BattleService"
import $store from "@/store/index"
import { Spell } from "@/models/Spell"
import Notify from "@/utils/Notify"
import { characterService } from "./CharacterService"

class SpellsService{
  castSpell(castSpell, target){
    let spell = Object.assign({}, castSpell)
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
    if(spell.strength && (!spell.buff || !spell.debuff)){
      spell['actions'] = 1
      spell['hp'] = 1
      spell['lifeSteal'] = 0
      spell['luck'] = 0
      battleService.handleAttack(spell, target)
      characterService.autoSelect()
    }
    if(spell.effect){
      if(Array.isArray(target[spell.effect])){
        target[spell.effect].push(spell.value)
      }else if(typeof spell.value !== 'number'){
        target[spell.effect] = spell.value
      }else{
        if(spell.buff){
          target[spell.effect] += spell.value
        }else{
          target[spell.effect] -= spell.value
        }
      }
    }
    if(spell.temp){
      if(spell.debuff){
        target['debuffs'].push({effect: spell.effect, value: spell.value})
      }
      if(spell.buff){
        target['buffs'].push({effect: spell.effect, value: spell.value})
      }
    }
  }
  findRandomLearnableSpell(character){
    let spellLvl = Math.floor((Math.random()*(character.level ?? 0))/2)
    if(character.classType == 'wizard' || character.classType == 'unknown'){
      return $store.state.spells[spellLvl][Math.floor(Math.random()*$store.state.spells[spellLvl].length)].name
    }
    let spell = false
    do {
      let potientalSpell = $store.state.spells[spellLvl][Math.floor(Math.random()*$store.state.spells[spellLvl].length)]
      let canLearn = true
      if(potientalSpell.reqs){
        for(let req in potientalSpell.reqs){
          if(character[req] != potientalSpell.reqs[req]){
            canLearn = false
          }
        }
      }
      if(canLearn){
        spell = potientalSpell.name
      }
    } while (!spell);
    return spell
  }
  learnSpell(spellName, character){
    if(character.spells.find(s => s.name == spellName)){
      this.levelUpSpell(spellName, character)
      return
    }
    let spellData = $store.state.spells.find(spells => spells.find(s => s.name == spellName)).find(s => s.name == spellName)
    character.spells.push(new Spell(spellData))
  }
  levelUpSpell(spellName, character){
    let spell = character.spells.find(s => s.name == spellName)
    let originalSpell = $store.state.spells.find(spell => spell.find(s => s.name == spellName))
    originalSpell = originalSpell.find(s => s.name == spellName)

    if(spell.level < character.level){
      spell.level++
      if(spell.strength){
        spell.strength += originalSpell.strength
      }
      if(spell.value){
        spell.value += originalSpell.value
      }
    }else{
      Notify.toast('can\'t improve that spell at this time', 'warning')
    }
  }
}

export const spellsService = new SpellsService()