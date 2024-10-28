export interface Product {
  id: string
  name: string
  code: string | null
  price: {
    old_price: number | null
    current_price: number
  }
  image: {
    url: string
  }
  material: number
}

export interface Option {
  name: string
  id: string
}
