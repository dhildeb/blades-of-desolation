import { Character } from "@/models/Character"
import $store from '@/store/index.js'
import { getRandomAbility } from "@/utils/getRandomAbility"
import { useToast } from "vue-toastification"
import { animationsService } from "./AnimationsService"
import { gameService } from "./GameService"
import { monstersService } from "./MonstersService"
import { spellsService } from "./SpellsService"
import { setBonus } from "@/utils/setBonus"
import { itemsService } from "./ItemsService"
class CharacterService{
  toast = useToast()

  getCharacterById(id){
    return $store.state.player.characters.find(c => c.id == id)
  }
  takeTurn(){
    this.prepPhase()
    this.attackPhase()
  }
  
  prepPhase(){
    if($store.state.combatMonsters.filter(m => m.hp > 0).length > 0){
      gameService.setTimer()
    }
    this.removeDestroyedCharacters()
    this.resetActions()
    this.triggerStatusEffects()
    this.autoSelect()
  }
  attackPhase(){
    
  }
  endPhase(){
    clearInterval($store.state.timerInterval)
    $store.state.timer = 10000*$store.state.player.characters.length
    this.regen()
    this.magicRegen()
    $store.state.selected = ''
    this.resetExtraStats()
    monstersService.takeTurn()
  }
  resetActions(){
    $store.state.player.characters.forEach(c => {
      c.actions = c.actions >= 0 ? c.baseActions : c.actions+c.baseActions
    })
  }
  resetExtraStats(){
    $store.state.player.characters.forEach(c => {
      if(c.hp > c.baseHp){
        c.hp = c.baseHp
      }
      if(c.magic > c.baseMagic){
        c.magic = c.baseMagic
      }
    })
  }
  getAverageCharacterLvl(){
    let totalLvl = 0
    $store.state.player.characters.forEach(c => totalLvl += c.level)
    if(totalLvl){
      return Math.floor(totalLvl/$store.state.player.characters.length)
    }
    return totalLvl
  }
  getPartyLuck(){
    let luck = 0
    $store.state.player.characters.forEach(c => luck += c.luck)
    return luck
  }
  removeDestroyedCharacters(){
    $store.state.player.characters.forEach(c => {
      if(c.hp < c.baseHp*-2){
        $store.commit('destroyCharacter', c.id)
        this.toast.error(c.name+' was destroyed')
      }
    })
  }
  autoSelect(){
    if($store.state.selected?.hp > 0 && $store.state.selected?.actions > 0){
      return
    }
    $store.state.player.characters.forEach(c => {
      if(c.actions > 0 && c.hp > 0 && c.inBattle){
        $store.state.selected = c
        return
      }
    })
  }
  regen(){
    $store.state.player.characters.forEach(c => {
      if(c.regen > 0 ?? c.inBattle){
        animationsService.fadeOutUp('hit'+c.id, c.regen, '+')
        c.hp += c.regen
      }
    })
  }
  magicRegen(){
    $store.state.player.characters.forEach(c => {
      if(c.magicRegen > 0 ?? c.inBattle){
        c.magic += c.magicRegen
        c.magic = c.magic > c.baseMagic ? c.baseMagic : c.magic
      }
    })
  }

  triggerStatusEffects(){
    $store.state.player.characters.forEach(c => {
      c.statusEffects.forEach(se => {
        if(!se.negative || typeof se.value !== 'number'){return}
        c[se.effect] = se.value > 0 ? c[se.effect] - se.value : se.value
        if(se.effect == 'hp'){
          animationsService.fadeOutUp('hit'+c.id, se.value, '-', 'poison')
        }
      })
    })
  }
  attemptToFlee(character){
    let enemies = $store.state.combatMonsters.filter(m => m.hp > 0).length
    let party = $store.state.player.characters.filter(c => c.inBattle).length
    let chance = party == enemies ? .5 : party/enemies
    chance += character.luck/100
    let fail = Math.random()
    if(chance > fail){
      character.inBattle = false
      this.toast.success(character.name+' got away')
    }else{
      this.toast.error('Failed to escape')
    }
  }
  enterBattle(){
    $store.state.player.characters.forEach(c => c.inBattle = true)
  }
  addItemStats(character, item){
    $store.commit('equipItem', {characterId: character.id, item: item})
  }
  removeItemStats(character, item){
    $store.commit('unequipItem', {characterId: character.id, item: item})
  }
  addSetBonuses(character){
    let setCounts = {}
    character.equipment.forEach(item => {
      if(item.set){
        setCounts[item.set] = setCounts[item.set] > 0 ? setCounts[item.set]+1 : 1
      }
    })
    for(let set in setCounts){
      if(setCounts[set] > 1){
        for(let i=0; i < setCounts[set]-1; i++){
          this.addItemStats(character, setBonus[set][i])
          character.sets.push(itemsService.getItemEffectsDisplay(setBonus[set][i]))
        }
      }
    }
  }
  removeSetBonuses(character){
    let setCounts = {}
    character.equipment.forEach(item => {
      if(item.set){
        setCounts[item.set] = setCounts[item.set] > 0 ? setCounts[item.set]+1 : 1
      }
    })
    for(let set in setCounts){
      if(setCounts[set] > 1){
        character.sets = []
        for(let i=0; i < setCounts[set]-1; i++){
          this.removeItemStats(character, setBonus[set][i])
        }
      }
    }
  }
  loadCharacter(index, char){
    $store.state.player.characters[index] = new Character(char)
  }
  createCharacter(char){
    let spell = false
    switch(char.classType){
      case 'rogue':
        if(char.name == 'Royce'){
          char["strength"] += 2
          char["hp"] += 5
        }
        char["strength"]++
        char["actions"]++
        char["dodge"] += 5
        break
      case 'ranger':
        if(char.name == 'Aragorn'){
          char["regen"] = 2
        }
        char["strength"]++
        char["actions"]++
        char["hp"] += 5
        break
      case 'bard':
        if(char.name == 'Thom'){
          char["luck"] += 5
        }
        char["strength"]++
        char["dodge"] += 2
        char["magicRegen"] = 1
        char["magic"]++
        spell = 'vicious mockery'
        break
      case 'barbarian':
        if(char.name == 'Conan'){
          char["strength"] += 3
        }
        char["strength"] += 2
        char["physicalResistance"] += 5
        break
      case 'wizard':
        char["magic"] += 3
        char["magicRegen"] = 1
        if(char.name == 'Gandolf'){
          char["magicRegen"]++
        }
        spell = spellsService.findRandomLearnableSpell(char)
        break
      case 'cleric':
        if(char.name == 'Moraine'){
          char["magicResistance"] += 10
        }
        char["magic"]++
        char["hp"] += 5
        char["magicRegen"] = 1
        spell = 'light heal'
        break
      case 'fighter':
        if(char.name == 'Cloud'){
          char["hp"] += 15
        }
        char["strength"]++
        char["actions"]++
        break
      case 'monk':
        if(char.name == 'Lee'){
          char["actions"] += 2
        }
        char["strength"]++
        char["actions"]++
        char["physicalResistance"] += 10
        break
      case 'paladin':
        if(char.name == 'Kaladin'){
          char["thorns"] += 3
        }
        char["strength"]++
        char["magicRegen"] = 1
        char["magic"]++
        spell = 'sacred flame'
        break
      case 'warlock':
        char["magic"] += 3
        if(char.name == 'Grim'){
          char["lifeSteal"] += 10
        }
        char["magicRegen"] = 1
        spell = 'edritch blast'
        break
      default:
        char["classType"] = 'unknown'
        char[getRandomAbility()] += 3
        char[getRandomAbility()] += 3
        char["magicRegen"] = char.magic > 0 ? 1 : 0
        spell = char.magic > 0 ? spellsService.findRandomLearnableSpell(char) : false
        break
    }
    switch(char.race){
      case 'dragonborn':
        char["strength"] += 2
        //TODO breath attack
        break
      case 'human':
        char["strength"]++
        char["hp"] += 5
        break
      case 'elf':
        char["magic"] > 0 ? char["magic"]++ : char["dodge"] += 1
        char["actions"]++
        break
      case 'dwarf':
        char["hp"] += 5
        char["resistances"] = ["poison"]
        break
      case 'halfling':
        char["luck"] += 5
        break
      default:
        char["race"] = 'unknown'
        char[getRandomAbility()] += 3
        char[getRandomAbility()] += 3
        spell = char.magic > 0 ? spellsService.findRandomLearnableSpell(char) : false
        break
    }
    let newChar = new Character(char)
    if(spell){
      spellsService.learnSpell(spell, newChar)
    }
    $store.state.player.characters.push(newChar)
    gameService.addHealthPot()
    gameService.getRaceClassSpecificItem(newChar)
  }
  deleteCharacter(characterId){
    $store.state.player.characters = $store.state.player.characters.filter(c => c.id !== characterId)
  }
}
export const characterService = new CharacterService()