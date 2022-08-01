import $store from "@/store/index"
import { Ability } from "@/models/Ability"
import Notify from "@/utils/Notify"

class AbilitiesService{
  learnAbility(abilityName, character){
    console.log(abilityName)
    if(!this.canLearnAbility(abilityName, character)){
      return false
    }
    if(character.abilities.find(a => a.name == abilityName)){
      this.levelUpAbility(abilityName, character)
      return
    }
    let abilityData = $store.state.abilities.find(a => a.name == abilityName)
    character.abilities.push(new Ability(abilityData))
    Notify.toast(character.name+' Learned '+abilityName, 'success')
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
    originalAbility = originalAbility.find(a => a.name == abilityName)

    ability.level++
    if(ability.strength){
      ability.strength += originalAbility.strength
    }
    if(ability.value){
      ability.value += originalAbility.value
    }
    Notify.toast(character.name+' Level up '+abilityName, 'success')
  }
}

export const abilitiesService = new AbilitiesService()