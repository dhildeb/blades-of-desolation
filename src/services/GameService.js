import { MonsterFactory } from "@/models/MonsterFactory"
import $store from '@/store/index.js'
import { characterLvlUpStatHelper } from "@/utils/characterLvlUpStatHelper"
import { characterService } from "./CharacterService"
import { monstersService } from "./MonstersService"
class GameService{
  determineTurn(){
      monstersService.takeTurn()
  }
  spawnMonsters(){
    let quantity = Math.ceil(Math.random()*3)
    let lvl = characterService.getAverageCharacterLvl()
    let monsterLvl = Math.floor(Math.random()*lvl)
    let monstersList = $store.state.monsters[monsterLvl]
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
    $store.state.player.characters.forEach(c => {
      c.exp += totalExp/charNum
      if(c.exp >= $store.state.levelUpChart[c.level]){
        this.levelUp(c)
      }
    })
  }

  levelUp(character){
    character.level++
    let lvlUpBoosts = characterLvlUpStatHelper(character.classType, character.race)
    lvlUpBoosts.classBoost.forEach(b => character[b] += character.level)
    lvlUpBoosts.classBoost.forEach(b => character['base'+b[0].charAt(0).toUpperCase()+b[0].slice(1)] += character.level)
    lvlUpBoosts.raceBoost.forEach(b => character[b] += character.level)
    lvlUpBoosts.raceBoost.forEach(b => character['base'+b[0].charAt(0).toUpperCase()+b[0].slice(1)] += character.level)
    
    character.hp += character.baseHp
    character.baseHp += character.baseHp
  }
}

export const gameService = new GameService()