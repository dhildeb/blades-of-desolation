import { generateId } from "@/utils/generateId"

export class MonsterFactory {
  constructor(monsterData) {
    this.id = generateId()
    this.name = monsterData.name ?? 'unknown'
    this.classType = monsterData.classType ?? 'unknown'
    this.race = monsterData.race ?? 'unknown'
    this.img = monsterData.img
    this.spells = monsterData.spells ?? []
    this.equipment = monsterData.equipment ?? []
    this.dmgType = monsterData.dmgType ?? 'melee'
    this.hp = monsterData.hp ?? 5
    this.magic = monsterData.magic ?? 0
    this.luck = monsterData.luck ?? 0
    this.strength = monsterData.strength ?? 1
    this.dodge = monsterData.dodge ?? 0
    this.thorns = monsterData.thorns ?? 0
    this.actions = monsterData.actions ?? 1
    this.physicalResistance = monsterData.physicalResistance ?? 0
    this.magicResistance = monsterData.magicResistance ?? 0
    this.immunities = monsterData.immunities ?? []
    this.vulnerabilities = monsterData.vulnerabilities ?? []
    this.resistances = monsterData.resistances ?? []
    this.lifeSteal = monsterData.lifeSteal ?? 0
    this.regen = monsterData.regen ?? 0
    this.absorb = monsterData.absorb ?? ''
    this.buffs = []
    this.debuffs = []
    this.level = monsterData.level ?? 0
    this.loot = monsterData.loot ?? {gold: 0, items: []}
    this.exp = monsterData.exp ?? 50
    this.baseHp = this.hp
    this.baseStrength = this.strength
    this.baseDodge = this.dodge
    this.baseThorns = this.thorns
    this.baseActions = this.actions
    this.baseLifeSteal = this.lifeSteal
    this.baseLuck = this.luck
    this.baseMagic = this.magic
    this.basePhysicalResistance = this.physicalResistance
    this.baseMagicResistance = this.magicResistance
  }
}