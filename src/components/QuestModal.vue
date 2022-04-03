<template>
<div class="modal fade text-dark" id="questModal" tabindex="-1" role="dialog" aria-labelledby="questModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title container">
          <h5>Quest</h5>
        </div>
      </div>
      <div class="modal-body container">
        {{kills[quest.target]}}
        <div class="row px-3 justify-content-center">
          {{quest.objective}} {{quest.goal > 0 ? quest.goal - (kills[quest.target] ?? 0) : ''}} {{quest.target}}{{quest.goal > 0 ? '\'s' : ''}}
        </div>
        <div class="row justify-content-center">
          Reward: {{quest.reward}}
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
  name: 'QuestModal',
  setup(){
    const state = reactive({
      quest: computed(()=> $store.state.player.quest),
      kills: computed(()=> $store.state.player.kills)
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