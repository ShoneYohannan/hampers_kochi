import React from 'react';

export default function StructuredData() {
  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': ['Store', 'LocalBusiness'],
    '@id': 'https://hamperskochi.com/#store',
    name: 'HamPers Kochi',
    alternateName: 'The Kochi Atelier',
    description:
      'Handcrafted luxury gift hampers curated in Kochi, Kerala. Heirloom brass keepsakes, Kasavu silks, single-estate teas, Belgian chocolates, and bespoke wax-sealed calligraphy with express all-India delivery.',
    url: 'https://hamperskochi.com',
    telephone: '+91-96455-56010',
    email: 'concierge@thekochiatelier.com',
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Credit Card, Debit Card, UPI, Net Banking',
    logo: 'https://hamperskochi.com/icon.svg',
    image: [
      'https://hamperskochi.com/images/front.jpg',
      'https://hamperskochi.com/images/1001373001.jpg.jpeg',
    ],
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Fort Kochi / Ernakulam',
      addressLocality: 'Kochi',
      addressRegion: 'Kerala',
      postalCode: '682001',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.0354402,
      longitude: 76.3371076,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: [
          'Monday',
          'Tuesday',
          'Wednesday',
          'Thursday',
          'Friday',
          'Saturday',
          'Sunday',
        ],
        opens: '09:00',
        closes: '21:00',
      },
    ],
    sameAs: [
      'https://www.instagram.com/hampers_kochi/',
      'https://maps.google.com/?q=HamPers+Kochi',
    ],
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What makes HamPers Kochi luxury hampers unique?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every hamper from HamPers Kochi is hand-assembled in our Fort Kochi atelier. We reject generic bulk items in favor of authentic Kerala heritage keepsakes—hand-cast brass Vilakkus, Balaramapuram Kasavu silks, single-estate Nilgiri teas, Wayanad artisanal chocolates, and handwritten calligraphy on handmade cotton paper sealed with hot wax.',
        },
      },
      {
        '@type': 'Question',
        name: 'What are your delivery timelines within Kochi and across India?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Every creation is handcrafted on a bespoke pre-order basis for pristine freshness. For Kochi and Ernakulam, pre-orders are hand-delivered upon readiness or on your scheduled date. For all-India delivery, we ship via priority air courier with insulated thermal packaging and ice-pack protection, reaching major metros (Mumbai, Delhi, Bengaluru, Chennai, Hyderabad) within 2 to 4 business days.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can I personalize my hamper with custom items or calligraphy notes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes, absolutely. Every hamper comes with a complimentary handwritten wax-sealed greeting note on archival parchment paper. You can also customize trunk ribbons, brass keepsakes, tea blends, or request bespoke corporate debossing directly through our WhatsApp concierge.',
        },
      },
      {
        '@type': 'Question',
        name: 'Do you cater to bulk corporate gifting and wedding hampers?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. We specialize in executive corporate hampers and royal wedding gifting suites. We provide 24k gold foil logo debossing, customized brand story cards, multi-recipient doorstep dispatch to 28,000+ pincodes, and GST-compliant invoicing.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do you keep chocolates, bakes, and perishables fresh during shipping?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We use premium insulated thermal box liners, vacuum-sealed gourmet containers, and pharmaceutical-grade reusable food-safe gel ice packs that preserve delicate artisanal chocolates and confections at optimal temperatures throughout national air transit.',
        },
      },
      {
        '@type': 'Question',
        name: 'Where is HamPers Kochi atelier located, and can I pick up in person?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Our design atelier and studio are based in Kochi, Kerala. You can arrange direct studio pickup or concierge delivery anywhere in the city by coordinating with our concierge at +91 96455 56010.',
        },
      },
    ],
  };

  const breadcrumbsSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://hamperskochi.com/',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Kerala Artisanal Hampers',
        item: 'https://hamperskochi.com/#occasions',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Luxury Gift Collections Kochi',
        item: 'https://hamperskochi.com/#bestsellers',
      },
    ],
  };

  const curatorPersonSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Ann & The Kochi Atelier Curators',
    jobTitle: 'Founder & Master Curator',
    worksFor: {
      '@type': 'Organization',
      name: 'HamPers Kochi',
      url: 'https://hamperskochi.com',
    },
    description:
      'Master artisan curator celebrating Kerala craft heritage through luxury keepsake gifting, heirloom brasscraft, and single-origin gourmet provisions.',
    sameAs: 'https://www.instagram.com/hampers_kochi/',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbsSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(curatorPersonSchema) }}
      />
    </>
  );
}
