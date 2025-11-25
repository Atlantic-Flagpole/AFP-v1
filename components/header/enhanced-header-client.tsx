"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { InfoMegaMenu } from "./info-mega-menu"
import { CompareMegaMenu } from "./compare-mega-menu"
import { ChristmasTreeMegaMenu } from "./christmas-tree-mega-menu"
import { NFLMenuClient } from "./nfl-menu-client"
import { InfoCenterMegaMenu } from "./info-center-mega-menu"
import { MobileMenuEnhanced } from "./mobile-menu-enhanced"
import { MegaMenuWithCart } from "./mega-menu-with-cart"
import type { Menu as MenuType, MenuItem } from "@/lib/menus"
import type { ShopifyProduct } from "@/lib/shopify/types"
import { useCart } from "@/components/cart/cart-context"

const SearchIcon = ({ className }: { className?: string }) => (
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
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
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

const UserIcon = ({ className }: { className?: string }) => (
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
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
)

const MapPinIcon = ({ className }: { className?: string }) => (
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
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const MenuIcon = ({ className }: { className?: string }) => (
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
    <line x1="4" x2="20" y1="12" y2="12" />
    <line x1="4" x2="20" y1="6" y2="6" />
    <line x1="4" x2="20" y1="18" y2="18" />
  </svg>
)

const MADE_IN_USA_BADGE_URL = "/images/madeinusabadge.jpg"

interface EnhancedHeaderClientProps {
  menuData: MenuType | null
  megaMenuData: Record<string, any>
  submenuProductsData: Record<string, any[]>
  nflFlagProducts: ShopifyProduct[]
  christmasTreeProducts: ShopifyProduct[]
  judgemeBadge?: React.ReactNode
}

export function EnhancedHeaderClient({
  menuData,
  megaMenuData,
  submenuProductsData,
  nflFlagProducts,
  christmasTreeProducts,
  judgemeBadge,
}: EnhancedHeaderClientProps) {
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { cart } = useCart()

  const itemCount = (() => {
    if (!cart) return 0
    if (Array.isArray(cart.lines)) {
      return cart.lines.reduce((total, line) => total + (line.quantity || 0), 0)
    }
    if (cart.lines?.edges && Array.isArray(cart.lines.edges)) {
      return cart.lines.edges.reduce((total, edge) => {
        const quantity = edge?.node?.quantity || 0
        return total + quantity
      }, 0)
    }
    return 0
  })()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleMenuClose = () => {
    setHoveredMenu(null)
    setIsMobileMenuOpen(false)
  }

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`
    }
  }

  const renderMegaMenu = (item: MenuItem) => {
    const title = item.title.toLowerCase()

    if (title.includes("christmas") && title.includes("tree")) {
      return (
        <ChristmasTreeMegaMenu
          products={christmasTreeProducts}
          submenuProductsData={submenuProductsData}
          onLinkClick={handleMenuClose}
        />
      )
    }

    if (title.includes("nfl") || title.includes("sports")) {
      return <NFLMenuClient nflFlagProducts={nflFlagProducts} onLinkClick={handleMenuClose} />
    }

    const products = megaMenuData[item.id]?.products?.nodes || []

    return (
      <MegaMenuWithCart
        title={item.title}
        menuItems={item.items || []}
        featuredProducts={products}
        onLinkClick={handleMenuClose}
      />
    )
  }

  const renderSecondaryMegaMenu = (menuKey: string) => {
    const promoContent = {
      reviews: {
        title: "What Our Customers Say",
        description: "Join thousands of satisfied customers who trust Atlantic Flagpole for their American pride.",
        buttonText: "Read Reviews",
        buttonHref: "/reviews",
        image: "/happy-customer-with-flagpole.jpg",
      },
      about: {
        title: "Our Story",
        description:
          "Atlantic Flagpole was founded to provide Americans with the highest quality flagpoles, backed by lifetime warranties and exceptional service.",
        buttonText: "Learn More",
        buttonHref: "/about",
        image: "/american-flag-workshop-manufacturing.jpg",
      },
      help: {
        title: "Get $100 Gift Card",
        description:
          "It's a win-win: Give friends $100 off their Atlantic Flagpole & you receive a $100 Visa or Amazon gift card.",
        buttonText: "Refer Now",
        buttonHref: "/refer",
        image: "/friends-celebrating-with-american-flag.jpg",
      },
    }

    if (menuKey === "compare") {
      return <CompareMegaMenu onLinkClick={handleMenuClose} />
    }

    if (menuKey === "info-center") {
      return <InfoCenterMegaMenu onLinkClick={handleMenuClose} />
    }

    if (menuKey === "reviews") {
      return (
        <InfoMegaMenu
          title="Reviews & Awards"
          subtitle="See what customers are saying"
          menuItems={[
            { id: "1", title: "Customer Reviews", url: "/reviews", items: [] },
            { id: "2", title: "Awards", url: "/awards", items: [] },
          ]}
          promoContent={promoContent.reviews}
          onLinkClick={handleMenuClose}
        />
      )
    }

    if (menuKey === "about") {
      return (
        <InfoMegaMenu
          title="About"
          subtitle="Learn about our mission"
          menuItems={[
            { id: "1", title: "Our Story", url: "/about", items: [] },
            { id: "2", title: "365 Night Trial", url: "/info-center/phoenix-365-day-home-trial", items: [] },
            { id: "3", title: "Lifetime Warranty", url: "/warranty", items: [] },
            { id: "4", title: "Awards", url: "/awards", items: [] },
          ]}
          promoContent={promoContent.about}
          onLinkClick={handleMenuClose}
        />
      )
    }

    if (menuKey === "help") {
      return (
        <InfoMegaMenu
          title="Help & Support"
          subtitle="We're here to assist you"
          menuItems={[
            { id: "1", title: "FAQ", url: "/faq", items: [] },
            { id: "2", title: "Financing", url: "/financing", items: [] },
            { id: "3", title: "Returns", url: "/returns", items: [] },
            { id: "4", title: "Refer a Friend", url: "/refer", items: [] },
          ]}
          promoContent={promoContent.help}
          onLinkClick={handleMenuClose}
        />
      )
    }

    return null
  }

  return (
    <>
      {/* Main Header */}
      <header
        className={`sticky top-0 z-50 bg-white transition-shadow duration-300 ${
          isScrolled ? "shadow-md" : "shadow-sm"
        }`}
      >
        <div className="bg-[#0B1C2C] text-white">
          <div className="container mx-auto px-4 py-1.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-4">
              <Link href="/info-center/phoenix-365-day-home-trial" className="hover:text-[#C8A55C] transition-colors">
                365-Day Home Trial
              </Link>
              <span className="hidden sm:inline text-white/40">|</span>
              <Link href="/guarantee" className="hidden sm:inline hover:text-[#C8A55C] transition-colors">
                Lifetime Warranty
              </Link>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/find-store" className="flex items-center gap-1 hover:text-[#C8A55C] transition-colors">
                <MapPinIcon className="w-3 h-3" />
                <span className="hidden sm:inline">Find in Store</span>
              </Link>
              <Link href="/account" className="hover:text-[#C8A55C] transition-colors">
                My Account
              </Link>
            </div>
          </div>
        </div>

        <div className="border-b border-gray-200 bg-white">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between gap-4 h-16">
              {/* Hamburger Menu - Always visible */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-[#0B1C2C] text-white hover:bg-[#1a2f42] rounded-lg transition-colors flex-shrink-0"
                aria-label="Open menu"
              >
                <MenuIcon className="w-5 h-5" />
                <span className="font-semibold text-sm">All</span>
              </button>

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 flex-shrink-0">
                <div className="w-9 h-9 bg-[#0B1C2C] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">AF</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold text-[#0B1C2C] leading-tight tracking-wide">ATLANTIC</span>
                  <span className="text-[10px] text-[#0B1C2C]/70 leading-tight tracking-widest">FLAGPOLE</span>
                </div>
              </Link>

              {/* Desktop Navigation - Main categories */}
              <nav className="hidden lg:flex items-center gap-1">
                {menuData?.items?.map((item) => (
                  <div
                    key={item.id}
                    className="relative"
                    onMouseEnter={() => setHoveredMenu(item.id)}
                    onMouseLeave={() => setHoveredMenu(null)}
                  >
                    <Link
                      href={item.url}
                      className="px-3 py-2 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] transition-colors inline-block"
                    >
                      {item.title}
                    </Link>
                  </div>
                ))}
              </nav>

              {/* Quiz Button */}
              <Link
                href="/quiz"
                className="hidden md:flex items-center gap-2 px-4 py-2 bg-[#C8A55C] text-[#0B1C2C] text-sm font-semibold rounded-lg hover:bg-[#b8954c] transition-colors"
              >
                Take Flagpole Quiz
              </Link>

              {/* Desktop Search */}
              <div className="hidden lg:flex flex-1 max-w-sm">
                <form onSubmit={handleSearchSubmit} className="relative w-full">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search flagpoles..."
                    className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[#C8A55C] focus:ring-1 focus:ring-[#C8A55C]"
                  />
                  <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8A55C]"
                  >
                    <SearchIcon className="w-4 h-4" />
                  </button>
                </form>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-1 flex-shrink-0">
                {/* Mobile Search */}
                <button
                  onClick={() => setIsSearchOpen(!isSearchOpen)}
                  className="p-2 text-gray-600 hover:text-[#C8A55C] transition-colors lg:hidden"
                  aria-label="Search"
                >
                  <SearchIcon className="w-5 h-5" />
                </button>

                {/* Desktop Account */}
                <Link
                  href="/account"
                  className="hidden lg:flex p-2 text-gray-600 hover:text-[#C8A55C] transition-colors"
                  aria-label="Account"
                >
                  <UserIcon className="w-5 h-5" />
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="p-2 text-gray-600 hover:text-[#C8A55C] transition-colors relative"
                  aria-label="Shopping cart"
                >
                  <ShoppingCartIcon className="w-5 h-5" />
                  {itemCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-[#C8A55C] text-white text-[10px] rounded-full flex items-center justify-center font-bold">
                      {itemCount > 99 ? "99+" : itemCount}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Search Dropdown */}
        {isSearchOpen && (
          <div className="lg:hidden border-b border-gray-200 bg-white">
            <div className="container mx-auto px-4 py-3">
              <form onSubmit={handleSearchSubmit} className="relative w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search flagpoles, accessories..."
                  className="w-full px-4 py-2 pr-10 text-sm border border-gray-300 rounded-full focus:outline-none focus:border-[#C8A55C] focus:ring-1 focus:ring-[#C8A55C]"
                  autoFocus
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#C8A55C]"
                >
                  <SearchIcon className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Secondary navigation bar */}
        <div className="bg-[#F5F3EF] border-b border-gray-200">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-1 h-10 overflow-x-auto scrollbar-hide">
              {/* Secondary nav items */}
              <div className="flex items-center gap-1">
                <div
                  className="relative flex-shrink-0"
                  onMouseEnter={() => setHoveredMenu("reviews")}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    href="/reviews"
                    className="px-3 py-1.5 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] whitespace-nowrap"
                  >
                    Reviews
                  </Link>
                </div>
                <div
                  className="relative flex-shrink-0"
                  onMouseEnter={() => setHoveredMenu("compare")}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    href="/compare"
                    className="px-3 py-1.5 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] whitespace-nowrap"
                  >
                    Compare
                  </Link>
                </div>
                <div
                  className="relative flex-shrink-0"
                  onMouseEnter={() => setHoveredMenu("about")}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    href="/about"
                    className="px-3 py-1.5 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] whitespace-nowrap"
                  >
                    About
                  </Link>
                </div>
                <div
                  className="relative flex-shrink-0"
                  onMouseEnter={() => setHoveredMenu("help")}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    href="/help-center"
                    className="px-3 py-1.5 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] whitespace-nowrap"
                  >
                    Help
                  </Link>
                </div>
                <div
                  className="relative flex-shrink-0"
                  onMouseEnter={() => setHoveredMenu("info-center")}
                  onMouseLeave={() => setHoveredMenu(null)}
                >
                  <Link
                    href="/info-center"
                    className="px-3 py-1.5 text-sm font-medium text-[#0B1C2C] hover:text-[#C8A55C] whitespace-nowrap"
                  >
                    Info Center
                  </Link>
                </div>
                <Link
                  href="/led-christmas-trees-for-flagpole"
                  className="px-3 py-1.5 text-sm font-medium text-red-600 hover:text-red-700 whitespace-nowrap flex-shrink-0"
                >
                  Holiday Deals
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mega Menu Dropdown Overlay */}
      {hoveredMenu && (
        <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onMouseEnter={() => setHoveredMenu(null)} />
      )}

      {hoveredMenu && (
        <div
          className="fixed left-0 right-0 z-50 bg-white shadow-2xl"
          style={{ top: isSearchOpen ? "176px" : "136px" }}
          onMouseEnter={() => setHoveredMenu(hoveredMenu)}
          onMouseLeave={() => setHoveredMenu(null)}
        >
          <div className="animate-in fade-in slide-in-from-top-4 duration-200">
            {["info-center", "reviews", "compare", "about", "help"].includes(hoveredMenu) ? (
              renderSecondaryMegaMenu(hoveredMenu)
            ) : (
              <>
                {menuData?.items?.find((item) => item.id === hoveredMenu) &&
                  renderMegaMenu(menuData.items.find((item) => item.id === hoveredMenu)!)}
              </>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      <MobileMenuEnhanced
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        shopifyAccountUrl="/account"
        onQuizOpen={() => {
          setIsMobileMenuOpen(false)
          window.location.href = "/quiz"
        }}
      />

      {/* Judge.me Badge */}
      {judgemeBadge && <div className="hidden">{judgemeBadge}</div>}
    </>
  )
}
