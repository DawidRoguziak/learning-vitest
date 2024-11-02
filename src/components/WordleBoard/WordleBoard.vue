<script setup lang="ts">
import { ref} from "vue";
import {LOST_MESSAGE, WIN_MESSAGE} from "@/constants";

defineProps<{
  wordOfTheDay: string
}>();

const inputValue= ref("");

defineModel("dupa", {
  set(v) {
    return v;
  },
  default: ''
})


</script>

<template>
  <div >
    <input type="text" v-model="inputValue">
    <p v-if="inputValue === wordOfTheDay">{{ WIN_MESSAGE }}</p>
    <p >{{ LOST_MESSAGE }}</p>
  </div>
</template>