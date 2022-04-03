import { Item } from "@/models/Item"
import $store from '@/store/index'
import Notify from "@/utils/Notify"
import { characterService } from "./CharacterService"
class QuestService{
  acceptQuest(newQuest){
    let quest = Object.assign({}, newQuest)
    let lvl = characterService.getAverageCharacterLvl()
    if(quest.target == 'monsters'){
      let monstersList = $store.state[quest.target][lvl]
      let index = Math.floor(Math.random()*monstersList.length)
      quest.target = monstersList[index].name
      quest.goal += ($store.state.player.kills[quest.target] ?? 0)*(lvl > 0 ? lvl : 1)
      quest.reward = quest.reward*(lvl > 0 ? lvl : 1)
    }
    if(quest.target == 'item'){
      let itemList = $store.state[quest.target+'s'].filter(i => i.rarity == quest.goal)
      let index = Math.floor(Math.random()*itemList.length)
      quest.target = itemList[index].name
      itemList = $store.state[newQuest.target+'s'].filter(i => i.rarity == quest.goal)
      index = Math.floor(Math.random()*itemList.length)
      quest.reward = itemList[index].name
    }
    $store.state.player.quest = quest
  }
  checkQuest(){
    let quest = $store.state.player.quest
    if(quest.objective == 'kill'){
      $store.state.player.kills[quest.target] >= quest.goal
      this.completeQuest()
    }
    if(quest.objective == 'item'){
      $store.state.player.items.forEach(i => {
        if(i.name == quest.goal){
          this.completeQuest()
        }
      })
    }
  }
  completeQuest(){
    let quest = $store.state.player.quest
    if(typeof quest.reward == 'string'){
      $store.state.player.items = $store.player.items.filter(i => i.name != quest.name)
      let item = $store.state.items.filter(i => i.name == quest.reward)
      $store.state.player.items.push(new Item(item[0]))
    }else{
      $store.state.player.gold += quest.goal
    }
    Notify.toast('Quest Complete', 'success')
    $store.state.player.quest = {}
  }
}

export const questService = new QuestService()