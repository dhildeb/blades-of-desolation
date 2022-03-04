<template>
  <transition
    :enter-active-class="enterActiveClass"
    leave-active-class=""
    :mode="mode">
    <slot></slot>
  </transition>
<!-- put in template to use -->

    <!-- <router-view v-slot="{ Component }">
    <AnimatedTransition :name="route.meta.transition">
      <component :is="Component" />
    </AnimatedTransition>
  </router-view> -->
</template>

<script>
export default {
  props: {
  name:{
    type: String,
    default: '',
    },
    mode: {
      type: String,
      default: 'out-in',
    }
  },
  computed: {
    enterActiveClass(){
      let animate = ''
      switch(this.name){
        case "bounce-left":
          animate = "animate__animate animate__bounceInRight";
          break
        case "bounce-righ":
          animate = "animate__animate animate__bounceInLeft";
          break
        case "bounce-down":
          animate = "animate__animate animate__bounceInDown";
          break
        case "zoom-down":
          animate = "animate__animate animate__ZoomInDown";
          break
        case "bounce":
          animate = "animate__animate animate__bounce";
          break
      }
      return animate
    }
  }
}
</script>

<style>
.animate__animated.animate__bounce {
  --animate-duration: 2s;
}

/* This changes all the animations globally */
:root {
  --animate-duration: 800ms;
  --animate-delay: 0.9s;
}
</style>