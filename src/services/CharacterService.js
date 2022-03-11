import $store from '@/store/index.js'
class CharacterService{
  addCharacter(character){
    $store.state.player.characters.push(character)
  }
  resetActions(){
    $store.state.player.characters.forEach(c => {
      if(c.hp > 0){
        c.actions += c.baseActions
      }
    })
  }
  getAverageCharacterLvl(){
    let totalLvl = 0
    $store.state.player.characters.forEach(c => totalLvl += c.level)
    return Math.floor(totalLvl/$store.state.player.characters.length)
  }
}
export const characterService = new CharacterService()