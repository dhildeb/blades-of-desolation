class BuffService{
  removeBuff(target, buff){
    if(Array.isArray(target[buff.effect])){
      let index = target[buff.effect].findIndex(stat => stat == buff.value)
      target[buff.effect].splice(index, 1)
    }else if(typeof buff.value !== 'number'){
      target[buff.effect] = null
    }else{
      target[buff.effect] -= buff.value
    }
  }
  removeDebuff(target, debuff){
    if(Array.isArray(target[debuff.effect])){
      let index = target[debuff.effect].findIndex(stat => stat == debuff.value)
      target[debuff.effect].splice(index, 1)
    }else if(typeof debuff.value !== 'number'){
      target[debuff.effect] = debuff.value
    }else{
      target[debuff.effect] += debuff.value
    }
  }
}

export const buffService = new BuffService()