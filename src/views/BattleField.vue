<template>
  <div class="container vh-75">
    <div class="row justify-content-center h-50">
      <div class="col-4 col-md-2" v-for="monster in monsters" :key="monster.id">
        <div v-if="monstersWithHp < 1">
          <LootMonster :monster="monster" />
        </div>
        <div v-else>
          <EnemyMonster :monster="monster" />
        </div>
      </div>
      <div v-if="monstersWithHp < 1">
        <button class="btn btn-primary" @click="spawnMonsters">Battle on!</button>
      </div>
    </div>
    <div class="row justify-content-center h-50">
      <div class="col-4 col-md-2" v-for="character in characters" :key="character.id">
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
      if(this.charactersWithActions < 1){
        gameService.determineTurn()
      }
    },
    charactersWithHp: function(){
      if(this.charactersWithHp < 1){
        router.push({name: 'CharacterForm'})
        Notify.toast('Your party is dead, revive or start over', 'error', 'top-end')
      }
    },
    monstersWithHp: function(){
      if(this.monstersWithHp < 1 && this.charactersWithHp > 0){
        gameService.victory()
        Notify.toast('Victory!', 'success')
      }
    }
  },
  setup(){
    onMounted(()=>{
      gameService.spawnMonsters()
    })
    const state = reactive({
      monsters: computed(()=> $store.state.combatMonsters),
      characters: computed(()=> $store.state.player.characters),
      monstersWithHp: computed(()=> state.monsters.filter(m => m.hp > 0).length),
      charactersWithActions: computed(()=> state.characters.filter(c => c.actions > 0 && c.hp > 0 ).length),
      charactersWithHp: computed(()=> state.characters.filter(c => c.hp > 0).length),
    })
    return state
  },
  methods:{
    spawnMonsters(){
      gameService.spawnMonsters()
    }
  },
    beforeRouteLeave(){
      if(this.charactersWithHp > 0){
        if(this.monstersWithHp > 0){
          Notify.toast('Can\'t flee from battle.', 'info')
          return false
        }
      }
        this.$store.commit('bringOutYourDead')
    }
}
</script>

<style scoped>
.vh-75{
  height: 75vh;
}
</style>
