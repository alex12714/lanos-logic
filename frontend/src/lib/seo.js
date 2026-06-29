// Shared SEO helpers: canonical site origin and JSON-LD schema builders.
// Schema is rendered per-route by the <Seo> component (React 19 hoists the
// document metadata tags into <head>; JSON-LD is rendered inline and is valid
// anywhere in the document for crawlers / AI assistants).

export const SITE = 'https://lanos-logic.com';

export const ORG = {
  '@type': 'Organization',
  name: 'Lanos Logic',
  url: SITE,
  logo: {
    '@type': 'ImageObject',
    url: `${SITE}/icon.svg`,
  },
};

export const absoluteUrl = (path = '/') =>
  path.startsWith('http') ? path : `${SITE}${path}`;

// Convert a human-readable date (e.g. "May 13, 2026") to an ISO 8601 calendar
// date (YYYY-MM-DD) for schema.org date fields. Uses local date components to
// avoid UTC off-by-one for date-only values. Returns the original string if it
// cannot be parsed, and undefined for empty input (dropped by JSON.stringify).
export const toISODate = (value) => {
  if (!value) return undefined;
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;
  const year = parsed.getFullYear();
  const month = String(parsed.getMonth() + 1).padStart(2, '0');
  const day = String(parsed.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

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

// Extract a YouTube video id from common URL shapes (watch?v=, youtu.be/,
// /embed/). Returns null when no id can be found.
export const youTubeId = (url = '') => {
  const match = String(url).match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{6,})/
  );
  return match ? match[1] : null;
};

// VideoObject schema for an embedded YouTube video. Only honestly-sourceable
// fields are populated: name, description, thumbnailUrl (YouTube's canonical
// thumbnail), embedUrl and contentUrl. uploadDate is intentionally omitted when
// it cannot be sourced (undefined keys are dropped by JSON.stringify).
export const youTubeVideoObject = (url, { name, description, uploadDate } = {}) => {
  const id = youTubeId(url);
  if (!id) return null;
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name,
    description,
    thumbnailUrl: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
    embedUrl: `https://www.youtube.com/embed/${id}`,
    contentUrl: `https://www.youtube.com/watch?v=${id}`,
    ...(uploadDate ? { uploadDate } : {}),
  };
};

// DefinedTermSet schema for a glossary. items: [{ term, definition }].
export const definedTermSet = ({ name, description, url, items }) => ({
  '@context': 'https://schema.org',
  '@type': 'DefinedTermSet',
  name,
  description,
  url: absoluteUrl(url),
  hasDefinedTerm: items.map((item) => ({
    '@type': 'DefinedTerm',
    name: item.term,
    description: item.definition,
    inDefinedTermSet: absoluteUrl(url),
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
