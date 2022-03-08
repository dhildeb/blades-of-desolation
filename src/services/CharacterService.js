import $store from '@/store/index.js'
class CharacterService{
addCharacter(character){
  $store.state.player.characters.push(character)
}
newTurn(){
  $store.state.player.characters.forEach(c => {
    if(c.hp > 0){
      c.actions += c.baseActions
    }
  })
}
}
export const characterService = new CharacterService()