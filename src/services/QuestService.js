import { Item } from "@/models/Item"
import $store from '@/store/index'
import Notify from "@/utils/Notify"
import { useToast } from "vue-toastification"
class QuestService{
  toast = useToast()
  getQuest(newQuest){
    let quest = Object.assign({}, newQuest)
    if(quest.objective == 'kill'){
      let monstersList = $store.state[quest.target][$store.state.location]
      let index = Math.floor(Math.random()*monstersList.length)
      quest.target = monstersList[index].name
      quest.objective += ' X'+quest.goal
      quest.reward = quest.reward*(index > 0 ? index : 1)
    }
    if(quest.objective == 'find'){
      let itemList = $store.state[quest.target+'s'].filter(i => i.rarity == quest.goal)
      let index = Math.floor(Math.random()*itemList.length)
      quest.target = itemList[index].name
      itemList = $store.state[newQuest.target+'s'].filter(i => i.rarity == quest.reward)
      index = Math.floor(Math.random()*itemList.length)
      quest.reward = itemList[index].name
    }
    if(quest.objective == 'explore'){
      let row = Math.ceil(Math.random()*10)
      let col = Math.ceil(Math.random()*12)
      quest.target = Math.floor(Math.random()*($store.state.player.explored.filter(e => e.length > 0).length-1))
      quest.goal = quest.target+'-'+row+'-'+col
      quest.reward = (quest.target+1)*row*col
    }
    return quest
  }

  updateQuest(){
    let quest = $store.state.player.quest
    if(!quest.objective){return}
    if(quest.objective.includes('kill')){ 
      $store.state.combatMonsters.forEach(m => {
        if(m.name == quest.target){
          quest.progress++
        }
      })
      if(quest.progress >= quest.goal){
        this.toast.success('Quest completed!')
      }
    }
    if(quest.objective == 'find'){
      $store.state.player.items.forEach(i => {
        if(i.name == quest.target){
          quest.progress = 'complete'
          this.toast.success('Quest completed!')
        }
      })
    }
    if(quest.objective == 'explore'){
      let currentLocation = $store.state.player.explored[$store.state.location][$store.state.player.explored[$store.state.location].length -1]
      if(quest.goal == currentLocation){
        quest.progress = 'complete'
        this.toast.success('Quest completed!')
      }
    }
  }
  async checkQuestProgress(){
    let quest = $store.state.player.quest
    if((quest.progress >= quest.goal || quest.progress == 'complete') && quest.objective){
      if(await Notify.confirm('Quest Completed!', 'Turn in quest for reward?')){
        this.completeQuest()
      }
    }
  }
  completeQuest(){
    let quest = $store.state.player.quest
    if(quest.objective == 'find'){
      $store.state.player.items = $store.state.player.items.filter(i => i.name != quest.name)
      let item = $store.state.items.filter(i => i.name == quest.reward)
      $store.state.player.items.push(new Item(item[0]))
    }
    if(quest.objective.includes('kill')){
      $store.state.player.gold += quest.reward
    }
    if(quest.objective == 'explore'){
      $store.state.player.characters.forEach(c => c.exp += quest.reward)
    }
    this.toast.success('Quest Complete')
    $store.state.player.quest = {}
  }
  deleteQuest(){
    $store.state.player.quest = {}
  }
}

export const questService = new QuestService()