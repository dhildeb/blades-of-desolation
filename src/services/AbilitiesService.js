import $store from "@/store/index"
import { Ability } from "@/models/Ability"
import { battleService } from "./BattleService"
import { useToast } from "vue-toastification"

class AbilitiesService{
  toast = useToast()

  learnAbility(abilityName, character){
    if(!this.canLearnAbility(abilityName, character)){
      return false
    }
    if(character.abilities.find(a => a.name == abilityName)){
      this.levelUpAbility(abilityName, character)
      return
    }
    let abilityData = $store.state.abilities.find(a => a.name == abilityName)
    character.abilities.push(new Ability(abilityData))
    this.toast.success(character.name+' Learned '+abilityName, {timeout: 10000})
  }
  canLearnAbility(abilityName, character){
    let ability = character.abilities.find(a => a.name == abilityName)
    if(!ability){
      ability = $store.state.abilities.find(a => a.name == abilityName)
    }else{
      return ability.level < character.level
    }
    if(character.classType != ability.classType){
      return false
    }
    return ability.level <= character.level
  }
  levelUpAbility(abilityName, character){
    let ability = character.abilities.find(a => a.name == abilityName)
    let originalAbility = $store.state.abilities.find(a => a.name == abilityName)
    ability.level++
    if(ability.level % 2 == 0){
      ability.value.forEach((v, i)=> ability.value[i] += Math.round(originalAbility.value[i]/2))
    }else{
      ability.baseUses++
      ability.uses++
    }
    this.toast.success(character.name+' Level up '+abilityName, {timeout: 10000})
  }
  useAbility(Ability, target){
    let ability = {...Ability}
    if(ability.uses <= 0){
      return
    }
    if(ability.areaEffect){
      if(target == 'enemies' || ability?.targetsEnemy){
        $store.state.combatMonsters.forEach(m => {
          ability['areaEffect'] = false
          this.useAbility(ability, m)
        })
      }else{
        $store.state.player.characters.forEach(c => {
          ability['areaEffect'] = false
          this.useAbility(ability, c)
        })
      }
      return
    }
    if(ability.strength && (!ability.buff && !ability.debuff)){
      ability['actions'] = 1
      ability['hp'] = 1
      ability['lifeSteal'] = 0
      ability['luck'] = 0
      ability['speed'] = ability['speed'] ?? 1
      ability['isSpell'] = true
      battleService.handleAttack(ability, target)
    }
    if(ability.effect){
      // TODO refactor all effect/value pairs, instead do arrayEffects, stringEffects, numEffects USE-> key: value pairs
      // ex. numEffect: {hp: 5}, arrayEffect: {resistence: cold}, stringEffect: {dmgType: necrotic}
      ability.effect.forEach(function(e, i){
        if(Array.isArray(target[e])){
          target[e].push(ability.value[i])
        }else if(typeof ability.value[i] !== 'number'){
          target[e] = ability.value[i]
        }else{
          if(ability.buff){
            target[e] += ability.value[i]
          }else{
            target[e] -= ability.value[i]
          }
        }
      })
    }
    if(ability.temp){
      if(ability.debuff){
        ability.effect.forEach(function(e, i){
          target['debuffs'].push({effect: e, value: ability.value[i]})
        })
      }
      if(ability.buff){
        ability.effect.forEach(function(e, i){
          target['buffs'].push({effect: e, value: ability.value[i]})
        })
      }
    }
  }
}

export const abilitiesService = new AbilitiesService()