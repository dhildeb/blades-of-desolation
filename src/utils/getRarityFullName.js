export function getRarityFullName(rarity){
  let fullName = 'common'
  switch(rarity){
    case 'uc':
      fullName = 'uncommon'
      break
    case 'r':
      fullName = 'rare'
      break
    case 'vr':
      fullName = 'very-rare'
      break
    case 'l':
      fullName = 'legendary'
      break
  }
  return fullName
}