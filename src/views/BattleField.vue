<template>
  <div class="container">
    <div class="row justify-content-center align-items-center h-50 bg-battle-img" :style="'background-image: url('+bgImg+')'">
      <div class="col-4 col-md-2" v-for="monster in monsters" :key="monster.id">
        <div class="position-absolute hit" :id="'hit'+monster.id"></div>
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
import { characterService } from "@/services/CharacterService"
import { useToast } from "vue-toastification"


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
      const toast = useToast()
      if(this.characters.length < 1){
        router.push({name: 'MapLocation'})
        toast.success('You fled from battle')
      }else if(this.charactersWithHp < 1){
        router.push({name: 'CharacterForm'})
        toast.error('Your party is dead, revive or start over')
      }
    },
    monstersWithHp: function(){
      const toast = useToast()
      if(this.monstersWithHp < 1 && this.charactersWithHp > 0){
        gameService.victory()
        toast.success('Victory!')
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
      bgImg: computed(()=> $store.state.locationImgList.find(l => l.includes('lvl'+($store.state.location+1)+'-bg')))
    })
    return state
  },
  methods:{
    adventureOn(){
      router.push({name: 'AreaLocation'})
    }
  },
    beforeRouteLeave(){
      const toast = useToast()
      if(this.charactersWithHp > 0){
        if(this.monstersWithHp > 0){
          toast.warning('Can\'t flee from battle.')
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
