import { getRandomAbility } from "./getRandomAbility"

export function characterLvlUpStatHelper(classType, race){
  let boosts = {}
  switch(classType){
    case 'rogue':
      boosts['classBoost'] = ['actions', 'dodge']
      break
    case 'ranger':
      boosts['classBoost'] = ['actions', 'hp']
      break
    case 'barbarian':
      boosts['classBoost'] = ['strength', 'strength']
      break
    case 'wizard':
      boosts['classBoost'] = ['magic', 'magic']
      break
    case 'cleric':
      boosts['classBoost'] = ['magic', 'hp']
      break
    case 'fighter':
      boosts['classBoost'] = ['strength', 'actions']
      break
    case 'monk':
      boosts['classBoost'] = ['actions', 'actions']
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
      boosts['raceBoost'] = ['magic', 'actions']
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
