// Solution categories: one source for the Solutions menu, the category pages
// (/solutions/:categoryId), and the sitemap. Service ids must exist in
// mock.js services[]; navName/desc are the short labels used in the menu.
export const categories = [
  {
    id: 'ai-automation',
    name: 'AI & Automation',
    href: '/solutions/ai-automation',
    accent: 'text-amber-400',
    image: '/categories/ai-automation.jpg',
    tagline: 'AI agents and workflows that take work off your team',
    intro:
      'We build AI agents, voice agents, and automated workflows that handle repetitive work around the clock - answering customers, processing requests, and moving data between the tools you already use. Every project starts with a free audit and a fixed price.',
    services: [
      { id: 'ai-agents', navName: 'AI Agents', desc: 'Intelligent automation, 24/7', icon: 'Bot' },
      { id: 'voice-ai-agents', navName: 'Voice AI Agents', desc: 'Natural voice interactions', icon: 'Phone' },
      { id: 'process-automation', navName: 'Process Automation', desc: 'End-to-end workflow automation', icon: 'Workflow' },
      { id: 'social-media-automation', navName: 'Social Media Automation', desc: 'AI content & scheduling', icon: 'Share2' },
      { id: 'communication-automation', navName: 'Communication Automation', desc: 'SMS, voice & multi-channel', icon: 'MessageSquare' },
    ],
  },
  {
    id: 'data-intelligence',
    name: 'Data & Intelligence',
    href: '/solutions/data-intelligence',
    accent: 'text-purple-400',
    image: '/categories/data-intelligence.jpg',
    tagline: 'Turn documents, data, and content into answers',
    intro:
      'We make your information work harder: semantic search over your documents, analytics that show what is really happening, document processing that reads and files paperwork, visibility in AI search, and the mobile apps that put it all in your team\'s hands.',
    services: [
      { id: 'vector-database-solutions', navName: 'Vector Database Solutions', desc: 'Semantic search at scale', icon: 'Database' },
      { id: 'analytics-insights', navName: 'Analytics & Insights', desc: 'Data-driven decisions', icon: 'BarChart3' },
      { id: 'agentic-seo-geo', navName: 'Agentic SEO & GEO', desc: 'Get cited by AI search', icon: 'Sparkles' },
      { id: 'document-automation', navName: 'Document Automation', desc: 'Intelligent document processing', icon: 'FileText' },
      { id: 'mobile-app-development', navName: 'Mobile App Development', desc: 'Cross-platform Flutter apps', icon: 'Smartphone' },
    ],
  },
  {
    id: 'security',
    name: 'Security',
    href: '/solutions/security',
    accent: 'text-red-400',
    image: '/categories/security.jpg',
    tagline: 'Always-on security that keeps itself current',
    intro:
      'Security delivered as a continuous, AI-assisted system instead of a one-off audit: testing inside your development pipeline, scanning of everything that is live, penetration testing, and hardening of servers and cloud - plus a white-label service for software agencies.',
    services: [
      { id: 'application-security-testing', navName: 'App Security Testing', desc: 'SAST, DAST, SCA & secrets', icon: 'Bug' },
      { id: 'security-vulnerability-scanning', navName: 'Vulnerability Scanning', desc: 'Attack surface & CVE detection', icon: 'ScanLine' },
      { id: 'penetration-testing', navName: 'Penetration Testing', desc: 'Adversarial security testing', icon: 'ShieldAlert' },
      { id: 'systems-hardening', navName: 'Hardening & Cloud Posture', desc: 'CIS hardening & CSPM', icon: 'ShieldCheck' },
      { id: 'white-label-security-agencies', navName: 'For Agencies (White-Label)', desc: 'Security for your clients', icon: 'Handshake' },
    ],
  },
];

export const getCategory = (id) => categories.find((c) => c.id === id);
