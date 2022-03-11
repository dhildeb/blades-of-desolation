import { createStore } from 'vuex'
import Notify from "@/utils/Notify"
const store = createStore({
  state: {
      monsters: {
        1: [{name: 'Goblin', actions: 1, baseActions: 1, strength: 1, hp: 5, baseHp: 5, id: 1, loot: {gold: 5, items: ''}, maxPrize: ''}], 
        20: [{name: 'Dragon',actions: 3, baseActions: 3, strength: 10, hp: 500, id: 100, goldPrize: 500, maxPrize: 'dragon'}]
      },
      cards: [{name: 'Assassin', cost: 50, power: 2, ability: 'dodge', abilityBoost: .1, type: 'human'}, {name: 'Barbarian', cost: 60, power: 3, ability: 'crit', abilityBoost: .1, type: 'human'}],
      characters: {
        classes: ['rogue', 'ranger', 'barbarian', 'wizard', 'cleric', 'fighter', 'monk', 'paladin', 'warlock'],
        races: ['dragonborn', 'human', 'elf', 'dwarf', 'halfling', 'unknown' ]
      },
      combatMonsters: [],
      player: {
        characters: [],
        hp: 10,
        abilities: {dodge: 0, crit: 0},
        gold: 0,
        items: []
      },
      selected: '',
  },
  getters: {

  },
  mutations: {
    selectCharacter(state, char){
      state.selected = char
    },
    monsterAttacked(state, monster){
      if(state.selected.actions > 0){
        state.selected.actions -= 1
        console.log(state.selected.actions)
        monster.hp -= state.selected.power
      }else{
        Notify.toast(state.selected.name+' is out of actions', 'warning')
      }
    },
    bringOutYourDead(state){
      state.combatMonsters = []
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
