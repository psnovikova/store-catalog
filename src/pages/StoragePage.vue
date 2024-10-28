<script lang="ts" setup>
import { computed, ref } from 'vue'
import items from '../assets/data/items.json'
import materials from '../assets/data/materials.json'
import Breadcrumb from '../components/Breadcrumb.vue'
import DropdownFilter from '../components/DropdownFilter.vue'
import ProductCard from './components/ProductCard.vue'

const breadcrumbItems = ref([
  { name: 'Главная', link: '/' },
  { name: 'Системы хранения', link: '/storage-systems' },
  { name: 'Комплекты стеллажных систем', link: null },
])

const sortingOptions = ref(['Цена по возрастанию', 'Цена по убыванию'])
const selectedSorting = ref(sortingOptions.value[0])
const selectedMaterial = ref(null)

const filteredItems = computed(() => {
  let sortedItems = [...items]

  if (selectedSorting.value === 'Цена по возрастанию') {
    sortedItems.sort((a, b) => a.price.current_price - b.price.current_price)
  }
  else if (selectedSorting.value === 'Цена по убыванию') {
    sortedItems.sort((a, b) => b.price.current_price - a.price.current_price)
  }

  if (selectedMaterial.value) {
    sortedItems = sortedItems.filter(item => item.material === Number(selectedMaterial.value.id))
  }

  return sortedItems
})
</script>

<template>
  <div class="storage-page">
    <Breadcrumb :items="breadcrumbItems" />

    <h1 class="storage-page__title">
      Комплекты стеллажных систем
    </h1>

    <div class="storage-page__filters">
      <DropdownFilter
        v-model="selectedSorting"
        label="Сортировать по:"
        :options="sortingOptions"
      />
      <DropdownFilter
        v-model="selectedMaterial"
        label="Материал:"
        :options="materials"
      />
    </div>

    <div class="storage-page__grid">
      <ProductCard
        v-for="(item, index) in filteredItems"
        :key="index"
        :item="item"
      />
    </div>
  </div>
</template>

<style scoped>
.storage-page {
  padding: 32px;
  max-width: 1600px;
  margin: 0 auto;
}

.storage-page__title {
  font-size: 24px;
  font-weight: bold;
  margin: 32px 0;
}

.storage-page__filters {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

@media (max-width: 480px) {
  .storage-page__filters {
    flex-direction: column;
  }
}

.storage-page__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(336px, 1fr));
  gap: 16px;
}
</style>
