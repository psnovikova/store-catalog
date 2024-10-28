<script lang="ts" setup>
interface BreadcrumbItem {
  name: string
  link?: string
}

defineProps<{
  items: BreadcrumbItem[]
}>()
</script>

<template>
  <nav class="breadcrumb">
    <ul class="breadcrumb__list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb__item">
        <a v-if="item.link" :href="item.link" class="breadcrumb__link">{{ item.name }}</a>
        <span v-else class="breadcrumb__current">{{ item.name }}</span>
        <span v-if="index < items.length - 1" class="breadcrumb__separator">/</span>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
.breadcrumb {
  padding: 0;
  font-family: 'SF UI Text', sans-serif;
  color: #727783;
}

.breadcrumb__list {
  display: flex;
  align-items: center;
  padding-inline-start: 0;
}

.breadcrumb__item {
  display: inline-flex;
  align-items: center;
  color: #727783;
  font-size: 16px;
}

.breadcrumb__link {
  text-decoration: none;
  color: #727783;
  transition: color 0.3s ease;
}

.breadcrumb__link:hover {
  color: #000;
}

.breadcrumb__current {
  color: #000;
}

.breadcrumb__separator {
  margin: 0 8px;
  color: #727783;
}
</style>
