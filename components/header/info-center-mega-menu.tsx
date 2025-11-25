"use client"

import Link from "next/link"

const BookOpenIcon = ({ className }: { className?: string }) => (
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
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
)

const WrenchIcon = ({ className }: { className?: string }) => (
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
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
)

const ShieldIcon = ({ className }: { className?: string }) => (
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
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
)

const WindIcon = ({ className }: { className?: string }) => (
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
    <path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2" />
    <path d="M9.6 4.6A2 2 0 1 1 11 8H2" />
    <path d="M12.6 19.4A2 2 0 1 0 14 16H2" />
  </svg>
)

const RulerIcon = ({ className }: { className?: string }) => (
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
    <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
    <path d="m14.5 12.5 2-2" />
    <path d="m11.5 9.5 2-2" />
    <path d="m8.5 6.5 2-2" />
    <path d="m17.5 15.5 2-2" />
  </svg>
)

const FlagIcon = ({ className }: { className?: string }) => (
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
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
    <line x1="4" x2="4" y1="22" y2="15" />
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

const HeartIcon = ({ className }: { className?: string }) => (
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
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
)

interface InfoCenterMegaMenuProps {
  onLinkClick?: () => void
}

const infoCategories = [
  {
    title: "365-Day Home Trial",
    subtitle: "Try Phoenix risk-free for a full year",
    href: "/info-center/phoenix-365-day-home-trial",
    Icon: HeartIcon,
    color: "bg-[#E63946]",
  },
  {
    title: "Buying Guide",
    subtitle: "Expert advice on choosing your flagpole",
    href: "/info-center/flagpole-buying-guide",
    Icon: ShoppingCartIcon,
    color: "bg-[#1F6FFF]",
  },
  {
    title: "Installation Guide",
    subtitle: "Step-by-step installation instructions",
    href: "/info-center/installation-guide",
    Icon: WrenchIcon,
    color: "bg-[#C8A55C]",
  },
  {
    title: "Flag Care",
    subtitle: "Maintenance tips and best practices",
    href: "/info-center/flag-care-and-maintenance",
    Icon: FlagIcon,
    color: "bg-[#0A2740]",
  },
  {
    title: "Flag Etiquette",
    subtitle: "Proper display rules and etiquette",
    href: "/info-center/flag-etiquette",
    Icon: BookOpenIcon,
    color: "bg-[#8B1E2B]",
  },
  {
    title: "Warranty Info",
    subtitle: "Lifetime warranty coverage details",
    href: "/info-center/warranty-information",
    Icon: ShieldIcon,
    color: "bg-[#2E7D32]",
  },
  {
    title: "Wind Rating Guide",
    subtitle: "Understanding flagpole wind ratings",
    href: "/info-center/wind-rating-guide",
    Icon: WindIcon,
    color: "bg-[#0288D1]",
  },
  {
    title: "Size Guide",
    subtitle: "Find the perfect flagpole height",
    href: "/info-center/size-guide",
    Icon: RulerIcon,
    color: "bg-[#7B1FA2]",
  },
]

export function InfoCenterMegaMenu({ onLinkClick }: InfoCenterMegaMenuProps) {
  return (
    <div className="w-full">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {infoCategories.map((category) => (
          <Link
            key={category.href}
            href={category.href}
            onClick={onLinkClick}
            className="group flex items-start gap-3 p-4 rounded-xl bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-200 border border-transparent hover:border-gray-200"
          >
            <div className={`${category.color} p-2.5 rounded-lg text-white flex-shrink-0`}>
              <category.Icon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-semibold text-[#0B1C2C] group-hover:text-[#C8A55C] transition-colors text-sm">
                {category.title}
              </h3>
              <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">{category.subtitle}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
