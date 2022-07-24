import { generateId } from "@/utils/generateId";

export class ItemReq{
  constructor(data){
    this.id = generateId()
    this.itemId = data.itemId
    this.reqId = data.reqId
  }
}