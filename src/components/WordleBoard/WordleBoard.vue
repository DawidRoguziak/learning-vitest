<script setup lang="ts">
import { ref} from "vue";
import {WIN_MESSAGE} from "@/constants";

defineProps<{
  wordOfTheDay: string
}>();

const inputValue= ref("");


</script>

<template>
  <div >
    <input type="text" v-model="inputValue">
    <p v-if="inputValue === wordOfTheDay">{{ WIN_MESSAGE }}</p>
  </div>
</template>