import $store from '@/store/index.js'

class ItemReqService{

  getReqsByItemName(itemName){
    let reqs = $store.state.itemReqs.filter(ir => ir.itemName == itemName)
    return reqs
  }
  getReqsDisplay(itemName){
    let reqs = this.getReqsByItemName(itemName)
    let display = 'Requires '

    reqs.foreach(r => display += r.stat.replace(/([A-Z])/g, " $1")+' to be '+r.req)
    return display
  }
  checkCharacterMeetsReqs(char, itemName){
    let reqs = this.getReqsByItemName(itemName)
    let pass = true
    reqs.foreach(r => {
      if(Array.isArray(r.req)){
        let match = false
        r.req.foreach(rr => {
          if(this.evalulateReq(rr, char)){
            match = true
          }
        })
        if(!match){
          pass = false
        }
      }else{
        if(!this.evalulateReq(r, char)){
          pass = false
        }
      }
      return pass
    })
  }
  evalulateReq(r, char){
    let pass = true
    if(typeof r.req == 'string' && char[r.stat] != r.req){
      pass = false
    }
    if(typeof r.req == 'number' && char[r.stat] < r.req){
      pass = false
    }
    return pass
  }
}

export const itemReqService = new ItemReqService()