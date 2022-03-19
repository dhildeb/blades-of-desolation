<template>
<div class="modal fade text-dark" id="itemPouchModal" tabindex="-1" role="dialog" aria-labelledby="itemPouchModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title container">
          <h5>Items</h5>
          <select style="width: 280px" v-model="equipCharId">
            <option class="custom-select" selected="" disabled>Select Character to Equip Items to</option>
            <option :value="character.id" v-for="character in characters" :key="character.id">{{character.name}}</option>
          </select>
        </div>
      </div>
      <div class="modal-body container">
        <div class="row px-3">
          <ul class="col-4 d-flex flex-column" v-if="items.length > 0">
            <li class="click" v-for="item in items" :key="item.id" @click="equip(item)">{{item.name}}</li>
          </ul>
          <p v-else>No items in pouch</p>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from "@/store/index"
import { itemsService } from "@/services/ItemsService"
import Notify from "@/utils/Notify"
export default {
  name: 'ItemPouchModal',
  setup(){
    const state = reactive({
      items: computed(()=> $store.state.player.items),
      equipCharId: '',
      characters: computed(()=> $store.state.player.characters)
    })
    return state
  },
  methods: {
    equip(item){
      if(!this.equipCharId){
        Notify.toast('Select a character to equip item', 'info')
        return
      }
      let character = this.$store.state.player.characters.filter(c => c.id == this.equipCharId)
      itemsService.equipItem(character[0], item)
    }
  }
}
</script>

<style>
li{
  text-align: justify;
}
</style>