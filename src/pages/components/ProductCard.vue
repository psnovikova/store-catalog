<script lang="ts" setup>
import type { Product } from '../../types'
import { computed } from 'vue'
import { useStore } from 'vuex'
import checkedIcon from '../../assets/icons/circle-checked.svg'
import heartIcon from '../../assets/icons/heart.svg'
import heartIconRed from '../../assets/icons/heart-red.svg'
import cartIcon from '../../assets/icons/shopping-cart.svg'

const prop = defineProps<{
  item: Product
}>()

const store = useStore()
const isInWishlist = computed(() => store.getters['wishlist/isInWishlist'](prop.item.id))
const isInCart = computed(() => store.getters['cart/isInCart'](prop.item.id))

function toggleWishlist() {
  store.dispatch('wishlist/toggleWishlist', prop.item.id)
}
function toggleCart() {
  store.dispatch('cart/toggleCart', prop.item.id)
}
const roundedPrice = (price: number) => Math.floor(price)
</script>

<template>
  <div class="product-card">
    <div class="product-card__image-wrapper">
      <img :src="item.image.url" :alt="item.name" class="product-card__image">
      <div v-if="item.price.old_price" class="product-card__discount-label">
        Скидка
      </div>
    </div>

    <div class="product-card__body">
      <div class="product-card__content">
        <div v-if="item.code" class="product-card__label">
          {{ item.code }}
        </div>
        <h2 class="product-card__name">
          {{ item.name }}
        </h2>

        <div class="product-card__price">
          <span v-if="item.price.old_price" class="product-card__old-price">
            {{ roundedPrice(item.price.old_price) }}₽
          </span>
          <span class="product-card__current-price">
            {{ roundedPrice(item.price.current_price) }}₽
          </span>
        </div>
      </div>

      <div class="product-card__actions">
        <button v-if="isInWishlist" class="product-card__wishlist-btn" @click="toggleWishlist">
          <img :src="heartIconRed" alt="wishlistRed">
        </button>
        <button v-else class="product-card__wishlist-btn" @click="toggleWishlist">
          <img :src="heartIcon" alt="wishlist">
        </button>
        <button v-if="isInCart" class="product-card__checked-btn" @click="toggleCart">
          <img :src="checkedIcon" alt="checked">
        </button>
        <button v-else class="product-card__cart-btn" @click="toggleCart">
          <img :src="cartIcon" alt="cart">
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-card {
  width: 336px;
  height: 352px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border: 1px solid #e0e0e0;
  overflow: hidden;
  text-align: left;
  background-color: #fff;
}

.product-card__image-wrapper {
  position: relative;
  display: flex;
  justify-content: center;
}

.product-card__image {
  width: 238px;
  height: 237px;
  top: 9px;
  left: 49px;
}

.product-card__discount-label {
  position: absolute;
  top: 8px;
  left: 0;
  background-color: #EB5757;
  color: white;
  padding: 4px 8px;
  font-size: 16px;
  font-weight: 500;
  line-height: 22px;
  letter-spacing: 0.02em;
}

.product-card__body {
  display: flex;
  justify-content: space-between;
  align-items: end;
  padding: 8px 12px;
}

.product-card__content {
  flex-grow: 1;
}

.product-card__label {
  font-size: 12px;
  color: #999;
  margin-bottom: 8px;
}

.product-card__name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 12px;
}

.product-card__price {
  font-size: 14px;
}

.product-card__old-price {
  text-decoration: line-through;
  color: #999;
  margin-right: 8px;
}

.product-card__current-price {
  font-weight: bold;
  color: #333;
}

.product-card__actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.product-card__wishlist-btn,
.product-card__cart-btn,
.product-card__checked-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 24px;
  height: 24px;
}
</style>
