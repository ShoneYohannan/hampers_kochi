import React from 'react';
import StructuredData from '@/components/seo/StructuredData';
import AnnouncementBar from '@/components/layout/AnnouncementBar';
import HomeClientCatalog from '@/components/home/HomeClientCatalog';

export default function HomePage() {
  return (
    <main className="flex flex-col bg-[#FCFBF8] w-full overflow-x-hidden min-h-screen">
      {/* ── SERVER-SIDE JSON-LD STRUCTURED DATA (LocalBusiness, FAQPage, BreadcrumbList, Person) ── */}
      <StructuredData />

      {/* Top Luxury Announcement Bar */}
      <AnnouncementBar />

      {/* Client Catalog & Section Composition */}
      <HomeClientCatalog />
    </main>
  );
}
