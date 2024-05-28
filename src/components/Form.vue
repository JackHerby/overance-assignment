<script setup lang="ts">
import { ref, computed } from 'vue'
import Toolbar from 'primevue/toolbar'
import Card from 'primevue/card'
import InlineMessage from 'primevue/inlinemessage'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const searchInput = ref('')

const getSearchInputBackground = computed(() =>
  inputFieldContainer.value.some(inputField => !!searchInput.value && inputField === searchInput.value)
)

const inputFieldContainer = ref<string[]>(['', '', ''])

const addInputField = (): void => {
  if (inputFieldContainer.value.length < 10) {
    inputFieldContainer.value.push('')
  }
}

const deleteInputField = (index: number): void => {
  if (inputFieldContainer.value.length > 1) {
    inputFieldContainer.value.splice(index, 1)
  }
}

const getNumberOfVowels = (text: string): number => {
  return text.split('').filter(char => 'aeiou'.includes(char.toLowerCase())).length
}

const getInputFieldBackground = (text: string): boolean => {
  return !!searchInput.value && text === searchInput.value
}
</script>

<template>
  <header class="w-full">
    <Toolbar :class="{ 'bg-green': getSearchInputBackground }">
      <template #center>
        <IconField iconPosition="left">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText placeholder="Search" v-model="searchInput" />
        </IconField>
      </template>
    </Toolbar>
  </header>
  <main class="card flex flex-column gap-3">
    <Card
      v-for="(text, index) in inputFieldContainer"
      :key="index"
      :class="{ 'bg-green': getInputFieldBackground(text) }"
    >
      <template #header>
        <InlineMessage severity="contrast"
          >Number of vowels: {{ getNumberOfVowels(text) }}</InlineMessage
        >
      </template>
      <template #content>
        <InputText placeholder="type something in... " v-model="inputFieldContainer[index]"/>
      </template>
      <template #footer>
        <Button @click="deleteInputField(index)">Delete field</Button>
      </template>
    </Card>
    <Button @click="addInputField">Add field</Button>
  </main>
</template>

<style scoped>
.bg-green {
  background: green;
}
</style>
