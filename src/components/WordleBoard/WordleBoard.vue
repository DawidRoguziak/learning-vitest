<script setup lang="ts">
import {ref} from "vue";
import {LOST_MESSAGE, WIN_MESSAGE } from "@/constants";
import GuessInput from "@/components/GuessInput/GuessInput.vue";

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => value.length === 5 && value.toUpperCase() === value
  }
});

const gussSubmitted = ref("");

</script>

<template>
  <div>
    <GuessInput @guess:update="guess => gussSubmitted = guess" ></GuessInput>
    <p v-if="gussSubmitted.length > 0" v-text="gussSubmitted === wordOfTheDay ? WIN_MESSAGE : LOST_MESSAGE"></p>
  </div>
</template>