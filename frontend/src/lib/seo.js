// Shared SEO helpers: canonical site origin and JSON-LD schema builders.
// Schema is rendered per-route by the <Seo> component (React 19 hoists the
// document metadata tags into <head>; JSON-LD is rendered inline and is valid
// anywhere in the document for crawlers / AI assistants).

export const SITE = 'https://lanos-logic.com';

export const ORG = {
  '@type': 'Organization',
  name: 'Lanos Logic',
  url: SITE,
};

export const absoluteUrl = (path = '/') =>
  path.startsWith('http') ? path : `${SITE}${path}`;

// BreadcrumbList from [{ name, path }] items.
export const breadcrumb = (items) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((item, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name: item.name,
    item: absoluteUrl(item.path),
  })),
});

// Service schema for a service-detail page.
export const serviceSchema = (service, { areaServed } = {}) => ({
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: service.name,
  serviceType: service.serviceType || `${service.name} Automation`,
  provider: ORG,
  description: service.shortDescription,
  areaServed: areaServed || ['US', 'GB', 'CA', 'AU'],
  url: absoluteUrl(service.href),
});
