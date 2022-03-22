import $store from '@/store/index.js'
import Notify from "@/utils/Notify"
import { characterService } from "./CharacterService"
class ItemsService{
  equipItem(character, item){
    let canEquip = true
    if(item?.requirements){
      item.requirements.forEach(r => {
          if(character[r.stat] < r.req){
            canEquip = false
          }
      })
    }
      if(!canEquip){
      Notify.toast('You cant equip that Item', 'warning')
      return
    }
    // auto unequip
    character.equipment.forEach(e => {
      if(e.type == item.type){
        this.unequipItem(character, e)
      }
    })
    let index = $store.state.player.items.indexOf(item)
    $store.state.player.items.splice(index, 1)
    character.equipment.push(item)
    characterService.addItemStats(character, item)
  }
  unequipItem(character, item){
    let index = character.equipment.indexOf(item)
    character.equipment.splice(index, 1)
    $store.state.player.items.push(item)
    characterService.removeItemStats(character, item)
  }
}

export const itemsService = new ItemsService()