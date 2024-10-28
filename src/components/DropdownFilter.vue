<script setup lang="ts">
import type { Option } from '../types'
import { isObject, onClickOutside } from '@vueuse/core'
import { ref } from 'vue'
import clearIcon from '../assets/icons/x.svg'

interface Props {
  label: string
  options: string[] | Option[]
}

defineProps<Props>()
const selectedOption = defineModel<string | Option>()
const isOpen = ref(false)
const dropdownRef = ref()

onClickOutside(dropdownRef, () => isOpen.value = false)

function toggleDropdown() {
  isOpen.value = !isOpen.value
}

function selectOption(option: string | Option) {
  selectedOption.value = option
  isOpen.value = false
}

function clearSelection() {
  selectedOption.value = '' // Сбрасываем выбранный элемент
}
</script>

<template>
  <div ref="dropdownRef" class="dropdown-filter" @click.stop>
    <label class="dropdown-filter__label">{{ label }}</label>
    <button class="dropdown-filter__button" @click="toggleDropdown">
      <span v-if="!selectedOption" class="dropdown-filter__empty-text">Выберите...</span>
      <span v-else-if="isObject(selectedOption)" class="dropdown-filter__text">{{ selectedOption.name }}</span>
      <span v-else class="dropdown-filter__text">{{ selectedOption }}</span>
      <img v-if="selectedOption" :src="clearIcon" alt="Clear" class="dropdown-filter__clear-icon" @click.stop="clearSelection">
      <img src="../assets/icons/chevron-bottom.svg" alt="Chevron" class="dropdown-filter__icon">
    </button>
    <ul v-if="isOpen" class="dropdown-filter__options">
      <li
        v-for="(option, index) in options"
        :key="index"
        class="dropdown-filter__option"
        @click="selectOption(option)"
      >
        <span v-if="isObject(option)">{{ option.name }}</span>
        <span v-else>{{ option }}</span>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.dropdown-filter {
  display: inline-block;
  position: relative;
  font-family: 'SF UI Text', sans-serif;
  width: 288px;
}

.dropdown-filter__label {
  font-size: 12px;
  color: #727273;
  margin-bottom: 4px;
  display: block;
}

.dropdown-filter__button {
  display: flex;
  align-items: center;
  background-color: #f5f5f5;
  border: none;
  padding: 8px 12px;
  font-size: 16px;
  color: #000;
  cursor: pointer;
  width: 100%;
}

.dropdown-filter__text, .dropdown-filter__empty-text {
  text-align: start;
  flex-grow: 1;
}

.dropdown-filter__empty-text {
  color: #999999;
}

.dropdown-filter__clear-icon {
  cursor: pointer;
  margin-right: 8px;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.dropdown-filter__button:hover .dropdown-filter__clear-icon {
  opacity: 1;
}

.dropdown-filter__options {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background-color: #fff;
  border: 1px solid #ddd;
  margin: 4px 0 0;
  list-style: none;
  padding: 0;
  z-index: 1000;
}

.dropdown-filter__option {
  padding: 8px 12px;
  cursor: pointer;
}

.dropdown-filter__option:hover {
  background-color: #f0f0f0;
}
</style>
