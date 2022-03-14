import { MonsterFactory } from "@/models/MonsterFactory"
import $store from '@/store/index.js'
import { characterService } from "./CharacterService"
import { monstersService } from "./MonstersService"
class GameService{
  determineTurn(){
      monstersService.takeTurn()
  }
  determineAttackOn(monster){
    let attacker = $store.state.selected
    if(attacker.actions > 0){
        attacker.actions--
        monster.hp -= $store.state.selected.strength
    }
  }
  spawnMonsters(){
    let quantity = Math.ceil(Math.random()*3)
    let lvl = characterService.getAverageCharacterLvl()
    let monstersList = $store.state.monsters[lvl]
    for(let i=0; i<quantity; i++){
      let index = Math.floor(Math.random()*monstersList.length)
      $store.state.combatMonsters.push(new MonsterFactory(monstersList[index]))
    }
  }
  victory(){
    characterService.resetActions()
    this.handleExpGain()
  }
  handleExpGain(){
    let totalExp = $store.state.combatMonsters.map(m => m.exp).reduce((previous, current) => previous + current)
    //NOTE even dead characters get exp, maybe refactor
    let charNum = $store.state.player.characters.length
    $store.state.player.characters.forEach(c => c.exp += totalExp/charNum)
  }
}

export const gameService = new GameService()