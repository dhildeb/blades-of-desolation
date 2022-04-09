export function getRandomDmgType(){
  let dmgTypes = ['lightning', 'melee', 'magic', 'acid', 'necrotic', 'poison', 'fire', 'cold', 'psychic', 'radiant']
  let random = Math.floor(Math.random()*dmgTypes.length)
  return dmgTypes[random]
}