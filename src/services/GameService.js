import { Item } from "@/models/Item"
import { MonsterFactory } from "@/models/MonsterFactory"
import $store from '@/store/index.js'
import { characterLvlUpStatHelper } from "@/utils/characterLvlUpStatHelper"
import { characterService } from "./CharacterService"
import { itemsService } from "./ItemsService"
import { monstersService } from "./MonstersService"
class GameService{
  determineTurn(){
    monstersService.takeTurn()
  }
  spawnMonsters(){
    $store.state.combatMonsters = []
    let quantity = Math.ceil(Math.random()*3)
    let lvl = characterService.getAverageCharacterLvl()
    for(let i=0; i<quantity; i++){
      let monsterLvl = Math.ceil(Math.random()*lvl)
      let monstersList = $store.state.monsters[monsterLvl]
      let index = Math.floor(Math.random()*monstersList.length)
      $store.state.combatMonsters.push(new MonsterFactory(monstersList[index]))
    }
  }
  victory(){
    characterService.resetActions()
    this.handleExpGain()
    this.loot()
    itemsService.randomItemDrop()
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

  loot(){
    $store.state.combatMonsters.forEach(c => {
      $store.state.player.gold += c.loot.gold
      c.loot.items.forEach(li => {
        let item = $store.state.items.filter(i => i.name == li)
        $store.state.player.items.push(new Item(item[0]))
      })
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