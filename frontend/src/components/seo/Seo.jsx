import React from 'react';
import { SITE } from '../../lib/seo';

// Per-route document metadata. React 19 hoists <title>, <meta> and <link> into
// <head> automatically. Constant tags (og:image, og:site_name, twitter:card,
// twitter:image, keywords, author, robots) live in public/index.html so they
// are never duplicated here. JSON-LD blocks are rendered inline (valid anywhere
// in the document) and are captured into the prerendered static HTML.
const Seo = ({
  title,
  description,
  path = '/',
  type = 'website',
  noindex = false,
  jsonLd,
}) => {
  const url = path.startsWith('http') ? path : `${SITE}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta
        name="robots"
        content={noindex ? 'noindex, follow' : 'index, follow'}
      />
      <link rel="canonical" href={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {blocks.map((block, index) => (
        <script
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block) }}
        />
      ))}
    </>
  );
};

export default Seo;
