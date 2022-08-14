import { generateId } from "@/utils/generateId"

export class Spell {
  constructor(data) {
    this.id = generateId()
    this.name = data.name
    this.level = data.level ?? 1
    this.speed = data.speed ?? Math.ceil(data.level / 2) < 2 ? 2 : Math.ceil(data.level / 2)
    this.cost = data.cost ?? 1
    this.dmgType = data.dmgType ?? 'magic'
    this.strength = data.strength
    this.areaEffect = data.areaEffect ?? false
    this.effect = data.effect ?? []
    this.value = data.value ?? []
    this.buff = data.buff ?? false
    this.temp = data.temp ?? false
    this.title = data.title ?? null
    this.reqs = data.reqs ?? {}
  }
  getTitle() {
    let title = ''
    if (this.strength) {
      title = this.strength + ' ' + this.dmgType + ' dmg'
    } else {
      title = this.buff ? '+' : '-'
      title += this.value + ' ' + this.effect
    }
    title += this.areaEffect ? ' (Mass effect)' : ''
    return title
  }
}