import { createStore } from 'vuex'

const store = createStore({
  state: {
      monsters: [{name: 'Goblin', power: 1, hp: 5, id: 1, goldPrize: 5, maxPrize: ''}, {name: 'Dragon', power: 10, hp: 500, id: 100, goldPrize: 500, maxPrize: 'dragon'}],
      cards: [{name: 'Assassin', cost: 50, power: 2, ability: 'dodge', abilityBoost: .1, type: 'human'}, {name: 'Barbarian', cost: 60, power: 3, ability: 'crit', abilityBoost: .1, type: 'human'}],
      player: {
        cards: [{name: 'Assassin', id: 1, cost: 50, power: 2, ability: 'dodge', abilityBoost: .1, type: 'human'}, {name: 'Barbarian', id: 2, cost: 60, power: 3, ability: 'crit', abilityBoost: .1, type: 'human'}],
        hp: 10,
        abilities: {dodge: 0, crit: 0},
        gold: 0
      },
      selected: ''
  },
  getters: {

  },
  mutations: {
    selectCard(state, card){
      state.selected = card
      console.log(state.selected)
    },
    monsterAttacked(state, monster){
      monster.hp -= state.selected.power
      console.log(monster)
    }
  },
  actions: {
  },
  modules: {
  }
})

export default store
