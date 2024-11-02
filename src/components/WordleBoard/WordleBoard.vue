<script setup lang="ts">
import { ref} from "vue";
import {LOST_MESSAGE, WIN_MESSAGE} from "@/constants";

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => value.length === 5 && value.toUpperCase() === value
  }
});

const gussInProgress= ref("");
const gussSubmitted= ref("");


</script>

<template>
  <div >
    <input type="text" v-model="gussInProgress" @keydown.enter="gussSubmitted = gussInProgress">
    <p v-if="gussSubmitted.length > 0" v-text="gussSubmitted === wordOfTheDay ? WIN_MESSAGE : LOST_MESSAGE"></p>
  </div>
</template>