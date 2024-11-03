<script setup lang="ts">
import {computed, ref, triggerRef} from "vue";
import {WORD_SIZE} from "@/constants";

const emit = defineEmits<{
  "guess:update": [guess: string]
}>()

const gussInProgress = ref<string | null>(null);

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
  emit("guess:update", formattedGussInProgress.value);
}

</script>

<template>
  <div>
    <input type="text"
           v-model="formattedGussInProgress"
           @keydown.enter="onSubmit"
    >
  </div>
</template>