"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  X,
  ChevronRight,
  ChevronLeft,
  User,
  Sparkles,
  MapPin,
  Package,
  Search,
  HelpCircle,
  Flag,
  Map,
  Shield,
  Phone,
  Mail,
  Clock,
  Star,
  Gift,
  Truck,
  Award,
  Home,
  ShoppingBag,
  Heart,
  Settings,
  BookOpen,
  MessageCircle,
  CreditCard,
  FileText,
  Percent,
} from "lucide-react"
import { navigationConfig, singleNavItems } from "@/lib/navigation-config"
import { cn } from "@/lib/utils"

interface MobileMenuEnhancedProps {
  isOpen: boolean
  onClose: () => void
  location?: { region: string } | null
  stateCode?: string | null
  shopifyAccountUrl: string
  onQuizOpen: () => void
}

type TabType = "shop" | "explore" | "help" | "account"

export function MobileMenuEnhanced({
  isOpen,
  onClose,
  location,
  stateCode,
  shopifyAccountUrl,
  onQuizOpen,
}: MobileMenuEnhancedProps) {
  const [activeTab, setActiveTab] = useState<TabType>("shop")
  const [expandedSections, setExpandedSections] = useState<string[]>([])
  const [categoryStack, setCategoryStack] = useState<{ index: number; label: string }[]>([])

  useEffect(() => {
    if (!isOpen) {
      setActiveTab("shop")
      setExpandedSections([])
      setCategoryStack([])
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) =>
      prev.includes(sectionId) ? prev.filter((id) => id !== sectionId) : [...prev, sectionId],
    )
  }

  const handleClose = () => {
    setCategoryStack([])
    setExpandedSections([])
    onClose()
  }

  const handleLinkClick = () => {
    handleClose()
  }

  const navigateToCategory = (index: number, label: string) => {
    setCategoryStack([...categoryStack, { index, label }])
  }

  const navigateBack = () => {
    setCategoryStack(categoryStack.slice(0, -1))
  }

  if (!isOpen) return null

  const currentCategory =
    categoryStack.length > 0 ? navigationConfig[categoryStack[categoryStack.length - 1].index] : null

  const tabs = [
    { id: "shop" as TabType, label: "Shop", icon: ShoppingBag },
    { id: "explore" as TabType, label: "Explore", icon: Sparkles },
    { id: "help" as TabType, label: "Help", icon: HelpCircle },
    { id: "account" as TabType, label: "Account", icon: User },
  ]

  const quickLinks = [
    { icon: Search, label: "Search", href: "/search", color: "bg-blue-500" },
    {
      icon: Sparkles,
      label: "Flagpole Quiz",
      href: "/quiz",
      color: "bg-[#C8A55C]",
      onClick: () => {
        onQuizOpen()
        handleClose()
      },
    },
    { icon: Flag, label: "US Flags", href: "/collections/usa-flags", color: "bg-red-500" },
    { icon: Map, label: "State Flags", href: "/collections/state-flags", color: "bg-green-500" },
    { icon: Shield, label: "Military", href: "/collections/military-flags", color: "bg-yellow-600" },
    { icon: Percent, label: "Deals", href: "/deals", color: "bg-purple-500" },
  ]

  const helpItems = [
    { icon: Phone, label: "Call Us", href: "tel:1-800-555-0123", description: "Mon-Fri 9am-5pm EST" },
    { icon: Mail, label: "Email Support", href: "/contact", description: "Get a response within 24hrs" },
    { icon: MessageCircle, label: "Live Chat", href: "#", description: "Chat with Flaggy AI" },
    { icon: BookOpen, label: "Help Center", href: "/help-center", description: "FAQs and guides" },
    {
      icon: FileText,
      label: "Installation Guide",
      href: "/info-center/installation-guide",
      description: "Step-by-step instructions",
    },
    { icon: Truck, label: "Shipping Info", href: "/shipping", description: "Delivery times & costs" },
    { icon: Gift, label: "Returns & Exchanges", href: "/returns", description: "Easy 365-day returns" },
    {
      icon: Award,
      label: "Warranty Info",
      href: "/info-center/warranty-information",
      description: "Lifetime warranty details",
    },
  ]

  const exploreItems = [
    { icon: Home, label: "Flagpole Finder", href: "/flagpole-finder", description: "Find your perfect match" },
    { icon: Star, label: "Customer Reviews", href: "/reviews", description: "See what others say" },
    {
      icon: Award,
      label: "365-Day Trial",
      href: "/info-center/phoenix-365-day-home-trial",
      description: "Risk-free home trial",
    },
    { icon: BookOpen, label: "Info Center", href: "/info-center", description: "Guides and resources" },
    { icon: FileText, label: "Blog", href: "/blog", description: "Tips and inspiration" },
    { icon: Gift, label: "Refer a Friend", href: "/refer", description: "Earn rewards" },
    { icon: CreditCard, label: "Financing", href: "/financing", description: "Easy monthly payments" },
    { icon: Shield, label: "Our Guarantee", href: "/guarantee", description: "100% satisfaction" },
  ]

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] animate-in fade-in duration-300"
        onClick={handleClose}
      />

      {/* Menu Panel */}
      <div
        className={cn(
          "fixed top-0 left-0 bottom-0 w-[90%] max-w-md bg-white z-[201] overflow-hidden shadow-2xl flex flex-col",
          "transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 bg-gradient-to-r from-[#0B1C2C] via-[#1a2f42] to-[#0B1C2C] text-white shrink-0">
          {categoryStack.length > 0 ? (
            <button
              onClick={navigateBack}
              className="flex items-center gap-2 text-white hover:text-[#C8A55C] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
              <span className="font-semibold">Back</span>
            </button>
          ) : (
            <Link href="/" onClick={handleLinkClick} className="flex items-center gap-2">
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center border-2 border-[#C8A55C]">
                <span className="text-[#C8A55C] font-bold text-sm">AF</span>
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-bold tracking-wide">ATLANTIC</span>
                <span className="text-xs font-bold tracking-wide text-[#C8A55C]">FLAGPOLE</span>
              </div>
            </Link>
          )}
          <button
            onClick={handleClose}
            className="w-10 h-10 flex items-center justify-center bg-white/10 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        {categoryStack.length === 0 && (
          <div className="flex border-b border-gray-200 bg-[#F5F3EF] shrink-0">
            {tabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={cn(
                    "flex-1 flex flex-col items-center gap-1 py-3 transition-all duration-200 relative",
                    activeTab === tab.id
                      ? "text-[#0B1C2C] bg-white"
                      : "text-gray-500 hover:text-[#0B1C2C] hover:bg-white/50",
                  )}
                >
                  <Icon className={cn("w-5 h-5", activeTab === tab.id && "text-[#C8A55C]")} />
                  <span className="text-xs font-semibold">{tab.label}</span>
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-[#C8A55C] rounded-full" />
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto overscroll-contain">
          {/* Category Drilldown View */}
          {categoryStack.length > 0 && currentCategory && (
            <div className="animate-in slide-in-from-right duration-200">
              <div className="p-4 bg-[#F5F3EF] border-b border-gray-200">
                <h2 className="text-xl font-bold text-[#0B1C2C]">{categoryStack[categoryStack.length - 1].label}</h2>
                {currentCategory.href && (
                  <Link
                    href={currentCategory.href}
                    onClick={handleLinkClick}
                    className="text-sm text-[#C8A55C] hover:text-[#0B1C2C] font-semibold mt-1 inline-flex items-center gap-1"
                  >
                    View All <ChevronRight className="w-4 h-4" />
                  </Link>
                )}
              </div>
              <div className="p-4 space-y-4">
                {currentCategory.categories.map((subcategory, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection(`subcat-${idx}`)}
                      className="flex items-center justify-between w-full p-4 bg-white hover:bg-[#F5F3EF] transition-colors"
                    >
                      <span className="font-semibold text-[#0B1C2C]">{subcategory.label}</span>
                      <ChevronRight
                        className={cn(
                          "w-5 h-5 text-gray-400 transition-transform duration-200",
                          expandedSections.includes(`subcat-${idx}`) && "rotate-90",
                        )}
                      />
                    </button>
                    {expandedSections.includes(`subcat-${idx}`) && (
                      <div className="border-t border-gray-100 bg-[#F5F3EF]/50 animate-in slide-in-from-top-2 duration-200">
                        {subcategory.items.map((item, itemIdx) => (
                          <Link
                            key={itemIdx}
                            href={item.href}
                            onClick={handleLinkClick}
                            className="flex items-center justify-between p-3 hover:bg-white transition-colors border-b border-gray-100 last:border-b-0"
                          >
                            <span className="text-sm text-[#0B1C2C]">{item.label}</span>
                            <ChevronRight className="w-4 h-4 text-gray-300" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Shop Tab */}
          {categoryStack.length === 0 && activeTab === "shop" && (
            <div className="animate-in fade-in duration-200">
              {/* Quick Links Grid */}
              <div className="p-4 bg-gradient-to-br from-[#F5F3EF] to-white">
                <h3 className="text-sm font-bold text-[#0B1C2C]/60 uppercase tracking-wider mb-3">Quick Links</h3>
                <div className="grid grid-cols-3 gap-2">
                  {quickLinks.map((item) => {
                    const Icon = item.icon
                    if (item.onClick) {
                      return (
                        <button
                          key={item.label}
                          onClick={item.onClick}
                          className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#C8A55C] hover:shadow-md transition-all"
                        >
                          <div
                            className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center text-white",
                              item.color,
                            )}
                          >
                            <Icon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-medium text-[#0B1C2C] text-center">{item.label}</span>
                        </button>
                      )
                    }
                    return (
                      <Link
                        key={item.label}
                        href={item.href}
                        onClick={handleLinkClick}
                        className="flex flex-col items-center gap-2 p-3 bg-white rounded-xl border border-gray-100 hover:border-[#C8A55C] hover:shadow-md transition-all"
                      >
                        <div
                          className={cn(
                            "w-10 h-10 rounded-full flex items-center justify-center text-white",
                            item.color,
                          )}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium text-[#0B1C2C] text-center">{item.label}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              {/* Featured Product */}
              <div className="p-4 border-t border-gray-200">
                <h3 className="text-sm font-bold text-[#0B1C2C]/60 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <Package className="w-4 h-4 text-[#C8A55C]" />
                  Featured
                </h3>
                <Link
                  href="/products/phoenix-telescoping-flagpole-premier-kit-starter-bundle"
                  onClick={handleLinkClick}
                  className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#0B1C2C] to-[#1a2f42] rounded-xl text-white hover:shadow-lg transition-all group"
                >
                  <div className="relative w-20 h-20 shrink-0 bg-white/10 rounded-lg overflow-hidden">
                    <Image
                      src="/images/design-mode/Phoenix_Telescoping_Flagpole_Premier_Kit_-_Starter_Bundle.png"
                      alt="Phoenix Premier Kit"
                      fill
                      className="object-contain p-2 group-hover:scale-110 transition-transform"
                    />
                  </div>
                  <div className="flex-1">
                    <span className="bg-[#C8A55C] text-[#0B1C2C] text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      Most Popular
                    </span>
                    <h4 className="font-bold mt-1">Phoenix Premier Kit</h4>
                    <p className="text-xs text-white/70 mt-0.5">Complete bundle with everything</p>
                    <p className="text-[#C8A55C] font-bold mt-1">Starting at $779</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-[#C8A55C] transition-colors" />
                </Link>
              </div>

              {/* Location-based suggestion */}
              {location && stateCode && (
                <div className="px-4 pb-4">
                  <Link
                    href={`/capitals/${stateCode.toLowerCase()}`}
                    onClick={handleLinkClick}
                    className="flex items-center gap-3 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:border-blue-300 transition-all"
                  >
                    <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#0B1C2C]">Shop {location.region}</p>
                      <p className="text-xs text-gray-600">Local deals and shipping</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-gray-400" />
                  </Link>
                </div>
              )}

              {/* Shop by Department */}
              <div className="p-4 border-t border-gray-200">
                <h3 className="text-sm font-bold text-[#0B1C2C]/60 uppercase tracking-wider mb-3">
                  Shop by Department
                </h3>
                <div className="space-y-2">
                  {navigationConfig.map((category, index) => (
                    <button
                      key={category.label}
                      onClick={() => navigateToCategory(index, category.label)}
                      className="flex items-center justify-between w-full p-4 bg-white border border-gray-100 rounded-xl hover:border-[#C8A55C] hover:shadow-sm transition-all"
                    >
                      <span className="font-medium text-[#0B1C2C]">{category.label}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  ))}
                  {singleNavItems.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center justify-between w-full p-4 bg-white border border-gray-100 rounded-xl hover:border-[#C8A55C] hover:shadow-sm transition-all"
                    >
                      <span className="font-medium text-[#0B1C2C]">{item.label}</span>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Explore Tab */}
          {categoryStack.length === 0 && activeTab === "explore" && (
            <div className="animate-in fade-in duration-200 p-4">
              <div className="space-y-3">
                {exploreItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-[#C8A55C] hover:shadow-md transition-all group"
                    >
                      <div className="w-12 h-12 bg-[#F5F3EF] rounded-xl flex items-center justify-center group-hover:bg-[#C8A55C]/10 transition-colors">
                        <Icon className="w-6 h-6 text-[#C8A55C]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#0B1C2C]">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#C8A55C] transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </div>
          )}

          {/* Help Tab */}
          {categoryStack.length === 0 && activeTab === "help" && (
            <div className="animate-in fade-in duration-200 p-4">
              {/* Flaggy AI Banner */}
              <div className="mb-4 p-4 bg-gradient-to-r from-[#0B1C2C] to-[#1a2f42] rounded-xl text-white">
                <div className="flex items-center gap-3">
                  <div className="relative w-14 h-14 shrink-0">
                    <Image src="/images/design-mode/Flaggy.png" alt="Flaggy" fill className="object-contain" />
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#0B1C2C] rounded-full animate-pulse"></span>
                  </div>
                  <div className="flex-1">
                    <p className="font-bold">Need Help? Ask Flaggy!</p>
                    <p className="text-xs text-white/70">Our AI assistant is available 24/7</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                {helpItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={handleLinkClick}
                      className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-[#C8A55C] hover:shadow-md transition-all group"
                    >
                      <div className="w-12 h-12 bg-[#F5F3EF] rounded-xl flex items-center justify-center group-hover:bg-[#C8A55C]/10 transition-colors">
                        <Icon className="w-6 h-6 text-[#0B1C2C]" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#0B1C2C]">{item.label}</p>
                        <p className="text-xs text-gray-500">{item.description}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#C8A55C] transition-colors" />
                    </Link>
                  )
                })}
              </div>

              {/* Contact Info */}
              <div className="mt-6 p-4 bg-[#F5F3EF] rounded-xl">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-[#C8A55C]" />
                  <span className="text-sm font-semibold text-[#0B1C2C]">Business Hours</span>
                </div>
                <p className="text-sm text-gray-600">Monday - Friday: 9am - 5pm EST</p>
                <p className="text-sm text-gray-600">Saturday - Sunday: Closed</p>
              </div>
            </div>
          )}

          {/* Account Tab */}
          {categoryStack.length === 0 && activeTab === "account" && (
            <div className="animate-in fade-in duration-200 p-4">
              {/* Sign In Banner */}
              <a
                href={shopifyAccountUrl}
                onClick={handleLinkClick}
                className="flex items-center gap-4 p-4 bg-gradient-to-r from-[#0B1C2C] to-[#1a2f42] rounded-xl text-white mb-4 group"
              >
                <div className="w-14 h-14 bg-white/10 rounded-full flex items-center justify-center border-2 border-[#C8A55C]">
                  <User className="w-7 h-7 text-[#C8A55C]" />
                </div>
                <div className="flex-1">
                  <p className="font-bold">Sign In / Create Account</p>
                  <p className="text-xs text-white/70">Access orders, tracking & more</p>
                </div>
                <ChevronRight className="w-5 h-5 text-white/50 group-hover:text-[#C8A55C] transition-colors" />
              </a>

              <div className="space-y-3">
                <Link
                  href="/account/orders"
                  onClick={handleLinkClick}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-[#C8A55C] transition-all"
                >
                  <div className="w-12 h-12 bg-[#F5F3EF] rounded-xl flex items-center justify-center">
                    <Package className="w-6 h-6 text-[#0B1C2C]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0B1C2C]">My Orders</p>
                    <p className="text-xs text-gray-500">Track and manage orders</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </Link>

                <Link
                  href="/account/wishlist"
                  onClick={handleLinkClick}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-[#C8A55C] transition-all"
                >
                  <div className="w-12 h-12 bg-[#F5F3EF] rounded-xl flex items-center justify-center">
                    <Heart className="w-6 h-6 text-[#0B1C2C]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0B1C2C]">Wishlist</p>
                    <p className="text-xs text-gray-500">Saved items</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </Link>

                <Link
                  href="/account/settings"
                  onClick={handleLinkClick}
                  className="flex items-center gap-4 p-4 bg-white border border-gray-100 rounded-xl hover:border-[#C8A55C] transition-all"
                >
                  <div className="w-12 h-12 bg-[#F5F3EF] rounded-xl flex items-center justify-center">
                    <Settings className="w-6 h-6 text-[#0B1C2C]" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-[#0B1C2C]">Account Settings</p>
                    <p className="text-xs text-gray-500">Manage your profile</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300" />
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Flaggy */}
        <div className="shrink-0 p-4 bg-[#F5F3EF] border-t border-gray-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-500">
              <span>Powered by</span>
              <span className="font-bold text-[#0B1C2C]">Atlantic Flagpole</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image src="/images/design-mode/Flaggy.png" alt="Flaggy" fill className="object-contain" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
