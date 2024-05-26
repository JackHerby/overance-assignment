<script setup lang="ts">
import Toolbar from 'primevue/toolbar'
import InputText from 'primevue/inputtext'
</script>

<template>
  <header class="w-full">
    <Toolbar>
      <template #center>
        <IconField iconPosition="left">
          <InputIcon>
            <i class="pi pi-search" />
          </InputIcon>
          <InputText placeholder="Search" />
        </IconField>
      </template>
    </Toolbar>
  </header>
</template>
