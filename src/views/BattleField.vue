<template>
  <div class="container">
    <div class="row justify-content-center align-items-center h-50 bg-battle-img" style="background-image: url('/assets/locations/lvl1-bg.jpg')">
      <div class="col-4 col-md-2" v-for="monster in monsters" :key="monster.id">
        <div v-if="monstersWithHp < 1">
          <LootMonster :monster="monster" />
        </div>
        <div v-else>
          <EnemyMonster :monster="monster" />
        </div>
      </div>
      <div v-if="monstersWithHp < 1">
        <button class="btn btn-warning" @click="adventureOn">Adventure On!</button>
      </div>
    </div>
    <div class="row justify-content-center h-50 bg-img" >
      <div class="col-4 col-md-2" v-for="character in characters" :key="character.id">
        <div v-if="character.inBattle">
          <CombatCharacter :character="character" />
        </div>
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
import { characterService } from "@/services/CharacterService"


export default {
  name: 'BattleField',
  components: {
    EnemyMonster, CombatCharacter, LootMonster
  },
  watch: {
    charactersWithActions: function(){
      if(this.charactersWithActions < 1 && this.characters.length > 0){
        characterService.endPhase()
      }
    },
    charactersWithHp: function(){
      if(this.characters.length < 1){
        router.push({name: 'MapLocation'})
        Notify.toast('You fled from battle', 'info', 'top-end')
      }else if(this.charactersWithHp < 1){
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
      characterService.enterBattle()
    })
    const state = reactive({
      monsters: computed(()=> $store.state.combatMonsters),
      characters: computed(()=> $store.state.player.characters.filter(c => c.inBattle)),
      monstersWithHp: computed(()=> state.monsters.filter(m => m.hp > 0).length),
      charactersWithActions: computed(()=> state.characters.filter(c => c.actions > 0 && c.hp > 0 ).length),
      charactersWithHp: computed(()=> state.characters.filter(c => c.hp > 0).length),
    })
    return state
  },
  methods:{
    adventureOn(){
      router.push({name: 'AreaLocation'})
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
.bg-battle-img{
  background-repeat: no-repeat;
  background-size: cover;
  background-position-y: bottom;
}
</style>
