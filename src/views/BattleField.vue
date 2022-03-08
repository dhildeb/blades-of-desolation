<template>
  <div class="container vh-75">
    <div class="row justify-content-center h-50">
      <div class="col-2" v-for="monster in monsters" :key="monster.id">
        <div v-if="loot">
          <LootMonster :monster="monster" />
        </div>
        <div v-else>
          <EnemyMonster :monster="monster" />
        </div>
      </div>
    </div>
    <div class="row justify-content-center h-50">
      <div class="col-2" v-for="character in characters" :key="character.id">
        <CombatCharacter :character="character" />
      </div>
    </div>
  </div>
</template>

<script>
import EnemyMonster from '@/components/Monster'
import CombatCharacter from '@/components/CombatCharacter'
import LootMonster from '@/components/LootMonster'
import { reactive } from "@vue/reactivity"
import $store from '@/store/index.js'
import { computed, onMounted } from "@vue/runtime-core"
import { gameService } from "@/services/GameService"
import router from "@/router"
import Notify from "@/utils/Notify"


export default {
  name: 'BattleField',
  components: {
    EnemyMonster, CombatCharacter, LootMonster
  },
  watch: {
    charactersWithActions: function(){
      if(this.charactersWithActions == 0){
        gameService.determineTurn()
      }
    },
    charactersWithHp: function(){
      if(this.charactersWithHp == 0){
        router.push({name: 'shop'})
        Notify.toast('Your party is dead, revive or start over', 'error', 'top-center')
      }
    },
    monstersWithHp: function(){
      if(this.monstersWithHp == 0){
        this.loot = true
        Notify.toast('Victory!', 'success')
      }
    }
  },
  setup(){
    onMounted(()=>{
        if(state.charactersWithHp == 0){
          Notify.toast('You cannot battle without a party.', 'warning')
          router.push({name: 'shop'})
        }
    })
    const state = reactive({
      monsters: computed(()=> $store.state.monsters[1]),
      monstersWithHp: computed(()=> $store.state.monsters[1].filter(m => m.hp > 1)),
      characters: computed(()=> $store.state.player.characters),
      charactersWithActions: computed(()=> $store.state.player.characters.filter(c => c.actions > 0 ).length),
      charactersWithHp: computed(()=> $store.state.player.characters.filter(c => c.hp > 1)),
      loot: false
    })
    return state
  }
}
</script>

<style scoped>
.vh-75{
  height: 75vh;
}
</style>
