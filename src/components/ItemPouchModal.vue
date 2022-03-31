<template>
<div class="modal fade text-dark" id="itemPouchModal" tabindex="-1" role="dialog" aria-labelledby="itemPouchModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title container">
          <h5>Items</h5>
        </div>
      </div>
      <div class="modal-body container">
        <div class="row px-3">
          <ul class="col-4 d-flex flex-column" v-if="items.length > 0">
            <li :id="'item'+item.id" class="click" v-for="item in items" :key="item.id" :title="item.effect+' +'+item.value">{{item.name}}</li>
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

export default {
  name: 'ItemPouchModal',
  setup(){
    const state = reactive({
      items: computed(()=> $store.state.player.items),
    })
    return state
  },
  methods: {

  }
}
</script>

<style>
li{
  text-align: justify;
}
</style>