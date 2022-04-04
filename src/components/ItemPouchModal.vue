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
          <ul v-if="items.length > 0">
            <li :id="'item'+item.id" class="click d-flex" :class="getRarityFullName(item.rarity)" v-for="item in items" :key="item.id" :title="item.effect+' +'+item.value">
              {{item.name}} - 
                <div v-if="typeof item.value == 'array'">
                <span v-for="effect in item.effect" :key="effect">
                   &nbsp;{{effect}}&nbsp;+
                  </span>
                </div>
                <div v-else>
                  <span>&nbsp;{{item.effect}}&nbsp;+</span>
                </div>
                <div v-if="typeof item.value == 'array'">
                  <span v-for="index in item.value" :key="index">+{{item.value[index]}}</span>
                </div>
                <div v-else>
                  <span>{{item.value}}</span>
                </div>
                &nbsp;({{item.type}})&nbsp;
                <div v-if="item?.requirements">
                  <span v-for="req in item.requirments" :key="req">
                    {{req}}
                  </span>
                </div>
              </li>
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
import { getRarityFullName } from "@/utils/getRarityFullName"

export default {
  name: 'ItemPouchModal',
  setup(){
    const state = reactive({
      items: computed(()=> $store.state.player.items),
    })
    return state
  },
  methods: {
    getRarityFullName : getRarityFullName
  }
}
</script>

<style>
li{
  text-align: justify;
}
</style>