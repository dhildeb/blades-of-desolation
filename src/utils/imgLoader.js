import $ from 'jquery'
export function getCharacterImgs(){
  let folder = "assets/characters/"
  let characterImgPaths = []
  $.ajax({
    url: folder,
    async: false,
    success: function(data){
      $(data).find("a").attr("href", function (i, val) {
        if( val.match(/\.(jpe?g|png|gif)$/) ) { 
            characterImgPaths.push(val)
        } 
    })
    }
  })
  return characterImgPaths
}
export function getMonsterImgs(){
  let folder = "assets/monsters/"
  let monsterImgPaths = []
  $.ajax({
    url: folder,
    async: false,
    success: function(data){
      $(data).find("a").attr("href", function (i, val) {
        if( val.match(/\.(jpe?g|png|gif)$/) ) { 
            monsterImgPaths.push(val)
        } 
    })
    }
  })
  return monsterImgPaths
}