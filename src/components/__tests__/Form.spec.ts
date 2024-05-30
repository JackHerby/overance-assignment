import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from '../Form.vue'
import PrimeVue from 'primevue/config'
import InputText from 'primevue/inputtext'
import Card from 'primevue/card'
import Button from 'primevue/button'
import InlineMessage from 'primevue/inlinemessage'
import InputIcon from 'primevue/inputicon'
import IconField from 'primevue/iconfield'

const globalConfig = {
  global: {
    plugins: [PrimeVue],
    components: {
      InputText,
      Card,
      Button,
      InlineMessage,
      InputIcon,
      IconField
    }
  }
}

describe('Form', () => {
  it('renders the component correctly', () => {
    const wrapper = mount(Form, globalConfig)
    expect(wrapper.exists()).toBe(true)
  })

  it('adds an input field when the "Add field" button is clicked', async () => {
    const wrapper = mount(Form, globalConfig)
    const initialInputFields = wrapper.findAll('.p-card').length
    await wrapper.find('.add-button').trigger('click')
    const updatedInputFields = wrapper.findAll('.p-card').length
    expect(updatedInputFields).toBe(initialInputFields + 1)
  })

  it('deletes an input field when the "Delete field" button is clicked', async () => {
    const wrapper = mount(Form, globalConfig)
    const initialInputFields = wrapper.findAll('.p-card').length
    await wrapper.find('.p-card .p-button').trigger('click')
    const updatedInputFields = wrapper.findAll('.p-card').length
    expect(updatedInputFields).toBe(initialInputFields - 1)
  })

  it('checks if the number of vowels gets calculated correctly', () => {
    const wrapper = mount(Form, globalConfig)
    const text = 'HEllo World!'
    // @ts-expect-error getNumberOfVowels does exist on type
    const numberOfVowels = wrapper.vm.getNumberOfVowels(text)
    expect(numberOfVowels).toBe(3)
  })

  it('adds a green background to the search input field when it matches an input field', async () => {
    const wrapper = mount(Form, globalConfig)
    const toolbar = wrapper.find('.p-toolbar')
    const searchInput = toolbar.find('.p-inputtext')
    const inputFields = wrapper.findAll('.p-card')
    const inputField = inputFields[0].find('.p-inputtext')
    await searchInput.setValue('match')
    await inputField.setValue('match')
    await wrapper.vm.$nextTick()
    expect(toolbar.element.classList.contains('bg-green')).toBe(true)
    expect(inputFields[0].element.classList.contains('bg-green')).toBe(true)
  })

  it('does not add a green background when the search input field does not match any input field', async () => {
    const wrapper = mount(Form, globalConfig)
    const toolbar = wrapper.find('.p-toolbar')
    const searchInput = toolbar.find('.p-inputtext')
    const inputFields = wrapper.findAll('.p-card')
    const inputField = inputFields[0].find('.p-inputtext')
    await searchInput.setValue('no match')
    await inputField.setValue('different')
    await wrapper.vm.$nextTick()
    expect(toolbar.element.classList.contains('bg-green')).toBe(false)
    expect(inputFields[0].element.classList.contains('bg-green')).toBe(false)
  })
})
