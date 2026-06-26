import Script from 'next/script';

export function SchemaMarkup() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Surya Narayana Siddamurthi',
    url: 'https://suryasiddamurthi.is-a.dev',
    image: 'https://suryasiddamurthi.is-a.dev/profile-image.jpg',
    sameAs: [
      'https://github.com/surya-narayana-siddamurthi',
      'https://linkedin.com/in/surya-narayana-siddamurthi',
      'https://x.com/suryasiddamurthi',
    ],
    jobTitle: 'AI & Full-Stack Engineer',
    worksFor: {
      '@type': 'Organization',
      name: 'Freelance',
    },
    description: 'A passionate AI & Full-Stack Engineer building intelligent systems at the intersection of full-stack development and machine learning.',
    knowsAbout: [
      'Artificial Intelligence',
      'Machine Learning',
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
    locationCreated: {
      '@type': 'Place',
      name: 'Bengaluru, Karnataka, India',
    },
  };

  const webSiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'Surya Narayana Siddamurthi Portfolio',
    url: 'https://suryasiddamurthi.is-a.dev',
    description: 'Portfolio of Surya Narayana Siddamurthi - AI & Full-Stack Engineer from Bengaluru',
    potentialAction: {
      '@type': 'SearchAction',
      target: 'https://suryasiddamurthi.is-a.dev/search?q={search_term_string}',
      'query-input': 'required name=search_term_string',
    },
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
    url: 'https://suryasiddamurthi.is-a.dev',
    logo: 'https://suryasiddamurthi.is-a.dev/logo.png',
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
    image: 'https://suryasiddamurthi.is-a.dev/profile-image.jpg',
    url: 'https://suryasiddamurthi.is-a.dev',
    telephone: '+91-XXXXXXXXXX',
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

  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
    </>
  );
}
