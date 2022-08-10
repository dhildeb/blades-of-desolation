import { Item } from "@/models/Item"
import $store from '@/store/index.js'
import Notify from "@/utils/Notify"
import { characterService } from "./CharacterService"
import { monstersService } from "./MonstersService"
class ItemsService{
  randomItemDrop(){
    let dropChance = Math.ceil(Math.random()*100)
    let partyLuck = 1+$store.state.location+characterService.getPartyLuck()
    if(partyLuck > dropChance){
      let item = this.findRandomItem()
      let creatureDropIndex = Math.floor(Math.random()*$store.state.combatMonsters.length)
      $store.state.combatMonsters[creatureDropIndex].equipment.push(item.name)
      monstersService.addItemStats($store.state.combatMonsters[creatureDropIndex], item.name)
      $store.state.combatMonsters[creatureDropIndex].hp = $store.state.combatMonsters[creatureDropIndex].baseHp
    }
  }
  findRandomItem(){
    let partyLuck = 1+$store.state.location+characterService.getPartyLuck()
    let dropRarity = Math.ceil(Math.random()*10000)+partyLuck
    // c 79.74% un 15% r 5% vr .25% l .01%
    const rarityDictionary = {c: 7974, uc: 9474, r: 9974, vr: 9999, l: 10000}
    for(let r in rarityDictionary){
      if(rarityDictionary[r] >= dropRarity){
        dropRarity = r
      }
    }
    let possibleItems = $store.state.items.filter(i => i.rarity == dropRarity)
    let index = Math.floor(Math.random()*possibleItems.length)
    return possibleItems[index]
  }
  equipItem(character, item){
    $store.message = ''
    if(!this.checkItemReqs(character, item)){
      Notify.toast($store.message, 'warning')
      return
    }
    $store.message = ''
    
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
    this.unequipReqMissingItems(character)
  }
  unequipItem(character, item){
    let index = character.equipment.indexOf(item)
    character.equipment.splice(index, 1)
    $store.state.player.items.push(item)
    characterService.removeItemStats(character, item)
    this.unequipReqMissingItems(character)
  }
  sellItem(item){
    let index = $store.state.player.items.indexOf(item)
    $store.state.player.items.splice(index, 1)
    $store.state.player.gold += item.price/10
  }
  buyItem(item){
    $store.state.player.items.push(new Item(item))
  }
  checkItemReqs(character, item){
    let canEquip = true
    
    if(!item?.requirements){
      return canEquip
    }
    item.requirements.forEach(r => {
      if(Array.isArray(r.req)){
        canEquip = this.checkMultiReqs(character, r)
      }else{
        canEquip = this.checkSingleReq(character, r)
      }
    })
    return canEquip
  }
  checkMultiReqs(character, reqs){
    let pass = false
    reqs.req.forEach(r => {
      if(Array.isArray(character[r.stat])){
        pass = this.checkSingleReq(character, reqs)
      }else if(character[reqs.stat].includes(r) || character[reqs.stat] >= r){
        pass = true
      }
    })
    return pass
  }
  checkSingleReq(character, r){
    let pass = false

    if(Array.isArray(character[r.stat])){
      character[r.stat].forEach(s => {
        if(typeof s === "object"){
          if(s.name.includes(r.req)){
            pass = true
          }
        }
        else if(s.includes(r.req) || s >= r.req){
          pass = true
        }
      })
    }else if(character[r.stat] >= r.req){
        pass = true
    }else{
      $store.message += ' requires '+r.stat.replace(/([A-Z])/g, " $1")+' to be '+r.req
    }

    return pass
  }
  unequipReqMissingItems(character){
    character.equipment.forEach(e => {
      if(!this.checkItemReqs(character, e)){
        this.unequipItem(character, e)
      }
    })
  }
}

export const itemsService = new ItemsService()