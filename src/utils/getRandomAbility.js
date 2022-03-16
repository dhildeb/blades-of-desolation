export function getRandomAbility(){
  let random = Math.floor(Math.random()*11)
  let stats = ['hp', 'strength', 'dodge', 'thorns', 'dodge', 'thorns', 'actions', 'lifeSteal', 'luck', 'magic', 'physicalResistance', 'magicResistance']
  return stats[random]
}