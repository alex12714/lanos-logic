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
