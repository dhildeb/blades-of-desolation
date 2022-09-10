import { generateId } from "@/utils/generateId"
import { getDmgTypeIcon } from "@/utils/getIcon"
import $ from 'jquery'
class AnimationsService{
  shake(id){
    let charImgElem = $('#'+id)
    new Promise((resolve) => {
      charImgElem.addClass('animate__animated animate__headShake')
      function handleAnimationEnd(e){
        e.stopPropagation()
        charImgElem.removeClass('animate__animated animate__headShake')
        resolve('Animation ended')
      }
      charImgElem.on('animationend', handleAnimationEnd)
    })
  }
  pounce(id){
    let charImgElem = $('#'+id)
    new Promise((resolve) => {
      charImgElem.addClass('animate__animated animate__tada')
      function handleAnimationEnd(e){
        e.stopPropagation()
        charImgElem.removeClass('animate__animated animate__tada')
        resolve('Animation ended')
      }
      charImgElem.on('animationend', handleAnimationEnd)
    })
  }
  fadeOutUp(id, dmg, operator, dmgType = ''){
    let elem = $('#'+id)
    let tempId = generateId()
    let icon = getDmgTypeIcon(dmgType)
    elem.append('<h3 id="'+tempId+'" class="position-absolute d-flex">'+operator+dmg+icon+'</h3>')
    elem = $('#'+tempId)
    new Promise((resolve) => {
      elem.addClass(operator == '-' ? 'text-danger' : 'text-success')
      elem.addClass('animate__slower animate__animated animate__fadeOutUp '+operator)
      function handleAnimationEnd(e){
        e.stopPropagation()
        elem.remove()
        resolve('Animation ended')
      }
      elem.on('animationend', handleAnimationEnd)
    })

  }
}

export const animationsService = new AnimationsService()