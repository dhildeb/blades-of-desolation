<template>
<div class="modal fade text-dark" id="questModal" tabindex="-1" role="dialog" aria-labelledby="questModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <div class="modal-title container">
          <h5>Quest</h5>
            <button type="button" class="close text-danger" data-dismiss="modal" aria-label="Close" @click="deleteQuest" title="Delete Quest">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      </div>
      <div class="modal-body container">
        <div class="row justify-content-center">
          <div class="col-12 px-3">
            {{quest.objective}} {{quest.target}}{{quest.goal > 0 ? '\'s' : ''}}
          </div>
          <div class="col-12">
            Reward: {{quest.reward}} {{quest.objective == 'explore' ? 'EXP' : quest.objective == 'kill' ? 'Gold' : ''}}
          </div>
          <span class="border-top p-3">
            {{quest.goal > 1 ? Math.round((quest.progress/quest.goal)*100)+'%' : quest.progress != 'complete' ? 'Not' : ''}} Complete
          </span>
        </div>
        <button class="btn btn-outline-success" @click="completeQuest" v-if="this.$route.name == 'MainShop' && (quest.progress >= quest.goal || quest.progress == 'complete')">Complete Quest</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import { computed } from "@vue/runtime-core"
import $store from "@/store/index"
import { questService } from "@/services/QuestService"
import Notify from "@/utils/Notify"

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
    completeQuest(){
      questService.completeQuest()
    },
    async deleteQuest(){
      if(await Notify.confirm('Give up on Quest', 'Quest too tough for you, huh?')){
        questService.deleteQuest()
      }
    }
  }
}
</script>

<style>
li{
  text-align: justify;
}
</style>