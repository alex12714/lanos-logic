import React from 'react';
import { SITE, DEFAULT_OG_IMAGE, ogImageForPath } from '../../lib/seo';

// Per-route document metadata. React 19 hoists <title>, <meta> and <link> into
// <head> automatically. Constant tags that never vary (og:site_name,
// twitter:card, keywords, author) live in public/index.html. The og:image /
// twitter:image pair is PER-ROUTE: a unique 1200x630 card is generated for each
// route at build time (scripts/generate-og-images.mjs) and served from
// /og/<slug>.png. Pages may opt out via the `image` prop (absolute or
// root-relative); when omitted the per-route card is used, falling back to the
// global /og-image.png for off-site paths. JSON-LD blocks are rendered inline
// (valid anywhere in the document) and captured into the prerendered HTML.
const Seo = ({
  title,
  description,
  path = '/',
  type = 'website',
  noindex = false,
  jsonLd,
  image,
}) => {
  const url = path.startsWith('http') ? path : `${SITE}${path}`;
  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];

  // Resolve the OG/Twitter image. Explicit `image` wins (opt-out / custom);
  // otherwise derive the per-route card from the canonical pathname. External
  // paths (rare) fall back to the global card.
  let ogImage;
  if (image) {
    ogImage = image.startsWith('http') ? image : `${SITE}${image}`;
  } else if (path.startsWith('http')) {
    ogImage = DEFAULT_OG_IMAGE;
  } else {
    ogImage = ogImageForPath(path);
  }

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
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
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
