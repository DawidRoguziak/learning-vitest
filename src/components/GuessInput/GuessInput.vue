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
    <ul>
      <li v-for="(letter, index) in formattedGussInProgress.padEnd(WORD_SIZE, '')"
          :key="`${letter}-${index}`"
          :data-letter="letter"
      >
        {{ letter }}
      </li>
    </ul>
    <input type="text"
           autofocus
           :maxlength="WORD_SIZE"
           @blur="({target}) => (target as HTMLInputElement).focus()"
           v-model="formattedGussInProgress"
           @keydown.enter="onSubmit"
    >
  </div>
</template>

<style scoped>
input {
  position: absolute;
  opacity: 0;
}

.ul {}

li {

}
</style>