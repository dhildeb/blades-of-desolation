import Notify from "@/utils/Notify"

class BattleService{
  handleAttack(attacker, target){
    if(attacker.actions > 0){
      attacker.actions--
      let dmg = attacker.strength
      if(this.dodge(target)){
        Notify.toast(target.name+' dodged the attack', 'info')
        return
      }

      this.thorns(attacker, target)

      if(target.absorb == attacker.dmgType && target.absorb != ''){
        target.hp += attacker.strength
        Notify.toast(target.name+' absorbed the attack', 'info')
        return
      }
      
      dmg = this.resistance(attacker, target)

      this.lifeSteal(attacker, dmg)

      target.hp -= dmg
    }
  }
  thorns(attacker, target){
      if(target.thorns > 0){
        attacker.hp -= target.thorns
        Notify.toast(attacker.name+' took thorn DMG '+target.thorns)
    }
  }
  dodge(target){
    let chance = Math.floor(Math.random()*100)+1
    let dodge = target.dodge+target.luck
    return dodge >= chance
  }
  resistance(attacker, target){
    if(target.physicalResistance > 0 && attacker.dmgType == 'melee'){
      Notify.toast(target.name+' is resistant to the attack', 'info')
      return attacker.strength - Math.round(attacker.strength * (target.physicalResistance/100))
    }
    if(target.magicResistance > 0 && attacker.dmgType == 'magic'){
      Notify.toast(target.name+' is resistant to the attack', 'info')
      return attacker.strength - Math.round(attacker.strength * (target.magicResistance/100))
    }
    return attacker.strength
  }
  lifeSteal(attacker, dmg){
    if(attacker.lifeSteal > 0){
      let lifeSteal = Math.round(dmg*(attacker.lifeSteal/100))
      if(lifeSteal > 0){
        Notify.toast(attacker.name+' recovers some HP', 'info')
        attacker.hp += lifeSteal
      }
    }
  }

  reflect(attacker, target){
    if(target.reflect > 0){
      let dmg = Math.round(attacker.strength*(target.reflect))
      if(dmg > 0){
        attacker.hp -= dmg
        Notify.toast(attacker.name+' took DMG '+dmg)
      }
    }
  }
}

export const battleService = new BattleService()