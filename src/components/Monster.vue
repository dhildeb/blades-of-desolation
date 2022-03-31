<template>
  <HpBar :hp="monster.hp" :baseHp="monster.baseHp" />
<div>
  <h3 class="d-none text-danger position-absolute hit" :id="'hit'+monster.id">{{hit}}</h3>
  <img :id="'monster'+monster.id" v-if="monster.hp > 0" class="img-fluid monster-img" @click="attackMonster(monster)" :src="monster.img" />
  <img v-else class="img-fluid monster-img" :src="deadImg" />
</div>
</template>

<script>
import { reactive } from "@vue/reactivity"
import HpBar from "./HpBar.vue"
import { battleService } from "@/services/BattleService"
import { characterService } from "@/services/CharacterService"
import { computed, onMounted } from "@vue/runtime-core"
import $store from "@/store/index"
import 'animate.css'
import { animationsService } from "@/services/AnimationsService"

export default {
  components: { HpBar },
  name: 'EnemyMonster',
  props: {
    monster: {type: Object}
  },
  watch: {
    monsterHp: function(){
      this.hit = this.monsterHp - this.monsterPreHp
      this.monsterPreHp = this.monsterHp
      console.log(this)
      animationsService.fadeOutUp('hit'+this.monster.id)
      console.log(this.monsterHp)
    }
  },
  setup(props){
    onMounted(()=> {
        state.monsterPreHp = props.monster.hp
        characterService.autoSelect()
      })
    const state = reactive({
      deadImg: 'https://firebasestorage.googleapis.com/v0/b/game-pics.appspot.com/o/monsters%2Fdead.png?alt=media&token=028e4092-cca1-42d5-a38f-99c60d034904',
      monsterHp: computed(() => $store.state.combatMonsters.filter(m => m.id == props.monster.id)[0].hp),
      monsterPreHp: 0,
      hit: ''
    })
    return state
  },
  methods: {
    attackMonster(monster){
      animationsService.shake('monster'+monster.id)
      battleService.handleAttack(this.$store.state.selected, monster)
      characterService.autoSelect()
    }
  }
}
</script>

<style scoped>
.monster-img{
  height: 20vh;
}
.hit{
  left: 75%
}
</style>
