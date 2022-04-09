export function getRandomAbility(){
  let stats = ['hp', 'strength', 'dodge', 'thorns', 'actions', 'lifeSteal', 'luck', 'magic', 'physicalResistance', 'magicResistance']
  let random = Math.floor(Math.random()*stats.length)
  return stats[random]
}