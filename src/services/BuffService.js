class BuffService{
  removeBuff(target, buff){
    if(Array.isArray(target[buff.effect])){
      target[buff.effect] = target[buff.effect].filter(t => t != buff.value)
    }else if(typeof buff.value !== 'number'){
      target[buff.effect] = null
    }else{
      target[buff.effect] -= buff.value
    }
  }
  removeDebuff(target, debuff){
    if(Array.isArray(target[debuff.effect])){
      target[debuff.effect].push(debuff.value)
    }else if(typeof debuff.value !== 'number'){
      target[debuff.effect] = debuff.value
    }else{
      target[debuff.effect] += debuff.value
    }
  }
}

export const buffService = new BuffService()