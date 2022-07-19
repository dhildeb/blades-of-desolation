import { getRandomAbility } from "./getRandomAbility"

export function characterLvlUpStatHelper(classType, race, lvl){
  let boosts = {}
  switch(classType){
    case 'rogue':
      boosts['classBoost'] = ['baseStrength', 'strength', 'dodge']
      if(lvl % 3 == 0){
        boosts['classBoost'].push('luck')
      }
      break 
    case 'ranger':
      boosts['classBoost'] = ['baseStrength', 'strength', 'baseHp', 'hp']
      break
    case 'barbarian':
      boosts['classBoost'] = ['baseStrength', 'baseStrength', 'strength', 'strength']
      break
    case 'bard':
      boosts['classBoost'] = ['dodge', 'luck']
      break
    case 'wizard':
      boosts['classBoost'] = ['baseMagic', 'baseMagic', 'magic', 'magic']
      if(lvl % 2 == 0){
        boosts['classBoost'].push('magicRegen')
      }
      break
    case 'cleric':
      boosts['classBoost'] = ['baseMagic', 'magic', 'hp']
      if(lvl % 2 == 0){
        boosts['classBoost'].push('magicRegen')
      }
      break
    case 'fighter':
      boosts['classBoost'] = ['baseStrength', 'strength', 'physicalResistance']
      break
    case 'monk':
      boosts['classBoost'] = ['physicalResistance', 'magicResistance']
      if(lvl % 5 == 0){
        boosts['classBoost'].push('actions')
      }
      break
      case 'paladin':
        boosts['classBoost'] = ['baseStrength', 'strength', 'thorns']
        if(lvl % 2 == 0){
          boosts['classBoost'].push('magic')
        }
        if(lvl % 3 == 0){
          boosts['classBoost'].push('magicRegen')
        }
      break
    case 'warlock':
      boosts['classBoost'] = ['baseMagic', 'magic', 'lifeSteal']
      if(lvl % 2 == 0){
        boosts['classBoost'].push('magicRegen')
      }
      break
    default:
      boosts['classBoost'] = [[getRandomAbility()], [getRandomAbility()]]
      break
  }
  switch(race){
    case 'dragonborn':
      boosts['raceBoost'] = ['baseStrength', 'baseStrength', 'strength', 'strength']
      break
    case 'human':
      boosts['raceBoost'] = ['baseStrength', 'baseHp', 'strength', 'hp']
      break
    case 'elf':
      boosts['raceBoost'] = ['baseMagic', 'magic', 'dodge']
      break
    case 'dwarf':
      boosts['raceBoost'] = ['baseHp', 'baseHp', 'hp', 'hp']
      break
    case 'halfling':
      boosts['raceBoost'] = ['luck', 'luck']
      break
    default:
      boosts['raceBoost'] = [[getRandomAbility()], [getRandomAbility()]]
      break
  }
  return boosts
}
