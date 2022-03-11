import { generateId } from "@/utils/generateId"

export class MonsterFactory {
  constructor(monsterData) {
    this.id = generateId()
    this.name = monsterData.name ?? 'unknown'
    this.classType = monsterData.classType ?? 'unknown'
    this.race = monsterData.race ?? 'unknown'
    this.spells = monsterData.spells ?? []
    this.equipment = monsterData.equipment ?? []
    this.dmgType = monsterData.dmgType ?? ''
    this.hp = monsterData.hp ?? 5
    this.magic = monsterData.magic ?? 0
    this.luck = monsterData.luck ?? 0
    this.strength = monsterData.strength ?? 1
    this.dodge = monsterData.dodge ?? 0
    this.thorns = monsterData.thorns ?? 0
    this.actions = monsterData.actions ?? 1
    this.lifeDrain = monsterData.lifeDrain ?? 0
    this.absorb = monsterData.absorb ?? ''
    this.level = monsterData.level ?? 1
    this.loot = monsterData.loot ?? {gold: 0, items: []}
    this.baseHp = this.hp
    this.baseStrength = this.strength
    this.baseDodge = this.dodge
    this.baseThorns = this.thorns
    this.baseActions = this.actions
    this.baseLifeDrain = this.lifeDrain
    this.baseLuck = this.luck
    this.baseMagic = this.magic
  }
  getRandomAbility() {
    let random = Math.floor(Math.random() * 9)
    let stats = ['hp', 'strength', 'dodge', 'thorns', 'dodge', 'thorns', 'actions', 'lifeDrain', 'luck', 'magic']
    return stats[random]
  }
}