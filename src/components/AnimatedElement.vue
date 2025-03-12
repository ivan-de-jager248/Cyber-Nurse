<template>
  <div ref="elementRef">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';

// Define a type for allowed animation values
type AnimationType = 'fade' | 'slide-up' | 'slide-left' | 'slide-right' | 'zoom';

const props = defineProps({
  animation: {
    type: String,
    default: 'fade',
    validator: (value: string) => ['fade', 'slide-up', 'slide-left', 'slide-right', 'zoom'].includes(value)
  },
  duration: {
    type: Number,
    default: 0.8
  },
  delay: {
    type: Number,
    default: 0
  },
  triggerOnScroll: {
    type: Boolean,
    default: false
  }
});

const elementRef = ref<HTMLElement | null>(null);
let scrollTrigger: any = null;

onMounted(async () => {
  if (!elementRef.value) return;
  
  // Dynamically import GSAP only on the client side
  const gsapModule = await import('gsap');
  const gsap = gsapModule.default || gsapModule.gsap;
  
  // Dynamically import ScrollTrigger
  const scrollTriggerModule = await import('gsap/ScrollTrigger');
  const ScrollTrigger = scrollTriggerModule.ScrollTrigger;
  
  // Register the plugin
  gsap.registerPlugin(ScrollTrigger);
  
  // Define animation starting points and ending points separately
  const animationProps = {
    'fade': { opacity: 0 },
    'slide-up': { opacity: 0, y: 50 },
    'slide-left': { opacity: 0, x: 50 },
    'slide-right': { opacity: 0, x: -50 },
    'zoom': { opacity: 0, scale: 0.8 }
  };
  
  // Define the end states for each animation
  const endStates = {
    'fade': { opacity: 1 },
    'slide-up': { opacity: 1, y: 0 },
    'slide-left': { opacity: 1, x: 0 },
    'slide-right': { opacity: 1, x: 0 },
    'zoom': { opacity: 1, scale: 1 }
  };
  
  // Use type assertion to tell TypeScript that props.animation is a valid key
  const animation = props.animation as AnimationType;
  const startProps = animationProps[animation];
  const endProps = endStates[animation];
  
  if (props.triggerOnScroll) {
    // Set initial state
    gsap.set(elementRef.value, startProps);
    
    scrollTrigger = ScrollTrigger.create({
      trigger: elementRef.value,
      start: "top bottom-=100px",
      onEnter: () => gsap.to(elementRef.value, { 
        ...endProps, 
        duration: props.duration,
        delay: props.delay 
      }),
    });
  } else {
    // For immediate animations (not scroll-triggered)
    gsap.fromTo(elementRef.value, 
      startProps, 
      {
        ...endProps,
        duration: props.duration,
        delay: props.delay
      }
    );
  }
});

onBeforeUnmount(() => {
  if (scrollTrigger && scrollTrigger.kill) {
    scrollTrigger.kill();
  }
});
</script>