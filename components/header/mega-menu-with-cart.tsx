"use client"

import type React from "react"
import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-context"
import { cn } from "@/lib/utils"

const StarIcon = ({ className, filled }: { className?: string; filled?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
)

const ShoppingCartIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <circle cx="8" cy="21" r="1" />
    <circle cx="19" cy="21" r="1" />
    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
  </svg>
)

const CheckIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

const ChevronRightIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m9 18 6-6-6-6" />
  </svg>
)

interface MenuItem {
  id: string
  title: string
  url: string
  items?: MenuItem[]
}

interface Product {
  id: string
  handle: string
  title: string
  featuredImage?: {
    url: string
    altText?: string
  }
  images?: {
    nodes: Array<{
      url: string
      altText?: string
    }>
  }
  priceRange: {
    minVariantPrice: {
      amount: string
      currencyCode: string
    }
  }
  variants: {
    edges?: Array<{
      node: {
        id: string
        availableForSale: boolean
      }
    }>
    nodes?: Array<{
      id: string
      availableForSale: boolean
    }>
  }
  availableForSale?: boolean
}

interface MegaMenuWithCartProps {
  title: string
  menuItems: MenuItem[]
  featuredProducts?: Product[]
  onLinkClick?: () => void
}

function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
  }

  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <StarIcon
          key={i}
          className={cn(
            sizeClasses[size],
            i < Math.floor(rating) ? "fill-[#C8A55C] text-[#C8A55C]" : "fill-gray-200 text-gray-200",
          )}
          filled={i < Math.floor(rating)}
        />
      ))}
      <span className="text-xs text-gray-600 ml-1">({rating.toFixed(1)})</span>
    </div>
  )
}

function QuickAddButton({ product }: { product: Product }) {
  const { addToCart, loading } = useCart()
  const [added, setAdded] = useState(false)

  const defaultVariant = product.variants?.edges?.[0]?.node || product.variants?.nodes?.[0]
  const isAvailable = defaultVariant?.availableForSale ?? product.availableForSale ?? true

  const handleQuickAdd = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    if (!defaultVariant || !isAvailable) return

    try {
      await addToCart(defaultVariant.id, 1)
      setAdded(true)
      setTimeout(() => setAdded(false), 2000)
    } catch (error) {
      console.error("Error adding to cart:", error)
    }
  }

  if (!defaultVariant) {
    return (
      <Button size="sm" variant="outline" disabled className="w-full text-xs bg-transparent h-9">
        View Details
      </Button>
    )
  }

  if (!isAvailable) {
    return (
      <Button size="sm" variant="outline" disabled className="w-full text-xs bg-transparent h-9">
        Out of Stock
      </Button>
    )
  }

  return (
    <Button
      size="sm"
      onClick={handleQuickAdd}
      disabled={loading || added}
      className={cn(
        "w-full text-xs transition-all duration-300 h-9 font-semibold",
        added ? "bg-green-600 hover:bg-green-700" : "bg-[#C8A55C] hover:bg-[#a88947] text-white",
      )}
    >
      {added ? (
        <>
          <CheckIcon className="w-3.5 h-3.5 mr-1" />
          Added!
        </>
      ) : (
        <>
          <ShoppingCartIcon className="w-3.5 h-3.5 mr-1" />
          Quick Add
        </>
      )}
    </Button>
  )
}

export function MegaMenuWithCart({ title, menuItems, featuredProducts = [], onLinkClick }: MegaMenuWithCartProps) {
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null)
  const [displayProducts, setDisplayProducts] = useState<Product[]>([])

  useEffect(() => {
    const activeProducts = featuredProducts.filter((p) => p && p.id)
    const shuffled = shuffleArray(activeProducts)
    setDisplayProducts(shuffled.slice(0, 4))
  }, [featuredProducts])

  const getProductRating = (productId: string): number => {
    const hash = productId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0)
    return 4.0 + (hash % 10) / 10
  }

  const isMadeInUSA = (product: Product): boolean => {
    const productTitle = product.title.toLowerCase()
    return (
      productTitle.includes("american") ||
      productTitle.includes("usa") ||
      productTitle.includes("u.s.") ||
      productTitle.includes("nylon")
    )
  }

  return (
    <div className="w-full">
      <div className="flex gap-8">
        {/* Left Sidebar - Categories */}
        <div className="w-64 flex-shrink-0 border-r border-gray-200 pr-6">
          <h3 className="text-lg font-bold text-[#0B1C2C] mb-4 pb-3 border-b-2 border-[#C8A55C]">{title}</h3>
          <ul className="space-y-1">
            {menuItems.map((item) => (
              <li key={item.id} className="relative">
                <Link
                  href={item.url}
                  onClick={onLinkClick}
                  onMouseEnter={() => setHoveredCategory(item.id)}
                  onMouseLeave={() => setHoveredCategory(null)}
                  className="group flex items-center justify-between text-[#0B1C2C] hover:text-[#C8A55C] transition-all duration-200 text-sm py-2.5 px-3 rounded-lg hover:bg-[#F5F3EF]"
                >
                  <span className="font-medium">{item.title}</span>
                  {item.items && item.items.length > 0 && (
                    <ChevronRightIcon className="w-4 h-4 text-gray-400 group-hover:text-[#C8A55C] transition-colors" />
                  )}
                </Link>

                {/* Subcategories on hover */}
                {hoveredCategory === item.id && item.items && item.items.length > 0 && (
                  <div
                    className="absolute left-full top-0 ml-2 bg-white rounded-lg shadow-xl border border-gray-200 p-3 min-w-[200px] z-20"
                    onMouseEnter={() => setHoveredCategory(item.id)}
                    onMouseLeave={() => setHoveredCategory(null)}
                  >
                    <ul className="space-y-1">
                      {item.items.slice(0, 10).map((subItem) => (
                        <li key={subItem.id}>
                          <Link
                            href={subItem.url}
                            onClick={onLinkClick}
                            className="text-sm text-gray-600 hover:text-[#C8A55C] transition-colors block py-2 px-3 rounded-lg hover:bg-[#F5F3EF]"
                          >
                            {subItem.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Link
            href={`/collections/${title.toLowerCase().replace(/\s+/g, "-")}`}
            onClick={onLinkClick}
            className="inline-flex items-center gap-2 mt-6 text-[#C8A55C] hover:text-[#a88947] font-bold text-sm group"
          >
            View All {title}
            <ChevronRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Right Side - Products Grid */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-[#0B1C2C] uppercase tracking-wide">Featured Products</h4>
            <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
              {displayProducts.length} products
            </span>
          </div>

          {displayProducts && displayProducts.length > 0 ? (
            <div className="grid grid-cols-4 gap-6">
              {displayProducts.map((product) => {
                const price = Number.parseFloat(product.priceRange.minVariantPrice.amount)
                const rating = getProductRating(product.id)
                const madeInUSA = isMadeInUSA(product)
                const imageUrl = product.featuredImage?.url || product.images?.nodes?.[0]?.url
                const imageAlt = product.featuredImage?.altText || product.images?.nodes?.[0]?.altText || product.title

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.handle}`}
                    onClick={onLinkClick}
                    className="group block bg-white rounded-xl p-4 hover:shadow-lg transition-all duration-300 border border-gray-100 hover:border-[#C8A55C]"
                  >
                    <div className="relative aspect-square bg-gray-50 rounded-lg overflow-hidden mb-3">
                      {imageUrl ? (
                        <Image
                          src={imageUrl || "/placeholder.svg"}
                          alt={imageAlt}
                          fill
                          sizes="200px"
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          unoptimized
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-300 bg-gray-100">
                          <span className="text-4xl">🏳️</span>
                        </div>
                      )}

                      {madeInUSA && (
                        <div className="absolute top-2 right-2 z-10">
                          <div className="relative w-8 h-8 rounded-full overflow-hidden bg-white shadow border border-[#C8A55C]">
                            <Image
                              src="/images/madeinusabadge.jpg"
                              alt="Made in USA"
                              fill
                              sizes="32px"
                              className="object-contain p-0.5"
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    <h5 className="text-sm font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors line-clamp-2 mb-2 min-h-[2.5rem]">
                      {product.title}
                    </h5>

                    <div className="mb-2">
                      <StarRating rating={rating} size="sm" />
                    </div>

                    <p className="text-base font-bold text-[#C8A55C] mb-3">${price.toFixed(2)}</p>

                    <QuickAddButton product={product} />
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-400 bg-gray-50 rounded-lg">
              <p className="text-sm">No products available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
