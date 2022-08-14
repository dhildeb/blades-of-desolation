import { generateId } from "@/utils/generateId"
import $store from '@/store/index'
import { battleService } from "@/services/BattleService"
export class Ability{
  constructor(data){
    this.id = generateId()
    this.name = data.name
    this.level = data.level ?? 1
    this.dmgType = data.dmgType
    this.strength = data.strength
    this.areaEffect = data.areaEffect ?? false
    this.effect = data.effect ?? []
    this.value = data.value ?? []
    this.buff = data.buff ?? false
    this.debuff = data.debuff ?? false
    this.title = data.title ?? null
    this.classType = data.classType ?? 'any'
    this.uses = data.uses ?? 1
    this.baseUses = data.baseUses ?? 1
  }
  getTitle(){
    let title = ''
    if(this.strength){
      title = this.strength+' '+this.dmgType+' dmg'
    }else{
      title = this.buff ? '+' : '-'
      title += this.value+' '+this.effect
    }
    title += this.areaEffect ? ' (Mass effect)' :  ''
    return title
  }
  useAbility(ability, target){
    if(ability.uses <= 0){
      return
    }
    this.uses--
    if(ability.areaEffect){
      if(target == 'enemies'){
        $store.state.combatMonsters.forEach(m => {
          ability['areaEffect'] = false
          ability.useAbility(ability, m)
        })
      }else{
        $store.state.player.characters.forEach(c => {
          ability['areaEffect'] = false
          ability.useAbility(ability, c)
        })
      }
      return
    }
    if(ability.strength && (!ability.buff && !ability.debuff)){
      ability['actions'] = 1
      ability['hp'] = 1
      ability['lifeSteal'] = 0
      ability['luck'] = 0
      ability['speed'] = ability['speed'] ?? 0
      ability['isSpell'] = true
      battleService.handleAttack(ability, target)
    }
    if(ability.effect){
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