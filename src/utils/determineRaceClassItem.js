import { itemsService } from "@/services/ItemsService"
export function determineRaceClassItem(race, classType){
    let itemName = ''
    let rand = Math.floor(Math.random()*3)
    switch(race){
        case 'human':
            switch(classType){
                case 'rogue':
                    itemName = 'dagger'
                break 
                case 'ranger':
                    itemName = 'shortbow'
                break
                case 'barbarian':
                    itemName = 'handaxe'
                break
                case 'bard':
                    itemName = 'robe'
                break
                case 'wizard':
                    itemName = 'wand'
                break
                case 'cleric':
                    itemName = 'cape'
                break
                case 'fighter':
                    itemName = 'shortsword'
                break
                case 'monk':
                    itemName = 'quarterstaff'
                break
                case 'paladin':
                    itemName = 'padded armor'
                break
                case 'warlock':
                    itemName = 'bone wand'
                break
                default:
                    itemName = itemsService.findRandomItem().name
                break
            }
        break
        case 'dragonborn':
            switch(classType){
                case 'rogue':
                    itemName = 'fang'
                break 
                case 'ranger':
                    itemName = 'hunters knife'
                break
                case 'barbarian':
                    itemName = 'battleaxe'
                break
                case 'bard':
                    itemName = 'belt of tricks'
                break
                case 'wizard':
                    itemName = 'focus orb'
                break
                case 'cleric':
                    itemName = 'cloak of winters'
                break
                case 'fighter':
                    itemName = 'bastardsword'
                break
                case 'monk':
                    itemName = 'handbands'
                break
                case 'paladin':
                    itemName = 'spiked armor'
                break
                case 'warlock':
                    itemName = 'orb of darkness'
                break
                default:
                    itemName = itemsService.findRandomItem().name
                break
            }
        break
        case 'elf':
            switch(classType){
                case 'rogue':
                    itemName = 'hand crossbow'
                break 
                case 'ranger':
                    itemName = 'longbow'
                break
                case 'barbarian':
                    itemName = 'longsword'
                break
                case 'bard':
                    itemName = 'loot'
                break
                case 'wizard':
                    itemName = 'unstable orb'
                break
                case 'cleric':
                    itemName = 'gold ring'
                break
                case 'fighter':
                    itemName = 'scimitar'
                break
                case 'monk':
                    itemName = 'spear'
                break
                case 'paladin':
                    itemName = 'shield'
                break
                case 'warlock':
                    itemName = 'cloak of darkness'
                break
                default:
                    itemName = itemsService.findRandomItem().name
                break
            }
        break
        case 'dwarf':
            switch(classType){
                case 'rogue':
                    itemName = 'darts'
                break 
                case 'ranger':
                    itemName = 'light crossbow'
                break
                case 'barbarian':
                    itemName = 'morningstar'
                break
                case 'bard':
                    itemName = 'lyre'
                break
                case 'wizard':
                    itemName = 'cloak'
                break
                case 'cleric':
                    itemName = 'holy symbol'
                break
                case 'fighter':
                    itemName = 'warhammer'
                break
                case 'monk':
                    itemName = 'hooded robe'
                break
                case 'paladin':
                    itemName = 'helm'
                break
                case 'warlock':
                    itemName = 'skull armor'
                break
                default:
                    itemName = itemsService.findRandomItem().name
                break
            }
        break
        case 'halfling':
            switch(classType){
                case 'rogue':
                    itemName = 'dagger'
                break 
                case 'ranger':
                    itemName = 'bracers of archery'
                break
                case 'barbarian':
                    itemName = 'bracers of defense'
                break
                case 'bard':
                    itemName = 'luckstone'
                break
                case 'wizard':
                    itemName = 'wand +1'
                break
                case 'cleric':
                    itemName = 'ring of light'
                break
                case 'fighter':
                    itemName = 'scimitar'
                break
                case 'monk':
                    itemName = 'ring of soft'
                break
                case 'paladin':
                    itemName = 'adamantine armor'
                break
                case 'warlock':
                    itemName = 'deaths '+ (rand == 0 ? 'touch' : rand == 1 ? 'guard' : 'hand')
                break
                default:
                    itemName = itemsService.findRandomItem().name
                break
            }
        break
        default:
            itemName = itemsService.findRandomItem().name
        break
    }
    console.log(itemName)
    return itemName
}