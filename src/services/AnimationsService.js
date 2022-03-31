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
  fadeOutUp(id){
    let elem = $('#'+id)
    new Promise((resolve) => {
      elem.removeClass('d-none')
      elem.addClass('animate__animated animate__fadeOutUp')
      function handleAnimationEnd(e){
        e.stopPropagation()
        elem.removeClass('animate__animated animate__fadeOutUp')
        elem.addClass('d-none')
        resolve('Animation ended')
      }
      elem.on('animationend', handleAnimationEnd)
    })

  }
}

export const animationsService = new AnimationsService()