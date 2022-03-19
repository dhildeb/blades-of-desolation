import $ from 'jquery'
class AnimationsSErvice{
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
}

export const animationsSErvice = new AnimationsSErvice()