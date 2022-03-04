
class MonstersService{
  getRandomMonsters(num){
    console.log(num)
    let monsters = []
    for(let i=0; i<num; i++){
      let index = Math.floor(Math.random()*_monsters.length)
      monsters.push(_monsters[index])
    }
    this.$store.commit('getMonsters', monsters)
  }
}
const _monsters = [{name: 'Goblin', id: 1}, {name: 'Dragon', id: 100}]

export const monstersService = new MonstersService()