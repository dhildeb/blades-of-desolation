import { getRandomAbility } from "./getRandomAbility"

export function characterLvlUpStatHelper(classType, race){
  let boosts = {}
  switch(classType){
    case 'rogue':
      boosts['classBoost'] = ['strength', 'dodge']
      break 
    case 'ranger':
      boosts['classBoost'] = ['strength', 'hp']
      break
    case 'barbarian':
      boosts['classBoost'] = ['strength', 'strength']
      break
    case 'bard':
      boosts['classBoost'] = ['dodge', 'luck']
      break
    case 'wizard':
      boosts['classBoost'] = ['magic', 'magic']
      break
    case 'cleric':
      boosts['classBoost'] = ['magic', 'hp']
      break
    case 'fighter':
      boosts['classBoost'] = ['strength', 'physicalResistance']
      break
    case 'monk':
      boosts['classBoost'] = ['physicalResistance', 'magicResistance']
      break
    case 'paladin':
      boosts['classBoost'] = ['strength', 'thorns']
      break
    case 'warlock':
      boosts['classBoost'] = ['magic', 'lifeSteal']
      break
    default:
      boosts['classBoost'] = [[getRandomAbility()], [getRandomAbility()]]
      break
  }
  switch(race){
    case 'dragonborn':
      boosts['raceBoost'] = ['strength', 'strength']
      break
    case 'human':
      boosts['raceBoost'] = ['strength', 'hp']
      break
    case 'elf':
      boosts['raceBoost'] = ['magic', 'dodge']
      break
    case 'dwarf':
      boosts['raceBoost'] = ['hp', 'hp']
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
