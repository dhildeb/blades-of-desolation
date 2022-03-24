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
            <li :id="'item'+item.id" class="click" :class="getStatDiff(item) > 0 ? 'text-success' : 'text-danger'" v-for="item in items" :key="item.id" @click="equip(item)" :title="item.effect+' +'+item.value">{{item.name}} {{getStatDiff(item) > 0 ? '+' : ''}}{{getStatDiff(item)}}</li>
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
import $ from 'jquery'

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
    },
    getStatDiff(item){
      let char = this.$store.state.player.characters.filter(c => c.id == $('option:selected').val())
      if(char.length < 1){
        return
      }
      let statDiff = 0
      let openSlot = true
      char[0].equipment.forEach(e => {
        if(e.type == item.type){
          statDiff = e.value - item.value
          openSlot = false
        }
      })
      return openSlot ? item.value : statDiff
    }
  }
}
</script>

<style>
li{
  text-align: justify;
}
</style>