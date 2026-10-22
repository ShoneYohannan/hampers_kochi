import React from 'react';
import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  if (items && items.length > 0) {
    return (
      <nav
        aria-label="Breadcrumb"
        className="bg-[#F7F4EC] border-b border-[#EFE9DC] py-2 px-6 sm:px-10 lg:px-14 xl:px-16 text-[11px] uppercase tracking-[0.15em] text-[#68756F]"
      >
        <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
          <li className="flex items-center gap-1.5">
            <Link
              href="/"
              className="flex items-center gap-1 hover:text-[#0B1D15] transition-colors text-[#38423D] font-medium"
            >
              <Home className="w-3 h-3 text-[#C5A869]" />
              <span>Home</span>
            </Link>
            <ChevronRight className="w-3 h-3 text-[#C5A869]/60 shrink-0" />
          </li>

          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {!isLast && item.href ? (
                  <>
                    <Link
                      href={item.href}
                      className="hover:text-[#0B1D15] transition-colors text-[#38423D]"
                    >
                      {item.label}
                    </Link>
                    <ChevronRight className="w-3 h-3 text-[#C5A869]/60 shrink-0" />
                  </>
                ) : (
                  <span className="text-[#A88B4D] font-semibold" aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    );
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="bg-[#F7F4EC] border-b border-[#EFE9DC] py-2 px-6 sm:px-10 lg:px-14 xl:px-16 text-[11px] uppercase tracking-[0.15em] text-[#68756F]"
    >
      <ol className="flex items-center flex-wrap gap-1.5 sm:gap-2">
        <li className="flex items-center gap-1.5">
          <Link
            href="/"
            className="flex items-center gap-1 hover:text-[#0B1D15] transition-colors text-[#38423D] font-medium"
          >
            <Home className="w-3 h-3 text-[#C5A869]" />
            <span>Home</span>
          </Link>
          <ChevronRight className="w-3 h-3 text-[#C5A869]/60 shrink-0" />
        </li>

        <li className="flex items-center gap-1.5">
          <Link
            href="/occasions"
            className="hover:text-[#0B1D15] transition-colors text-[#38423D]"
          >
            Kerala Artisanal Hampers
          </Link>
          <ChevronRight className="w-3 h-3 text-[#C5A869]/60 shrink-0" />
        </li>

        <li className="flex items-center gap-1.5">
          <Link
            href="/shop"
            className="hover:text-[#0B1D15] transition-colors text-[#38423D]"
          >
            Luxury Curations
          </Link>
          <ChevronRight className="w-3 h-3 text-[#C5A869]/60 shrink-0" />
        </li>

        <li className="text-[#A88B4D] font-semibold" aria-current="page">
          The Fort Kochi Atelier
        </li>
      </ol>
    </nav>
  );
}
