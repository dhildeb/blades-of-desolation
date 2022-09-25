import { generateId } from "@/utils/generateId"

export class MonsterFactory {
  constructor(data) {
    this.id = generateId()
    this.name = data.name ?? 'unknown'
    this.classType = data.classType ?? 'unknown'
    this.race = data.race ?? 'unknown'
    this.img = data.img
    this.spells = data.spells ?? []
    this.equipment = data.equipment ?? []
    this.dmgType = data.dmgType ?? 'melee'
    this.hp = data.hp ?? 5
    this.magic = data.magic ?? 0
    this.luck = data.luck ?? 0
    this.strength = data.strength ?? 1
    this.dodge = data.dodge ?? 0
    this.thorns = data.thorns ?? 0
    this.actions = data.actions ?? 1
    this.physicalResistance = data.physicalResistance ?? 0
    this.magicResistance = data.magicResistance ?? 0
    this.immunities = data.immunities ?? []
    this.vulnerabilities = data.vulnerabilities ?? []
    this.resistances = data.resistances ?? []
    this.statusEffects = data.statusEffects ?? []
    this.lifeSteal = data.lifeSteal ?? 0
    this.regen = data.regen ?? 0
    this.absorb = data.absorb ?? ''
    this.buffs = []
    this.debuffs = []
    this.level = data.level ?? 0
    this.loot = data.loot ?? {gold: 0, items: []}
    this.exp = data.exp ?? 50
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
    this.abilities = data.abilities ?? []
  }
}