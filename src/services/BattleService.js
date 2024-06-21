import { animationsService } from "./AnimationsService"
import { sleep } from "../utils/sleep"
import { MonsterFactory } from "../models/MonsterFactory"
import { gameService } from "./GameService"
import { useToast } from "vue-toastification"
import { monstersService } from "./MonstersService"

class BattleService{
  toast = useToast()
  animationDelay = 750
  handleAttack(attacker, target){
    let targetIsFoe = target instanceof MonsterFactory
    let operator = targetIsFoe ? '-' : '+'
    let delay = targetIsFoe ? 0 : 200
    if(delay == 0){
      attacker.actions -= gameService.getSpeedCost(attacker, attacker['isSpell'] ? attacker.speed : false)
    }
    sleep(delay).then(()=>{
      let dmg = attacker.strength
      if(target.immunities.filter(i => i == 'crit').length < 1){
        dmg = this.crit(attacker, dmg)
      }

      if(this.dodge(target)){
        animationsService.fadeOutUp('hit'+target.id, '<span>dodged</span>', operator)
        if(!targetIsFoe && target.classType === 'rogue') {
          target.abilities.forEach(a => a.name === 'sneak attack' ? a.uses = a.baseUses : null);
        }
        return
      }

      this.thorns(attacker, target)

      if(target.absorb == attacker.dmgType && target.absorb != ''){
        target.hp += attacker.strength
        animationsService.fadeOutUp('hit'+target.id, attacker.strength, '+')
        return
      }

      dmg = this.resistance({strength: dmg, dmgType: attacker.dmgType}, target)
      dmg = this.vulnerable({strength: dmg, dmgType: attacker.dmgType}, target)

      this.lifeSteal(attacker, dmg)

      dmg = this.immunities(target, attacker, dmg)

      this.statusEffects(target, attacker)

      animationsService.fadeOutUp('hit'+target.id, dmg, '-', attacker.dmgType)
      sleep(200).then(()=>{
        animationsService.shake('charImg'+target.id)
      })
      target.hp -= dmg
    })
    this.animationDelay = 750
    if(attacker instanceof MonsterFactory){
      monstersService.triggerAbilities(attacker, target)
    }
  }
  thorns(attacker, target){
      if(target.thorns <= 0 || attacker.dmgType == 'range' || attacker['isSpell']){
        return
      }
      let dmg = target.thorns
      dmg = this.immunities(attacker, target, dmg)
      dmg = this.resistance({strength: dmg, dmgType: target.dmgType}, attacker)
      dmg = this.vulnerable({strength: dmg, dmgType: target.dmgType}, attacker)
      attacker.hp -= dmg
      animationsService.fadeOutUp('hit'+attacker.id, dmg, '-', target.dmgType)
  }
  dodge(target){
    let chance = Math.floor(Math.random()*100)+1
    let dodge = target.dodge+target.luck
    if(target['statusEffects'].find(e => e.name == 'petrify' && e.negative)){
      return false
    }
    return dodge >= chance
  }
  resistance(attack, target){
    let targetIsFoe = target instanceof MonsterFactory
    let operator = targetIsFoe ? '-' : '+'
    let dmg = attack.strength
    if(target.resistances.filter(r => r == attack.dmgType).length > 0 || (target.resistances.find(r => r == 'melee') && attack.dmgType == 'range')){
      dmg = Math.round(dmg/2)
      setTimeout(() => {
        animationsService.fadeOutUp('hit'+target.id, '<span>resistant</span>', operator)
      }, this.animationDelay)
      this.animationDelay += 750
    }
    if(target.physicalResistance > 0 && attack.dmgType == 'melee' || (target.physicalResistance > 0 && attack.dmgType == 'range')){
      dmg = dmg - Math.round(dmg * (target.physicalResistance/100)*10)/10
    }
    if(target.magicResistance > 0 && attack.dmgType != 'melee' && attack.dmgType != 'range'){
      dmg = dmg - Math.round(dmg * (target.magicResistance/100)*10)/10
    }
    return dmg < 0 ? 0 : dmg
  }
  vulnerable(attack, target){
    let targetIsFoe = target instanceof MonsterFactory
    let operator = targetIsFoe ? '+' : '-'
    let dmg = attack.strength
    if(target.vulnerabilities.filter(v => v == attack.dmgType).length > 0){
      dmg = Math.round(dmg*2)
      setTimeout(() => {
        animationsService.fadeOutUp('hit'+target.id, '<span>vulnerable</span>', operator)
      }, this.animationDelay)
      this.animationDelay += 750
    }
    return dmg
  }
  immunities(target, attacker, dmg){
    let targetIsFoe = target instanceof MonsterFactory
    let operator = targetIsFoe ? '-' : '+'
    if(target.immunities.filter(i => i == attacker.dmgType).length > 0){
      setTimeout(() => {
        animationsService.fadeOutUp('hit'+target.id, '<span>immune</span>', operator)
      }, this.animationDelay)
      this.animationDelay += 750
      
      return 0
    }
    return dmg
  }
  lifeSteal(attacker, dmg){
    if(attacker.lifeSteal > 0){
      let lifeSteal = Math.round(dmg*(attacker.lifeSteal/100)*10)/10
      if(lifeSteal > 0){
        animationsService.fadeOutUp('hit'+attacker.id, lifeSteal, '+')
        attacker.hp = Math.round((lifeSteal + attacker.hp)*10)/10
      }
    }
  }

  reflect(attacker, target){
    if(target.reflect > 0){
      let dmg = Math.round((attacker.strength)*(target.reflect))
      if(dmg > 0){
        attacker.hp -= dmg
        animationsService.fadeOutUp('hit'+attacker.id, dmg, '-')
      }
    }
  }

  crit(attacker, dmg){
    let attackerIsFoe = attacker instanceof MonsterFactory
    let operator = attackerIsFoe ? '-' : '+'
    let crit = Math.ceil(Math.random()*400)
    let chance = 1+Math.round(attacker.luck)
    if(chance >= crit){
      dmg *= 2
      animationsService.fadeOutUp('hit'+attacker.id, 'crit!', operator)
    }
    return dmg
  }

  statusEffects(target, attacker){
    let targetIsFoe = target instanceof MonsterFactory
    let operator = targetIsFoe ? '+' : '-'
    attacker.statusEffects.forEach(se => {
      let status = {...se}
      let chance = Math.ceil(Math.random()*100)
      let immune = target.immunities.find(i => i == status.name)
      let resistant = target.resistances.find(r => r == status.name)
      let vulnerable = target.vulnerabilities.find(v => v == status.name)

      chance *= vulnerable ? .5 : 1
      chance *= resistant ? 2 : 1

      if(status.chance < chance || status.negative || immune){return}
      if(target['statusEffects'].find(e => e.name == status.name && e.negative)){
        target['statusEffects'].filter(e => e.name == status.name && e.negative)[0].value += status.value
        setTimeout(() => {
          animationsService.fadeOutUp('hit'+target.id, '<span>'+status.name+'</span>', operator)
        }, this.animationDelay)
        this.animationDelay += 750
        return
      }
      status.negative = true
      target['statusEffects'].push(status)
      setTimeout(() => {
        animationsService.fadeOutUp('hit'+target.id, '<span>'+status.name+'</span>', operator)
      }, this.animationDelay)
      this.animationDelay += 750
    })
  }
}

export const battleService = new BattleService()