export function SchemaMarkup() {
  const siteUrl = 'https://suryasiddamurthi.is-a.dev';

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Surya Narayana Siddamurthi',
    url: siteUrl,
    image: `${siteUrl}/og-image.png`,
    mainEntityOfPage: siteUrl,
    sameAs: [
      'https://github.com/surya-narayana-siddamurthi',
      'https://linkedin.com/in/surya-narayana-siddamurthi',
      'https://x.com/suryasiddamurthi',
    ],
    jobTitle: [
      'AI Engineer',
      'Full-Stack Engineer',
      'Generative AI Engineer',
      'AI Systems Architect',
    ],
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    description: 'Surya Narayana Siddamurthi is a Bengaluru-based AI and full-stack engineer building production GenAI systems, voice AI platforms, RAG applications, and FastAPI/Next.js products.',
    knowsAbout: [
      'Artificial Intelligence',
      'Generative AI',
      'Machine Learning',
      'Large Language Models',
      'Retrieval-Augmented Generation',
      'Voice AI',
      'AI Agents',
      'Full-Stack Development',
      'Python',
      'FastAPI',
      'LangChain',
      'LangGraph',
      'CrewAI',
      'Docker',
      'PostgreSQL',
      'Redis',
      'Next.js',
      'React',
      'TypeScript',
    ],
    hasOccupation: {
      '@type': 'Occupation',
      name: 'AI and Full-Stack Engineer',
      skills: 'Generative AI, RAG, Voice AI, Python, FastAPI, LangChain, LangGraph, Next.js, React, TypeScript',
      occupationLocation: {
        '@type': 'City',
        name: 'Bengaluru',
      },
    },
    alumniOf: {
      '@type': 'CollegeOrUniversity',
      name: 'NBKR Institute of Science and Technology (NBKRIST)',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Surya Narayana Siddamurthi Portfolio',
    url: siteUrl,
    description: 'Portfolio of Surya Narayana Siddamurthi, an AI and full-stack engineer from Bengaluru.',
    publisher: {
      '@type': 'Person',
      name: 'Surya Narayana Siddamurthi',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Surya Narayana Siddamurthi',
    url: siteUrl,
    logo: `${siteUrl}/og-image.png`,
    sameAs: [
      'https://github.com/surya-narayana-siddamurthi',
      'https://linkedin.com/in/surya-narayana-siddamurthi',
      'https://x.com/suryasiddamurthi',
    ],
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    areaServed: {
      '@type': 'GeoCircle',
      geoMidpoint: {
        '@type': 'GeoCoordinates',
        latitude: 12.9716,
        longitude: 77.5946,
      },
      geoRadius: '100000',
    },
  };

  const localBusinessSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Surya Narayana Siddamurthi - AI & Full-Stack Engineering',
    image: `${siteUrl}/og-image.png`,
    url: siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bengaluru',
      addressRegion: 'Karnataka',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 12.9716,
      longitude: 77.5946,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    priceRange: '$$',
  };

  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    name: 'Surya Narayana Siddamurthi - AI & Full-Stack Engineer',
    url: siteUrl,
    description: 'Professional portfolio for Surya Narayana Siddamurthi, focused on GenAI systems, AI agents, voice AI, RAG applications, and full-stack engineering.',
    mainEntity: personSchema,
  };

  const serviceCatalogSchema = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'AI and Full-Stack Engineering Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Generative AI application development',
          description: 'Production GenAI systems using LLMs, RAG, agents, and reliable backend architecture.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Voice AI automation',
          description: 'Real-time speech, telephony, WebSocket, and workflow automation systems.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Full-stack product engineering',
          description: 'FastAPI, Next.js, React, TypeScript, PostgreSQL, Redis, and cloud-ready product builds.',
        },
      },
    ],
  };

  const jsonLd = [
    personSchema,
    webSiteSchema,
    organizationSchema,
    localBusinessSchema,
    profilePageSchema,
    serviceCatalogSchema,
  ];

  return (
    <script
      id="schema-markup"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, '\\u003c') }}
    />
  );
}
