<script setup lang="ts">
import {computed, ref, triggerRef} from "vue";
import {LOST_MESSAGE, WIN_MESSAGE, WORD_SIZE} from "@/constants";

defineProps({
  wordOfTheDay: {
    type: String,
    validator: (value: string) => value.length === 5 && value.toUpperCase() === value
  }
});

const gussInProgress = ref<string | null>(null);
const gussSubmitted = ref("");

const formattedGussInProgress = computed<string>({
  get() {
   return gussInProgress.value ?? ""
  },
  set(value: string) {
    gussInProgress.value = null;
    gussInProgress.value = value.slice(0, WORD_SIZE)
        .toUpperCase()
        .replace(/[^A-Z]/gi, "");

    triggerRef(formattedGussInProgress);
  }
});

function onSubmit() {
  gussSubmitted.value = formattedGussInProgress.value;
}

</script>

<template>
  <div>
    <input type="text"
           v-model="formattedGussInProgress"
           @keydown.enter="onSubmit"
    >
    <p v-if="gussSubmitted.length > 0" v-text="gussSubmitted === wordOfTheDay ? WIN_MESSAGE : LOST_MESSAGE"></p>
  </div>
</template>