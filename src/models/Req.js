import { generateId } from "@/utils/generateId";

export class Req{
  constructor(data){
    this.id = data.id ?? generateId()
    //stat is attribute we are assessing ex. strength
    this.stat = data.stat
    //req is the requirement/value ex. 3
    this.req = data.req
  }
}