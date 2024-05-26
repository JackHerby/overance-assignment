<script setup lang="ts">
import { ref } from 'vue'
import Card from 'primevue/card'
import InlineMessage from 'primevue/inlinemessage'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const inputFieldContainer = ref<{ text: string }[]>([{ text: '' }, { text: '' }, { text: '' }])

const addInputField = (): void => {
  if (inputFieldContainer.value.length > 9) {
    return
  }
  inputFieldContainer.value.push({ text: '' })
}

const deleteInputField = (index: number): void => {
  if (inputFieldContainer.value.length < 2) {
    return
  }
  inputFieldContainer.value.splice(index, 1)
}

const getNumberOfVowels = (index: number): number => {
  let numberOfVowels = 0
  const textByIndex = inputFieldContainer.value[index].text
  const vowels: string[] = ['a', 'e', 'u', 'o', 'i']
  for (let i = 0; i < textByIndex.length; i++) {
    if (vowels.includes(textByIndex[i])) {
      numberOfVowels++
    }
  }
  return numberOfVowels
}
</script>

<template>
  <main class="card flex flex-column gap-3">
    <Card v-for="(card, index) in inputFieldContainer" :key="index">
      <template #header>
        <InlineMessage severity="contrast">Number of vowels: {{ getNumberOfVowels(index) }}</InlineMessage>
      </template>
      <template #content>
        <InputText placeholder="type something in... " v-model="card.text" />
      </template>
      <template #footer>
        <Button @click="deleteInputField(index)">Delete field</Button>
      </template>
    </Card>
    <Button @click="addInputField">Add field</Button>
  </main>
</template>
