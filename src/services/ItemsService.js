import $store from '@/store/index.js'
import { characterService } from "./CharacterService"
class ItemsService{
  equipItem(character, item){
    let index = $store.state.player.items.indexOf(item)
    $store.state.player.items.splice(index, 1)
    character.equipment.push(item)
    characterService.addItemStats(character, item)
  }
}

export const itemsService = new ItemsService()