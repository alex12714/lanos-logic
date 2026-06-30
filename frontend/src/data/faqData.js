// FAQ content for the HomePage, service-detail pages and industry pages.
// Phrased to mirror how prospects prompt AI assistants ("How much does voice
// AI cost?", "What is document automation?"). Flagship pages have hand-written
// FAQs; every other service/industry gets accurate FAQs built from its own
// data (name, description, features, benefits, stats) so coverage is complete.

export const homeFaqs = [
  {
    q: 'What AI automation services does Lanos Logic offer?',
    a: 'Lanos Logic offers AI Agents, Voice AI Agents, Vector Database Solutions, Document Automation, Process Automation, Social Media Automation, Communication Automation, Mobile App Development, and Analytics & Insights, plus enterprise cybersecurity (vulnerability scanning, penetration testing, and systems hardening).',
  },
  {
    q: 'How much does AI automation cost?',
    a: 'Every Lanos Logic solution is custom-scoped, so pricing depends on the workflows automated and the integrations required. We start with a free discovery call and a BPMN analysis, then quote a fixed project price before any build begins — no open-ended hourly billing.',
  },
  {
    q: 'How long does an AI automation project take?',
    a: 'Most automation workflows are deployed within 2-6 weeks. Complex enterprise integrations may take 8-12 weeks. We follow a 3-phase process: Analyze, Prepare, and Implement.',
  },
  {
    q: 'What results can businesses expect from AI automation?',
    a: 'Clients typically see up to a 300% increase in operational capacity, 85% reduction in processing time, 68% higher response rates, 42% higher conversion rates, 75% faster lead qualification, and around 3.5x ROI on their automation investment.',
  },
  {
    q: 'Which industries does Lanos Logic serve?',
    a: 'We serve marketing and sales agencies, e-commerce, healthcare, real estate, logistics, education, professional services, manufacturing, U.S. government and federal agencies, pharmaceutical, life sciences, and legal firms.',
  },
  {
    q: 'What technology stack does Lanos Logic use?',
    a: 'We build on Claude AI, Make.com, n8n, Zapier, AirTable, GoHighLevel, Twilio, VectorShift, VAPI, Flutter, Stripe, DocuSign, ClickUp, Miro, and PandaDoc, selecting the right tools for each client’s existing stack.',
  },
  {
    q: 'Do I need technical knowledge to work with Lanos Logic?',
    a: 'No. We map your existing processes, design the automation, build it, and provide monitoring and support. You get a documented BPMN blueprint and a clear path to results without needing an in-house engineering team.',
  },
];

// Hand-written FAQs for flagship services, keyed by service id.
const SERVICE_FAQS = {
  'voice-ai-agents': [
    {
      q: 'How much does a voice AI agent cost?',
      a: 'Voice AI is priced per project based on call volume, the number of intents handled, and telephony usage. We scope it on a free discovery call and quote a fixed price up front. Most clients recover the cost quickly by capturing leads and calls that would otherwise be missed.',
    },
    {
      q: 'What is a voice AI agent?',
      a: 'A voice AI agent is a natural-sounding virtual assistant that answers and places phone calls, books appointments, qualifies leads, and handles support 24/7 with human-like conversation, escalating to a human when needed.',
    },
    {
      q: 'Can the voice agent transfer calls to a human?',
      a: 'Yes. Our voice agents handle the conversation autonomously and perform a seamless warm hand-off to a human team member whenever a call needs escalation or a request falls outside their scope.',
    },
    {
      q: 'How long does it take to launch a voice AI agent?',
      a: 'A focused voice AI deployment is typically live within 2-4 weeks, including script design, telephony integration, testing, and tuning against real call recordings.',
    },
  ],
  'ai-agents': [
    {
      q: 'What is an AI agent and what can it do?',
      a: 'An AI agent is an intelligent virtual assistant that automates customer interactions, answers queries using natural language, and executes multi-step tasks 24/7 with contextual understanding of your business.',
    },
    {
      q: 'How much does an AI agent cost?',
      a: 'AI agents are custom-built and priced per project after a free discovery call. Cost depends on the channels covered, the integrations required, and the complexity of the tasks the agent automates.',
    },
    {
      q: 'Will an AI agent replace my support team?',
      a: 'No — it augments them. AI agents handle high-volume, repetitive queries instantly so your team can focus on complex, high-value conversations, with smooth hand-off when human judgement is needed.',
    },
    {
      q: 'How long does it take to deploy an AI agent?',
      a: 'Most AI agents are deployed within 2-6 weeks, following our Analyze, Prepare, and Implement process and grounded in your real knowledge base and workflows.',
    },
  ],
  'document-automation': [
    {
      q: 'What is document automation?',
      a: 'Document automation uses AI to extract data, manage contracts, and run approval workflows automatically — including OCR, data extraction, e-signature, and compliance-ready audit trails — turning hours of manual document handling into minutes.',
    },
    {
      q: 'How much time can document automation save?',
      a: 'Clients routinely cut document processing time by 80-90% and remove entire categories of manual data entry. One client automated 9,600 compliance certificates a year and reduced four full-time roles.',
    },
    {
      q: 'Is document automation compliant and auditable?',
      a: 'Yes. Every workflow maintains audit trails and is designed to meet compliance standards, with AI-assisted accuracy that eliminates common manual data-entry errors.',
    },
    {
      q: 'How much does document automation cost?',
      a: 'Pricing is project-based and scoped on a free discovery call after we map your document workflows with a BPMN analysis, so you get a fixed price before any build starts.',
    },
  ],
  'vector-database-solutions': [
    {
      q: 'What is a vector database and why do I need one?',
      a: 'A vector database stores the meaning of your content as embeddings so you can run semantic search and retrieval-augmented generation (RAG). It lets AI answer questions grounded in your proprietary documents instead of guessing.',
    },
    {
      q: 'What is RAG (retrieval-augmented generation)?',
      a: 'RAG combines a vector database with a language model: relevant passages are retrieved from your data and given to the model so its answers are accurate, current, and traceable to your sources.',
    },
    {
      q: 'How large a document collection can a vector database handle?',
      a: 'Our architectures scale from thousands to billions of embeddings. One client unified 15+ years of research into semantic search across 2M+ documents, cutting discovery time from weeks to minutes.',
    },
    {
      q: 'How much does a vector database solution cost?',
      a: 'Cost depends on data volume, ingestion pipelines, and hosting. We scope it on a free discovery call and quote a fixed project price for the architecture and implementation.',
    },
  ],
  'agentic-seo-geo': [
    {
      q: 'What is GEO (Generative Engine Optimization)?',
      a: 'GEO, also called Answer Engine Optimization, is the practice of optimizing a website so AI assistants like ChatGPT, Claude, Perplexity, Gemini, and Google AI Overviews cite it in their generated answers. Instead of chasing classic keyword rankings, GEO makes your content easy for large language models to find, understand, and quote by name.',
    },
    {
      q: 'How is GEO different from traditional SEO?',
      a: 'Traditional SEO optimizes for ranking on a page of blue links; GEO optimizes for being the source an AI quotes inside a single generated answer. The two overlap on fundamentals (crawlability, clear content, structured data) but GEO adds AI-crawler access, llms.txt knowledge bases, schema for machine reading, and content structured for the hybrid lexical+semantic retrieval AI engines use.',
    },
    {
      q: 'Which AI search engines does Lanos Logic optimize for?',
      a: 'We optimize for the assistants and AI search surfaces buyers actually use: ChatGPT and ChatGPT Search, Claude, Perplexity, Google AI Overviews and Gemini, and Bing Copilot. We make sure their crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot and others) can access your site and that your content is structured to be retrieved and cited.',
    },
    {
      q: 'How do you get a website cited by ChatGPT or Perplexity?',
      a: 'We audit how AI systems see your site, open access to AI crawlers, add JSON-LD schema and an llms.txt/llms-full.txt knowledge base, and restructure content into self-contained, question-and-answer passages that score well in both keyword and semantic retrieval (the Reciprocal Rank Fusion that AI engines use to pick sources). We can also add agent-native surfaces like an MCP endpoint so assistants can read your business directly.',
    },
    {
      q: 'How much does agentic SEO / GEO cost and how long does it take?',
      a: 'It is scoped on a free discovery call and quoted as a fixed project price based on the size of your site and the depth of optimization. An initial GEO audit and the core structural work are typically delivered within 2-6 weeks, with ongoing measurement of where AI engines mention your brand so we can keep closing gaps.',
    },
  ],
};

const list = (items) => items.join(', ');

// Build accurate FAQs from a service’s own data when no hand-written set exists.
const buildServiceFaqs = (service) => [
  {
    q: `What is ${service.name}?`,
    a: service.shortDescription,
  },
  {
    q: `What does Lanos Logic’s ${service.name} include?`,
    a: `Our ${service.name} service includes ${list(service.features)}.`,
  },
  {
    q: `How can ${service.name} help my business?`,
    a: service.benefits
      .map((benefit) => `${benefit.title}: ${benefit.description}`)
      .join(' '),
  },
  {
    q: `How much does ${service.name} cost and how do I get started?`,
    a: `${service.name} is custom-built and scoped on a free discovery call, then quoted as a fixed project price. Most solutions are deployed within 2-6 weeks following our Analyze, Prepare, and Implement process.`,
  },
];

export const getServiceFaqs = (service) =>
  SERVICE_FAQS[service.id] || buildServiceFaqs(service);

// Top service names offered to every industry (used in industry FAQs).
const CORE_INDUSTRY_SERVICES =
  'AI Agents, Voice AI Agents, Document Automation, and Process Automation';

export const getIndustryFaqs = (industry) => [
  {
    q: `How can AI automation help ${industry.name}?`,
    a: industry.description,
  },
  {
    q: `What results can ${industry.name} expect from automation?`,
    a: `Typical outcomes for ${industry.name} include ${list(
      industry.stats
    )}.`,
  },
  {
    q: `Which automation services does Lanos Logic offer for ${industry.name}?`,
    a: `For ${industry.name} we most often deploy ${CORE_INDUSTRY_SERVICES}, tailored to your existing tools and workflows.`,
  },
  {
    q: `How do we get started with AI automation for ${industry.name}?`,
    a: 'Book a free discovery call. We map your current processes with a BPMN analysis, identify the highest-ROI automations, and quote a fixed project price before any build begins.',
  },
];

// Build accurate FAQs from a case study's own data (title, description, stats,
// platforms, category, country, year, delivery time). Everything is drawn from
// the case study record — no invented figures — so the answers always match the
// visible page. Phrased to mirror how people ask AI assistants about a project.
const caseStudyResults = (caseStudy) => {
  if (!Array.isArray(caseStudy.stats) || caseStudy.stats.length === 0) {
    return '';
  }
  return caseStudy.stats
    .map((stat) => `${stat.value} ${stat.label}`.trim())
    .filter(Boolean)
    .join(', ');
};

export const getCaseStudyFaqs = (caseStudy) => {
  const faqs = [];

  faqs.push({
    q: `What did Lanos Logic build in the "${caseStudy.title}" project?`,
    a: caseStudy.description,
  });

  const results = caseStudyResults(caseStudy);
  if (results) {
    faqs.push({
      q: 'What results did this automation deliver?',
      a: `Key outcomes from this project: ${results}.`,
    });
  }

  if (Array.isArray(caseStudy.platforms) && caseStudy.platforms.length) {
    faqs.push({
      q: 'Which platforms and tools powered this solution?',
      a: `This ${
        caseStudy.category || 'automation'
      } project was built using ${list(caseStudy.platforms)}.`,
    });
  }

  // Delivery / client context, assembled only from fields that exist.
  const contextParts = [];
  if (caseStudy.daysToComplete) {
    contextParts.push(
      `delivered in ${caseStudy.daysToComplete} ${
        caseStudy.daysToComplete === 1 ? 'day' : 'days'
      }`
    );
  }
  if (caseStudy.country) contextParts.push(`for a client in ${caseStudy.country}`);
  if (caseStudy.year) contextParts.push(`in ${caseStudy.year}`);
  if (contextParts.length) {
    const sentence =
      contextParts.join(', ').charAt(0).toUpperCase() +
      contextParts.join(', ').slice(1);
    faqs.push({
      q: 'How long did the project take and where was the client based?',
      a: `${sentence}.`,
    });
  }

  faqs.push({
    q: 'Can Lanos Logic build something similar for my business?',
    a: `Yes. Projects like this start with a free discovery call where we map your processes with a BPMN analysis, identify the highest-ROI automations, and quote a fixed project price before any build begins.${
      caseStudy.category
        ? ` We have delivered automation across ${caseStudy.category} and many other sectors.`
        : ''
    }`,
  });

  return faqs;
};

// Hand-written, accurate FAQs for individual blog posts, keyed by slug. Answers
// are drawn from the post's own content so they are factual and quotable. Posts
// without a curated set fall back to a concise summary-based FAQ.
const BLOG_FAQS = {
  'we-now-offer-cybersecurity-services': [
    {
      q: 'What cybersecurity services does Lanos Logic offer?',
      a: 'Lanos Logic offers three interconnected enterprise cybersecurity services: Security Vulnerability Scanning (continuous identification of known weaknesses), Penetration Testing (authorised simulated attacks by certified security engineers), and Systems Hardening (proactive configuration hardening to reduce attack surface).',
    },
    {
      q: 'What is the difference between vulnerability scanning and penetration testing?',
      a: 'Vulnerability scanning is the continuous, automated process of identifying known weaknesses across web apps, APIs, and cloud infrastructure, with CVSS-scored findings mapped to business risk. Penetration testing goes further: it is an authorised, simulated attack by certified engineers who think like adversaries, covering authentication bypass, injection attacks, broken access control, and business logic flaws.',
    },
    {
      q: 'Which security standards and frameworks does Lanos Logic follow?',
      a: 'Engagements are grounded in recognised standards: the OWASP Top 10, WSTG, and ASVS for application security; the NIST Cybersecurity Framework (CSF 2.0); CIS Controls v8 and CIS Benchmarks for hardening; and MITRE ATT&CK for threat modelling. Reports are accepted as evidence for SOC 2 Type II, ISO 27001, PCI-DSS, and HIPAA audits.',
    },
    {
      q: 'Who are these cybersecurity services for?',
      a: 'They are designed for organisations that have built real systems and now need to protect them — SaaS companies approaching their first SOC 2 audit, fintech and healthtech startups handling regulated data, enterprises integrating AI into customer-facing workflows, and government contractors requiring FedRAMP-aligned security posture.',
    },
    {
      q: 'How do I get started with a security engagement?',
      a: 'Every security engagement begins with a free 30-minute scoping call where Lanos Logic maps your digital estate, understands your compliance obligations, and identifies which service delivers the highest immediate risk reduction. A risk assessment is returned within 48 hours.',
    },
  ],
};

export const getBlogFaqs = (post) => {
  if (BLOG_FAQS[post.slug]) return BLOG_FAQS[post.slug];
  if (!post.summary) return [];
  return [
    {
      q: `What is "${post.title}" about?`,
      a: post.summary,
    },
  ];
};

// Static, accurate FAQs for the About page — drawn from real company facts.
export const aboutFaqs = [
  {
    q: 'What does Lanos Logic do?',
    a: 'Lanos Logic is an AI automation company that helps businesses transform their operations through intelligent automation — AI agents, voice AI, document and process automation, vector databases, and custom mobile apps — plus enterprise cybersecurity. Solutions are delivered by a team of AI and automation experts.',
  },
  {
    q: 'Where is Lanos Logic based and which regions does it serve?',
    a: 'Lanos Logic is headquartered at 24 E Washington St Suite 875, Chicago, IL 60602, USA, and serves businesses across the United States, United Kingdom, and globally via remote delivery.',
  },
  {
    q: 'What are Lanos Logic’s core values?',
    a: 'Lanos Logic is mission-driven (helping businesses harness AI to achieve their goals), client-focused (every solution is tailored to the client’s unique needs), committed to excellence in everything from code to customer service, and focused on innovation by staying at the forefront of AI technology.',
  },
  {
    q: 'How does Lanos Logic approach a new automation project?',
    a: 'Lanos Logic follows a 3-phase process: Analyze (plan and blueprint business processes using BPMN), Prepare (refine and align processes with future-state planning), and Implement (deploy automations that deliver immediate, measurable results).',
  },
  {
    q: 'Do I need an in-house engineering team to work with Lanos Logic?',
    a: 'No. Lanos Logic maps your existing processes, designs the automation, builds it, and provides monitoring and support — so you get results without needing an in-house engineering team.',
  },
];

// Static, accurate FAQs for the Contact page — drawn from real contact details.
export const contactFaqs = [
  {
    q: 'How do I contact Lanos Logic?',
    a: 'You can email hello@lanos-logic.com, call +1 (518) 864 3528 in the US or +44 1313 813160 in the UK, or use the contact form on this page. Business hours are 9:00 AM to 6:00 PM, Monday to Friday (CST).',
  },
  {
    q: 'How do I book a free consultation with Lanos Logic?',
    a: 'Use the embedded calendar on this page to schedule a free 30-minute discovery call with the team, or visit the Book page to choose between a Discovery Call and a deeper Business Analysis session.',
  },
  {
    q: 'How quickly will Lanos Logic respond to my enquiry?',
    a: 'The team responds to enquiries submitted through the contact form during business hours (9:00 AM to 6:00 PM CST, Monday to Friday). For the fastest path to a tailored recommendation, book a discovery call directly from the calendar.',
  },
  {
    q: 'Is the discovery call free and is there any commitment?',
    a: 'Yes — the discovery call is free and carries no commitment. It is a chance to understand your business challenges, explore automation opportunities, and get expert recommendations tailored to your needs.',
  },
  {
    q: 'Where is Lanos Logic located?',
    a: 'Lanos Logic is located at 24 E Washington St Suite 875, Chicago, IL 60602, USA, and works with clients across the US, UK, and worldwide.',
  },
];
