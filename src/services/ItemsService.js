import { Item } from "@/models/Item"
import $store from '@/store/index.js'
import Notify from "@/utils/Notify"
import { characterService } from "./CharacterService"
import { monstersService } from "./MonstersService"
class ItemsService{
  randomItemDrop(){
    let dropChance = Math.ceil(Math.random()*100)
    let partyLuck = 1
    $store.state.player.characters.forEach(c => partyLuck += c.luck)
    if(partyLuck > dropChance){
      // c 79.74% un 15% r 5% vr .25% l .01%
      let dropRarity = Math.ceil(Math.random()*10000)+partyLuck
      const rarityDictionary = {c: 7974, uc: 9474, r: 9974, vr: 9999, l: 10000}
      for(let r in rarityDictionary){
        if(rarityDictionary[r] >= dropRarity){
          dropRarity = r
        }
      }
      let possibleItems = $store.state.items.filter(i => i.rarity == dropRarity)
      let index = Math.floor(Math.random()*possibleItems.length)
      var item = possibleItems[index]
      var creatureDropIndex = Math.floor(Math.random()*$store.state.combatMonsters.length)
      $store.state.combatMonsters[creatureDropIndex].equipment.push(item.name)
    }
    monstersService.addItemStats($store.state.combatMonsters[creatureDropIndex], item.name)
  }
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
  sellItem(item){
    let index = $store.state.player.items.indexOf(item)
    $store.state.player.items.splice(index, 1)
    $store.state.player.gold += item.price/10
  }
  buyItem(item){
    $store.state.player.items.push(new Item(item))
  }
}

export const itemsService = new ItemsService()