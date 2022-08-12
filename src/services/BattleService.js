import Notify from "@/utils/Notify"
import { animationsService } from "./AnimationsService"
import { sleep } from "../utils/sleep"
import { MonsterFactory } from "../models/MonsterFactory"

class BattleService{
  handleAttack(attacker, target){
    let delay = attacker instanceof MonsterFactory ? 200 : 0
    if(delay == 0){
      attacker.actions--
    }
    sleep(delay).then(()=>{
      let dmg = attacker.strength
      if(target.immunities.filter(i => i == 'crit').length < 1){
        dmg = this.crit(attacker, dmg)
      }
      if(this.dodge(target)){
        Notify.toast(target.name+' dodged the attack', 'info')
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

      if(target.immunities.filter(i => i == attacker.dmgType).length > 0){
        Notify.toast(target.name+' is immune to '+attacker.dmgType)
        dmg = 0
      }
      animationsService.fadeOutUp('hit'+target.id, dmg, '-')
      sleep(200).then(()=>{
        animationsService.shake('charImg'+target.id)
      })
      target.hp -= dmg
    })
  }
  thorns(attacker, target){
      if(target.thorns > 0 && attacker.dmgType == 'melee'){
        attacker.hp -= target.thorns
        animationsService.fadeOutUp('hit'+attacker.id, target.thorns, '-')
    }
  }
  dodge(target){
    let chance = Math.floor(Math.random()*100)+1
    let dodge = target.dodge+target.luck
    return dodge >= chance
  }
  resistance(attack, target){
    let dmg = attack.strength
    if(target.resistances.filter(r => r == attack.dmgType).length > 0){
      Notify.toast(target.name+' is resistant to '+attack.dmgType)
      dmg = Math.round(dmg/2)
    }
    if(target.physicalResistance > 0 && attack.dmgType == 'melee'){
      Notify.toast(target.name+' is resistant to '+attack.dmgType, 'info')
      dmg = dmg - Math.round(dmg * (target.physicalResistance/100))
    }
    if(target.magicResistance > 0 && attack.dmgType == 'magic'){
      Notify.toast(target.name+' is resistant to '+attack.dmgType, 'info')
      dmg = dmg - Math.round(dmg * (target.magicResistance/100))
    }
    return dmg < 0 ? 0 : dmg
  }
  vulnerable(attack, target){
    let dmg = attack.strength
    if(target.vulnerabilities.filter(v => v == attack.dmgType).length > 0){
      Notify.toast(target.name+' is vulnerable to '+attack.dmgType)
      dmg = Math.round(dmg*2)
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
    let crit = Math.ceil(Math.random()*400)
    let chance = 1+Math.round(attacker.luck)
    if(chance >= crit){
      dmg *= 2
      Notify.toast(attacker.name+' CRIT HIT', 'info')
    }
    return dmg
  }
}

export const battleService = new BattleService()