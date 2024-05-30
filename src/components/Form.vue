<script setup lang="ts">
import { ref, computed } from 'vue'
import Toolbar from 'primevue/toolbar'
import Card from 'primevue/card'
import InlineMessage from 'primevue/inlinemessage'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

const searchInput = ref('')

const getSearchInputBackground = computed(() =>
  inputFieldContainer.value.some(
    inputField => !!searchInput.value && inputField === searchInput.value
  )
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
  return !!searchInput.value && text.includes(searchInput.value)
}
</script>

<template>
  <header>
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
  <main class="container">
    <Card
      v-for="(text, index) in inputFieldContainer"
      :key="index"
      :class="{ 'bg-green': getInputFieldBackground(text) }"
      pt:content:style="display: flex; align-items: center;"
    >
      <template #content>
        <InputText placeholder="type something in... " v-model="inputFieldContainer[index]" />
        <InlineMessage severity="secondary">vowels: {{ getNumberOfVowels(text) }}</InlineMessage>
      </template>
      <template #footer>
        <Button @click="deleteInputField(index)">Delete field</Button>
      </template>
    </Card>
    <Button class="add-button" @click="addInputField">Add field</Button>
  </main>
</template>

<style scoped>
.bg-green {
  background: var(--green-600) !important;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  gap: 2rem;
}

.p-toolbar {
  background: var(--bluegray-700);
  margin-bottom: 2rem;
}

.p-card {
  background: var(--bluegray-700);
}

.p-inputtext {
  margin-right: 1rem;
}

.add-button {
  margin-bottom: 3rem;
}
</style>
