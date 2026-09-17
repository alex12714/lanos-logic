// Mock data for Lanos Logic website

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Solutions", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" },
  { label: "Blog", href: "/blog" }
];

export const heroFeatures = [
  "AI-Powered",
  "Vector Databases",
  "Enterprise Solutions",
  "Proven Results"
];

export const platformLogos = [
  { name: "Make.com", logo: "/make-logo.webp" },
  { name: "AirTable", logo: "/airtable-logo.webp" },
  { name: "DocuSign", logo: "/docusign-logo-new.png" },
  { name: "Miro", logo: "/miro-logo.webp" },
  { name: "GoHighLevel", logo: "/gohighlevel-logo-new.webp" },
  { name: "ClickUp", logo: "/clickup-logo.png" },
  { name: "Claude AI", logo: "/claude-logo.webp" },
  { name: "VectorShift", logo: "/vectorshift-logo-new.webp" },
  { name: "Flutter", logo: "/flutter-logo.webp" },
  { name: "Twilio", logo: "/twilio-logo.webp" },
  { name: "Stripe", logo: "/stripe-logo.webp" },
  { name: "VAPI", logo: "/vapi-logo.webp" }
];

export const industries = [
  {
    id: "marketing",
    name: "Marketing Agencies",
    description: "AI automation helps marketing agencies automate campaign management, content creation, analytics reporting, and client onboarding. Lanos Logic builds automations that cut reporting time, scale content production, and nurture leads without adding headcount.",
    stats: ["50% faster client reporting", "3x more content production", "Automated lead nurturing"],
    href: "/industries/marketing-agencies"
  },
  {
    id: "sales",
    name: "Sales Agencies",
    description: "AI automation helps sales agencies streamline lead qualification, follow-ups, proposal generation, and pipeline management. Lanos Logic builds automations that qualify more leads and keep personalized follow-up sequences running automatically.",
    stats: ["40% increase in qualified leads", "Automated follow-up sequences", "Smart contract generation"],
    href: "/industries/sales-agencies"
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "AI automation helps e-commerce businesses run 24/7 customer support, inventory management, order processing, and personalized marketing. Lanos Logic builds automations that answer customers instantly and recommend products at scale.",
    stats: ["24/7 customer support", "Automated inventory alerts", "Personalized recommendations"],
    href: "/industries/ecommerce"
  },
  {
    id: "education",
    name: "Education",
    description: "Paperless automation for education: Lanos Logic replaces the paper and manual data entry behind enrolment, admissions, consent forms, and student records with automated digital workflows. The University of Minnesota cut 80% of its student-onboarding admin time with an automated intake flow we built; schools and language providers use the same approach for contracts, permissions, and parent communication.",
    stats: ["80% of onboarding admin time removed", "Paperless enrolment and consent forms", "Automated student records and messaging"],
    href: "/industries/education"
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "AI automation helps healthcare providers improve patient scheduling, billing, record management, and follow-up communications. Lanos Logic builds automations that reduce no-shows and streamline billing while keeping patient data secure.",
    stats: ["Reduced no-shows", "Streamlined billing", "Automated patient follow-ups"],
    href: "/industries/healthcare"
  },
  {
    id: "logistics",
    name: "Logistics",
    description: "AI automation helps logistics companies optimize route planning, shipment tracking, inventory management, and customer notifications. Lanos Logic builds automations that deliver real-time tracking updates and optimized delivery routes.",
    stats: ["Real-time tracking updates", "Optimized delivery routes", "Automated shipping notifications"],
    href: "/industries/logistics"
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "AI automation helps real estate firms automate lead qualification, property matching, document management, and client communications. Lanos Logic builds automations that send property alerts and process documents without manual work.",
    stats: ["Automated property alerts", "Smart document processing", "Virtual property tours"],
    href: "/industries/real-estate"
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "AI automation helps professional services firms streamline client onboarding, project management, billing, and reporting. Lanos Logic builds automations for time tracking, document generation, and self-service client portals.",
    stats: ["Automated time tracking", "Smart document generation", "Client portal access"],
    href: "/industries/professional-services"
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "AI automation helps manufacturers improve production planning, quality control, inventory management, and supply chain operations. Lanos Logic builds automations for predictive maintenance, automated quality checks, and supply chain optimization.",
    stats: ["Predictive maintenance", "Automated quality checks", "Supply chain optimization"],
    href: "/industries/manufacturing"
  },
  {
    id: "government",
    name: "Government & Public Sector",
    description: "Document automation for government: Lanos Logic builds AI document processing, records automation, and case-management workflows for public sector teams, government contractors, and state and local agencies. We automate the intake, classification, generation, and e-signature of the forms and records that move through an agency \u2014 with full audit trails, role-based access, and data-residency control.",
    stats: ["AI document classification and data extraction", "Auditable, role-based workflows", "Forms, records and e-signature automated end to end"],
    href: "/industries/government"
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical",
    description: "Pharma document automation: Lanos Logic automates the document-heavy operations around pharmaceutical work \u2014 prescription and order processing, submission and dossier assembly, SOP and label document generation, and content orchestration across the systems that hold them. We built a prescription automation flow that cut processing time by 90% and returned 47 hours a month. Vector-database retrieval makes the resulting document estate searchable by meaning, not filename.",
    stats: ["90% faster prescription processing", "Document assembly and content orchestration", "Semantic search across the document estate"],
    href: "/industries/pharmaceutical"
  },
  {
    id: "life-sciences",
    name: "Life Sciences",
    description: "AI automation helps life sciences organizations manage research data, process genomic data, integrate lab automation, and review literature faster. Lanos Logic builds semantic search and vector embeddings for AI-assisted research discovery and automated lab data integration.",
    stats: ["Semantic research discovery", "Automated lab data integration", "AI literature analysis"],
    href: "/industries/life-sciences"
  },
  {
    id: "legal",
    name: "Law Firms & Attorneys",
    description: "AI automation for law firms, attorneys, and in-house legal teams: document and contract automation, matter and case management, e-signature flows, and retrieval across your own precedent bank. One firm we worked with sends and tracks 10,000+ pre-filled contracts and reclaims 90 hours every month. For immigration practices we build full case-management platforms \u2014 see Immigration Law.",
    stats: ["10,000+ contracts automated for one firm", "90 hours a month reclaimed", "Matter, document and e-signature automation"],
    href: "/industries/legal"
  },
  {
    id: "immigration-law",
    name: "Immigration Law",
    description: "AI case management for immigration lawyers. Lanos Logic built a US immigration firm an AI-native platform covering 13 visa tracks \u2014 AI document intelligence that classifies and describes hundreds of exhibit documents, smart intake forms, drafting, USCIS PDF autofill, and a deadline engine with federal-holiday-aware H-1B premium processing countdowns. Built as a direct alternative to ManifestOS, Visalaw.ai, and Docketwise, and now running two offices.",
    stats: ["13 visa tracks supported", "USCIS PDF autofill and exhibit automation", "H-1B premium processing deadline engine"],
    href: "/industries/immigration-law"
  },
  {
    id: "financial-services",
    name: "Financial Services",
    description: "AI automation helps financial services firms streamline client onboarding, KYC/AML compliance, document processing, and regulatory reporting. Lanos Logic builds secure, audit-ready automations for fraud detection, risk analysis, and compliance workflows that keep sensitive financial data protected.",
    stats: ["Automated KYC/AML compliance", "AI-powered fraud detection", "Streamlined regulatory reporting"],
    href: "/industries/financial-services"
  }
];

export const services = [
  {
    id: "vector-database-solutions",
    name: "Vector Database Solutions",
    shortDescription: "Vector database solutions store your documents as numerical embeddings so AI can search by meaning instead of exact keywords. Lanos Logic builds enterprise-grade vector database architecture for semantic search, knowledge retrieval, and retrieval-augmented generation (RAG) across massive document collections.",
    icon: "Database",
    href: "/services/vector-database-solutions",
    features: [
      "Semantic Search & Retrieval",
      "Document Embedding Pipelines",
      "RAG Architecture Design"
    ],
    benefits: [
      { title: "Instant Knowledge Discovery", description: "Find relevant information across millions of documents in seconds using semantic similarity." },
      { title: "Enterprise RAG Systems", description: "Build retrieval-augmented generation systems that ground AI responses in your proprietary data." },
      { title: "Scalable Architecture", description: "Vector database infrastructure that scales from thousands to billions of embeddings." }
    ]
  },
  {
    id: "ai-agents",
    name: "AI Agents",
    shortDescription: "AI agents are software assistants that understand natural language to automate customer interactions, answer queries, and complete multi-step tasks 24/7. Lanos Logic builds AI agents that work around the clock and scale with demand without increasing headcount.",
    icon: "Bot",
    href: "/services/ai-agents",
    features: [
      "Natural Language Processing",
      "Contextual Understanding",
      "Multi-task Automation"
    ],
    benefits: [
      { title: "24/7 Availability", description: "Provide round-the-clock service without increasing staffing costs." },
      { title: "Reduced Response Time", description: "Instant responses to customer inquiries, improving satisfaction." },
      { title: "Scalability", description: "Handle increasing volumes of interactions without proportional cost increases." }
    ]
  },
  {
    id: "voice-ai-agents",
    name: "Voice AI Agents",
    shortDescription: "Voice AI agents are automated phone assistants that answer and place calls, qualify leads, book appointments, and handle customer support 24/7 with natural, human-like conversation. Lanos Logic builds voice AI agents that capture every call and hand off to a human team member when needed.",
    icon: "Phone",
    href: "/services/voice-ai-agents",
    features: [
      "Natural Voice Synthesis",
      "Real-time Conversation",
      "Call Routing & Handling"
    ],
    benefits: [
      { title: "Handle Calls 24/7", description: "Never miss a call with AI-powered voice agents." },
      { title: "Human-like Interactions", description: "Natural conversations that customers appreciate." },
      { title: "Seamless Handoff", description: "Transfer to human agents when needed." }
    ]
  },
  {
    id: "document-automation",
    name: "Document Automation",
    shortDescription: "Document automation uses AI to read documents, extract data, manage contracts, and run approval workflows automatically, turning hours of manual paperwork into minutes. Lanos Logic builds document automation with OCR, data extraction, e-signature, and compliance-ready audit trails.",
    icon: "FileText",
    href: "/services/document-automation",
    features: [
      "OCR & Data Extraction",
      "Contract Management",
      "Approval Workflows"
    ],
    benefits: [
      { title: "Reduce Processing Time", description: "Automate document handling from hours to minutes." },
      { title: "Eliminate Errors", description: "AI-powered accuracy in data extraction." },
      { title: "Compliance Ready", description: "Maintain audit trails and compliance standards." }
    ]
  },
  {
    id: "process-automation",
    name: "Process Automation",
    shortDescription: "Process automation connects your systems and software to run repetitive business workflows end to end without manual effort. Lanos Logic designs process automation that eliminates repetitive tasks, integrates your existing tools, and streamlines operations.",
    icon: "Workflow",
    href: "/services/process-automation",
    features: [
      "Workflow Design",
      "System Integration",
      "Task Automation"
    ],
    benefits: [
      { title: "Streamline Operations", description: "Connect systems and automate workflows." },
      { title: "Reduce Manual Work", description: "Free your team from repetitive tasks." },
      { title: "Increase Accuracy", description: "Eliminate human error in processes." }
    ]
  },
  {
    id: "social-media-automation",
    name: "Social Media Automation",
    shortDescription: "Social media automation uses AI to create content, schedule posts, and manage engagement across every social platform from one workflow. Lanos Logic builds social media automation that keeps posting consistent and on-brand while tracking performance.",
    icon: "Share2",
    href: "/services/social-media-automation",
    features: [
      "Content Generation",
      "Auto Scheduling",
      "Engagement Management"
    ],
    benefits: [
      { title: "Consistent Posting", description: "Never miss optimal posting times." },
      { title: "AI Content", description: "Generate engaging content with AI." },
      { title: "Analytics Insights", description: "Track and optimize performance." }
    ]
  },
  {
    id: "communication-automation",
    name: "Communication Automation",
    shortDescription: "Communication automation delivers SMS, voice, and multi-channel messaging to customers automatically and at scale. Lanos Logic builds Twilio-powered communication automation for fast, personalized, two-way customer messaging.",
    icon: "MessageSquare",
    href: "/services/communication-automation",
    features: [
      "SMS Campaigns",
      "Voice Broadcasting",
      "Multi-channel Messaging"
    ],
    benefits: [
      { title: "Reach Customers Fast", description: "Instant delivery across channels." },
      { title: "Personalization", description: "Tailored messages at scale." },
      { title: "Two-way Communication", description: "Enable customer responses and engagement." }
    ]
  },
  {
    id: "mobile-app-development",
    name: "Mobile App Development",
    shortDescription: "Mobile app development delivers custom iOS and Android applications from a single Flutter codebase that connect directly to your business automations. Lanos Logic builds cross-platform mobile apps with native performance and built-in automation integration.",
    icon: "Smartphone",
    href: "/services/mobile-app-development",
    features: [
      "Cross-platform Apps",
      "Native Performance",
      "System Integration"
    ],
    benefits: [
      { title: "iOS & Android", description: "Single codebase for both platforms." },
      { title: "Fast Development", description: "Rapid delivery with Flutter." },
      { title: "Automation Integration", description: "Connect with your existing systems." }
    ]
  },
  {
    id: "analytics-insights",
    name: "Analytics & Insights",
    shortDescription: "Analytics and insights turn your automation data into real-time dashboards, performance metrics, and predictive analysis so you can measure ROI and act on it. Lanos Logic builds analytics that show what your automations deliver and where to improve.",
    icon: "BarChart3",
    href: "/services/analytics-insights",
    features: [
      "Real-time Dashboards",
      "Performance Metrics",
      "Predictive Analytics"
    ],
    benefits: [
      { title: "Data-driven Decisions", description: "Make informed choices with real data." },
      { title: "Track ROI", description: "Measure automation performance." },
      { title: "Identify Opportunities", description: "Discover areas for improvement." }
    ]
  },
  {
    id: "agentic-seo-geo",
    name: "Agentic SEO & GEO",
    shortDescription: "Agentic SEO and Generative Engine Optimization (GEO) make your website the source AI assistants cite — optimizing for ChatGPT, Claude, Perplexity, Google AI Overviews, and Gemini, not just classic search rankings. Lanos Logic structures your content, schema, and crawler access so large language models can find, understand, and quote your business by name.",
    icon: "Sparkles",
    href: "/services/agentic-seo-geo",
    features: [
      "Generative & Answer Engine Optimization",
      "llms.txt, Schema & AI Crawler Access",
      "Hybrid Retrieval (RRF) Content Structuring"
    ],
    benefits: [
      { title: "Get Cited by AI Assistants", description: "Become the answer ChatGPT, Claude, Perplexity, and Google AI Overviews surface when buyers research — where more of the journey now starts." },
      { title: "Future-Proof Visibility", description: "As search shifts from ten blue links to AI-generated answers, your content stays discoverable and quotable by the models that matter." },
      { title: "Measurable AI Presence", description: "See where and how AI engines mention your brand, then close the gaps that keep you out of generated answers." }
    ]
  },
  {
    id: "security-vulnerability-scanning",
    name: "Security Vulnerability Scanning",
    shortDescription: "Security vulnerability scanning is the continuous, automated process of finding known weaknesses across your apps, APIs, and cloud before attackers do. Lanos Logic runs vulnerability scanning against the OWASP Top 10, daily-updated CVE databases, and enterprise scanning platforms to surface exploitable weaknesses.",
    icon: "ScanLine",
    href: "/services/security-vulnerability-scanning",
    features: [
      "OWASP Top 10 Assessment",
      "CVE & Zero-Day Detection",
      "Continuous Monitoring & Alerts"
    ],
    benefits: [
      { title: "Proactive Threat Detection", description: "Identify and remediate vulnerabilities before attackers exploit them, reducing breach risk by up to 90%." },
      { title: "Compliance Coverage", description: "Meet PCI-DSS, SOC 2, ISO 27001, and HIPAA security requirements with documented scanning evidence." },
      { title: "Risk Prioritization", description: "CVSS-scored findings mapped to business impact so your team focuses on critical issues first." }
    ]
  },
  {
    id: "penetration-testing",
    name: "Penetration Testing",
    shortDescription: "Penetration testing is an authorized, simulated cyberattack run by certified ethical hackers to expose exploitable vulnerabilities before real attackers find them. Lanos Logic pentests web apps, APIs, networks, and cloud infrastructure using PTES, OWASP, and MITRE ATT&CK methodologies.",
    icon: "ShieldAlert",
    href: "/services/penetration-testing",
    features: [
      "Web App & API Pentesting (OWASP WSTG)",
      "Network & Cloud Infrastructure Testing",
      "Social Engineering & Phishing Simulations"
    ],
    benefits: [
      { title: "Real-World Attack Simulation", description: "Test defenses under conditions that mirror actual attacker techniques, tools, and procedures (TTPs)." },
      { title: "Detailed Remediation Roadmap", description: "Every finding includes reproduction steps, CVSS score, and step-by-step remediation guidance." },
      { title: "Compliance Evidence", description: "Pentest reports accepted for SOC 2 Type II, ISO 27001, PCI-DSS, and regulatory audits." }
    ]
  },
  {
    id: "systems-hardening",
    name: "Systems Hardening",
    shortDescription: "Systems hardening is the proactive work of configuring servers, cloud infrastructure, and applications securely to shrink your attack surface. Lanos Logic hardens systems with defense-in-depth controls following CIS Benchmarks, NIST SP 800-123, and Zero Trust Architecture principles.",
    icon: "ShieldCheck",
    href: "/services/systems-hardening",
    features: [
      "CIS Benchmark Implementation",
      "Zero Trust Architecture Design",
      "Cloud Security Posture Management (CSPM)"
    ],
    benefits: [
      { title: "Reduced Attack Surface", description: "Eliminate unnecessary services, close exposed ports, and enforce least-privilege access across your entire stack." },
      { title: "Regulatory Alignment", description: "Configurations aligned with NIST, CIS, DISA STIG, and SOC 2 frameworks for audit-ready security posture." },
      { title: "Continuous Posture Management", description: "Automated CSPM tooling monitors for configuration drift and alerts on deviations in real time." }
    ]
  }
];

// NOTE: the former `caseStudies` array was removed on 2026-09-17. It held five
// illustrative entries — including an unnamed "federal regulatory agency" and a
// "Fortune 500 pharmaceutical company" — that did not correspond to real
// engagements and were not present in caseStudiesData.js. Nothing rendered them
// (every component imports allCaseStudies from caseStudiesData.js), but they
// were being extracted into mcp-server/data.json. Real, verifiable case studies
// live in caseStudiesData.js and are the only source of client claims.

export const testimonials = [
  {
    id: 1,
    content: "The AI social media automation tools have transformed our marketing strategy. We've seen a 40% increase in engagement and saved countless hours on content creation.",
    author: "Sarah Johnson",
    role: "Marketing Director",
    company: "TechVision Inc.",
    initials: "SJ"
  },
  {
    id: 2,
    content: "Implementing the process automation solution has streamlined our operations and reduced processing time by 65%. The ROI has been remarkable.",
    author: "Michael Chen",
    role: "Operations Manager",
    company: "Global Logistics",
    initials: "MC"
  },
  {
    id: 3,
    content: "The Voice AI agents have revolutionized our customer support. Our response times are down by 80%, and customer satisfaction scores have increased by 35%.",
    author: "Jessica Williams",
    role: "Customer Service Director",
    company: "Retail Solutions",
    initials: "JW"
  }
];

export const benefits = [
  {
    title: "Increase Efficiency",
    description: "Automate repetitive tasks and workflows to free up your team's time for strategic initiatives.",
    icon: "Zap"
  },
  {
    title: "Enhance Customer Experience",
    description: "Provide 24/7 support and personalized interactions through AI-powered assistants.",
    icon: "Heart"
  },
  {
    title: "Reduce Operational Costs",
    description: "Cut expenses by automating manual processes and reducing human error.",
    icon: "DollarSign"
  },
  {
    title: "Scale Operations Seamlessly",
    description: "Handle increased workloads without proportionally increasing headcount or costs.",
    icon: "TrendingUp"
  },
  {
    title: "Gain Actionable Insights",
    description: "Leverage AI-powered analytics to make data-driven decisions and identify opportunities.",
    icon: "Lightbulb"
  },
  {
    title: "Increase Revenue",
    description: "Generate more leads, improve conversion rates, and boost customer retention.",
    icon: "LineChart"
  }
];

export const processSteps = [
  {
    step: 1,
    title: "Analyze",
    description: "We plan, analyze and blueprint your business processes using BPMN and documentation ensuring every existing and new automation seamlessly aligns with your goals and amplifies efficiency."
  },
  {
    step: 2,
    title: "Prepare",
    description: "Before implementation, we refine and align your business processes with future state BA planning, ensuring each automated workflow is perfectly tailored to hit your objectives."
  },
  {
    step: 3,
    title: "Implement",
    description: "New implemented automations start delivering results immediately. Say goodbye to any manual tasks and hello to streamlined efficiency."
  }
];

export const teamMembers = [
  {
    id: 1,
    name: "Daniel Roberts",
    role: "Head of Business Development",
    bio: "Daniel leads strategic partnerships and growth initiatives, helping clients identify automation opportunities that increase efficiency and revenue. Outside of work, he enjoys restoring vintage motorcycles and often spends weekends on long-distance road trips across Europe.",
    image: "/team/daniel-roberts.webp"
  },
  {
    id: 2,
    name: "Alex Podbrezsky",
    role: "Founder & AI Solutions Architect",
    bio: "Alex designs AI-powered systems that combine automation, messaging, and business workflows into scalable digital products. He is deeply interested in emerging technologies, futurism, and the intersection between AI, communication, and human behavior.",
    image: "/team/alex-podbrezsky.webp"
  },
  {
    id: 3,
    name: "Adrian Ionescu",
    role: "Lead Backend Developer",
    bio: "Adrian oversees backend architecture and infrastructure reliability across client and internal platforms. He is known for building custom electronics projects at home and has a personal workshop filled with experimental hardware prototypes.",
    image: "/team/adrian-ionescu.webp"
  },
  {
    id: 4,
    name: "Leo Katz",
    role: "Product Strategy & Operations Manager",
    bio: "Leo coordinates product development and operational execution, ensuring projects move efficiently from concept to launch. He previously traveled through more than 20 countries while working remotely and enjoys studying behavioral psychology and negotiation.",
    image: "/team/leo-katz.webp"
  },
  {
    id: 5,
    name: "Alex Tanaka",
    role: "AI Integrations Engineer",
    bio: "Alex specializes in connecting AI models, APIs, and third-party platforms into unified automation ecosystems. In his free time, he practices digital music production and experiments with AI-generated audio tools.",
    image: "/team/alex-tanaka.webp"
  },
  {
    id: 6,
    name: "Anna Kowalska",
    role: "Client Success & Onboarding Specialist",
    bio: "Anna guides clients through onboarding and implementation, ensuring smooth adoption of automation systems and digital tools. She is passionate about languages and can comfortably communicate in four different languages.",
    image: "/team/anna-kowalska.webp"
  },
  {
    id: 7,
    name: "Sophia Mitchell",
    role: "Marketing Director",
    bio: "Sophia leads brand strategy, digital campaigns, and content positioning for both the agency and its clients. She has a background in documentary photography and often incorporates storytelling principles into marketing campaigns.",
    image: "/team/sophia-mitchell.webp"
  },
  {
    id: 8,
    name: "Marcus Halvorsen",
    role: "Sales Director",
    bio: "Marcus manages sales strategy and client acquisition, helping businesses understand how AI automation can solve operational bottlenecks. He enjoys mountain hiking in Scandinavia and is known internally for turning client meetings into strategic brainstorming sessions.",
    image: "/team/marcus-halvorsen.webp"
  },
  {
    id: 9,
    name: "Daria Melnyk",
    role: "UI/UX Designer & Brand Creative",
    bio: "Daria creates intuitive interfaces and visual identities that make complex technology feel simple and engaging. She is inspired by modern architecture and frequently sketches interface concepts while visiting cafes and galleries.",
    image: "/team/daria-melnyk.webp"
  },
  {
    id: 10,
    name: "Erik Dahlgren",
    role: "DevOps & Infrastructure Engineer",
    bio: "Erik manages cloud infrastructure, deployment pipelines, and system scalability for high-availability applications. He is an avid sailing enthusiast and enjoys applying engineering precision both to systems architecture and open-water navigation.",
    image: "/team/erik-dahlgren.webp"
  }
];

export const caseStudyCategories = [
  { id: 'all', label: 'All Case Studies' },
  { id: 'Marketing Agency', label: 'Marketing' },
  { id: 'Sales Agency', label: 'Sales' },
  { id: 'Real Estate', label: 'Real Estate' },
  { id: 'Enterprise AI', label: 'Enterprise AI' },
  { id: 'U.S. Government', label: 'Government' }
];

export const companyStats = [
  { value: "100+", label: "Clients Served" },
  { value: "500+", label: "Automations Built" },
  { value: "2M+", label: "Hours Saved" },
  { value: "99%", label: "Client Satisfaction" }
];

export const blogPosts = [
  {
    id: "what-is-geo",
    slug: "what-is-geo-generative-engine-optimization",
    title: "What Is GEO? How to Get Your Business Cited by ChatGPT, Perplexity & Google AI Overviews",
    summary: "Search is moving from ten blue links to a single AI-generated answer. Generative Engine Optimization (GEO) is how you make sure your business is the source the AI quotes — here's what it is, why it matters now, and the exact stack we use to do it.",
    author: "Alex Podbrezsky",
    authorRole: "Founder & CEO, Lanos Logic",
    date: "June 30, 2026",
    readTime: "9 min read",
    category: "AI Search & SEO",
    tags: ["GEO", "Generative Engine Optimization", "AI SEO", "AEO", "ChatGPT", "Perplexity"],
    heroGradient: "from-purple-900/40 to-amber-900/20",
    content: [
      {
        type: "intro",
        text: "More and more buyers no longer scroll a page of blue links — they ask ChatGPT, Claude, Perplexity, Google's AI Overviews, or Gemini, and act on the answer they get back. Those assistants don't rank ten results; they cite a handful of sources. Generative Engine Optimization (GEO) is the practice of making sure your business is one of the sources they quote by name. At Lanos Logic we run this work for clients — and on our own website — so this is the playbook, not theory.",
      },
      {
        type: "heading",
        text: "What is Generative Engine Optimization (GEO)?",
      },
      {
        type: "paragraph",
        text: "GEO — also called Answer Engine Optimization (AEO) — is the practice of structuring your website and content so AI assistants can find, understand, and cite it inside their generated answers. Instead of chasing a ranking position on a results page, GEO optimizes for being the source an AI quotes when a potential customer asks it a question.",
      },
      {
        type: "paragraph",
        text: "The shift is fundamental: classic SEO competes for a click on a list of links, while GEO competes to be the trusted answer itself. The two share fundamentals — crawlability, clear content, structured data — but GEO adds AI-crawler access, machine-readable knowledge bases, and content engineered for the way large language models actually retrieve information.",
      },
      {
        type: "heading",
        text: "Why GEO matters now",
      },
      {
        type: "paragraph",
        text: "AI search is where a growing share of buying journeys now begin. When a prospect asks an assistant \"who builds AI automation for healthcare?\" and your competitor is the one named in the answer, you've lost the buyer before they ever reach a search result — let alone your homepage. And unlike a ranking you can watch slip, you never even see it happen.",
      },
      {
        type: "paragraph",
        text: "GEO is also durable. The structured, well-explained content that earns citations keeps working as models update, because you're optimizing for genuine clarity and authority rather than a single algorithm's quirks. Getting in early, while most businesses are still invisible to AI engines, is a compounding advantage.",
      },
      {
        type: "heading",
        text: "GEO vs traditional SEO",
      },
      {
        type: "list",
        heading: "How the two differ in practice:",
        items: [
          "Goal: SEO wins a ranking and a click; GEO wins a citation inside an AI-generated answer.",
          "Audience: SEO optimizes for a human scanning links; GEO optimizes for a model retrieving and synthesizing passages.",
          "Content shape: SEO rewards keyword-targeted pages; GEO rewards self-contained, question-and-answer passages a model can lift directly.",
          "Access: GEO depends on letting AI crawlers (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) reach your site — something classic SEO ignores.",
          "Measurement: SEO tracks rankings and traffic; GEO tracks whether and how your brand is mentioned across AI engines.",
        ],
      },
      {
        type: "heading",
        text: "The 5-Layer GEO Stack",
      },
      {
        type: "paragraph",
        text: "Lanos Logic delivers GEO through a repeatable system — the same stack we run on this website. Each layer builds on the one before it:",
      },
      {
        type: "list",
        heading: "The five layers:",
        items: [
          "1. Crawl Access — make sure the AI crawlers that feed answer engines (GPTBot, ClaudeBot, PerplexityBot, Google-Extended, OAI-SearchBot) can reach and read your site.",
          "2. Machine Legibility — JSON-LD schema, an llms.txt / llms-full.txt knowledge base, and agent-native surfaces (MCP, agent.json) so models parse you cleanly.",
          "3. Retrieval-Ready Content — self-contained, question-and-answer passages tuned for the hybrid lexical and semantic retrieval (Reciprocal Rank Fusion) that AI engines use to pick sources.",
          "4. Authority & Citations — the entity consistency, citations, and mentions that make a model trust and repeat your brand as the answer.",
          "5. Visibility Monitoring — tracking where and how you're cited across ChatGPT, Claude, Perplexity, and Gemini so the gaps that keep you out of answers get closed.",
        ],
      },
      {
        type: "heading",
        text: "How to get started",
      },
      {
        type: "paragraph",
        text: "GEO starts with knowing where you stand: which AI crawlers can reach you today, what structured data you expose, and whether AI engines currently cite you at all. That's exactly what our free GEO Visibility Audit covers — a no-obligation snapshot of how AI search sees your business, and the highest-impact fixes to become the answer.",
      },
      {
        type: "cta",
        text: "Find out where AI engines do — and don't — cite your business, and how to fix it. Get a free GEO Visibility Audit from the Lanos Logic team.",
        buttonText: "Get Your Free GEO Visibility Audit",
        buttonHref: "/services/agentic-seo-geo",
      },
    ],
  },
  {
    id: "security-services-launch",
    slug: "we-now-offer-cybersecurity-services",
    title: "Lanos Logic Now Offers Enterprise Cybersecurity Services: Penetration Testing, Vulnerability Scanning & Systems Hardening",
    summary: "We\'re expanding beyond AI automation to deliver the security foundation every modern enterprise needs — adversarial testing, continuous vulnerability discovery, and defense-in-depth hardening built on OWASP, NIST, and CIS standards.",
    author: "Alex Podbrezsky",
    authorRole: "Founder & CEO, Lanos Logic",
    date: "May 13, 2026",
    readTime: "8 min read",
    category: "Security",
    tags: ["Penetration Testing", "OWASP", "Vulnerability Scanning", "Zero Trust", "CIS Benchmarks", "Systems Hardening"],
    heroGradient: "from-red-900/40 to-amber-900/20",
    content: [
      {
        type: "intro",
        text: "At Lanos Logic, we have spent years helping organisations automate, scale, and compete using AI-driven workflows. Today we are adding a new pillar to our platform: enterprise cybersecurity services. We are launching three interconnected offerings — Security Vulnerability Scanning, Penetration Testing, and Systems Hardening — because the AI systems and automated pipelines we build for clients are only as trustworthy as the security posture underneath them."
      },
      {
        type: "heading",
        text: "Why Security, Why Now"
      },
      {
        type: "paragraph",
        text: "The threat landscape has changed permanently. In 2025 alone, the average cost of a data breach reached $4.88 million (IBM Cost of a Data Breach Report 2025). Ransomware groups now average under 24 hours from initial access to encryption. AI-generated phishing campaigns have increased spear-phishing success rates by 60% compared to hand-crafted lures. Meanwhile, cloud misconfigurations remain the leading cause of breaches in SaaS and API-driven architectures — the exact environments our clients operate in."
      },
      {
        type: "paragraph",
        text: "Our clients trust us with their most sensitive workflows: contract processing, customer communications, financial data pipelines. Delivering AI automation without a security layer would be like fitting a state-of-the-art engine into a car with no doors. We are closing that gap."
      },
      {
        type: "heading",
        text: "Service 1 — Security Vulnerability Scanning"
      },
      {
        type: "paragraph",
        text: "Vulnerability scanning is the continuous, systematic process of identifying known weaknesses across your digital estate before an adversary does. Our scanning service covers the OWASP Top 10 (the ten most critical web application security risks), CVE databases updated daily, cloud configuration benchmarks (AWS, GCP, Azure, and Cloudflare Workers), dependency and supply-chain vulnerabilities in your codebase, and API surface exposure mapping."
      },
      {
        type: "paragraph",
        text: "Every finding is CVSS v3.1-scored and mapped to business risk. We do not deliver raw scanner output — we deliver a prioritised remediation plan. Critical findings trigger immediate notifications. The service runs continuously; you receive a quarterly executive summary and a live remediation dashboard."
      },
      {
        type: "list",
        heading: "What you get:",
        items: [
          "Automated daily scans across web apps, APIs, and cloud infrastructure",
          "OWASP Top 10 coverage with manual validation of critical findings",
          "CVSS-scored findings with remediation priority mapped to business impact",
          "Integration with your existing CI/CD pipeline for shift-left security",
          "Quarterly executive reports with trend analysis and compliance evidence"
        ]
      },
      {
        type: "heading",
        text: "Service 2 — Penetration Testing"
      },
      {
        type: "paragraph",
        text: "A penetration test goes beyond automated scanning. It is an authorised, simulated attack conducted by certified security engineers who think like adversaries. We follow the Penetration Testing Execution Standard (PTES), the OWASP Web Security Testing Guide (WSTG), and MITRE ATT&CK to ensure comprehensive, reproducible coverage."
      },
      {
        type: "paragraph",
        text: "Our pentest engagements span four domains. Web application and API testing covers authentication bypass, injection attacks (SQLi, XXE, SSTI), broken access control, business logic flaws, and insecure direct object references. Network and infrastructure testing maps your external and internal attack surfaces, tests for lateral movement paths, and validates segmentation controls. Cloud security testing assesses IAM misconfigurations, exposed storage buckets, serverless function privilege escalation, and secrets management. Social engineering assessments simulate phishing, vishing, and pretexting campaigns calibrated to your threat model."
      },
      {
        type: "paragraph",
        text: "Every engagement concludes with a detailed report structured for two audiences: a management summary with business risk framing, and a technical annex with step-by-step reproduction steps, evidence screenshots, and remediation code where applicable. Reports are accepted as evidence for SOC 2 Type II, ISO 27001, PCI-DSS, and HIPAA audits."
      },
      {
        type: "list",
        heading: "Our certifications include:",
        items: [
          "OSCP (Offensive Security Certified Professional)",
          "CEH (Certified Ethical Hacker)",
          "PNPT (Practical Network Penetration Tester)",
          "AWS Certified Security — Specialty",
          "OWASP AppSec practitioner training"
        ]
      },
      {
        type: "heading",
        text: "Service 3 — Systems Hardening"
      },
      {
        type: "paragraph",
        text: "Finding vulnerabilities is only half the battle. Hardening is the proactive work of reducing your attack surface so vulnerabilities have less to target. Our Systems Hardening service implements industry-validated configuration baselines across your entire stack."
      },
      {
        type: "paragraph",
        text: "We implement CIS Benchmarks (the globally recognised hardening standards for operating systems, cloud providers, Kubernetes, and databases), NIST SP 800-123 (General Server Security guidelines), and DISA STIGs for regulated and government environments. For cloud-native architectures, we design and implement Zero Trust Network Access (ZTNA) controls, enforce least-privilege IAM, and deploy Cloud Security Posture Management (CSPM) tooling to detect configuration drift in real time."
      },
      {
        type: "list",
        heading: "Hardening scope includes:",
        items: [
          "Linux and Windows server baseline hardening (CIS Level 1 & 2)",
          "Kubernetes and container security (NSA/CISA hardening guidelines)",
          "Cloud IAM policy reviews and least-privilege enforcement (AWS, GCP, Azure)",
          "TLS/mTLS configuration and certificate lifecycle management",
          "Secrets management architecture (HashiCorp Vault, AWS Secrets Manager)",
          "Firewall rule auditing and network segmentation validation",
          "Database hardening and encryption-at-rest verification",
          "Zero Trust Architecture design and phased implementation roadmap"
        ]
      },
      {
        type: "heading",
        text: "The Frameworks Behind Our Work"
      },
      {
        type: "paragraph",
        text: "Every engagement is grounded in recognised standards rather than proprietary methodology. This matters for two reasons: it makes our findings defensible in audits, and it ensures coverage is systematic rather than dependent on individual analyst intuition."
      },
      {
        type: "paragraph",
        text: "OWASP (Open Worldwide Application Security Project) defines the Top 10 most critical web application risks, the WSTG for testing methodology, and the ASVS (Application Security Verification Standard) for security requirements. NIST Cybersecurity Framework (CSF 2.0) provides the Identify-Protect-Detect-Respond-Recover structure we use for programme design. CIS Controls v8 gives us prioritised actions mapped to implementation groups for organisations of any maturity level. MITRE ATT&CK documents real adversary techniques and is the backbone of our threat modelling and red team exercises."
      },
      {
        type: "heading",
        text: "Who These Services Are For"
      },
      {
        type: "paragraph",
        text: "These services are designed for organisations who have built real systems and now need to protect them. Specifically: SaaS companies approaching their first SOC 2 audit, fintech and healthtech startups handling regulated data, enterprises integrating AI and automation into customer-facing workflows (our core client base), government contractors that need a documented security posture before they can bid, and any organisation that has grown fast and knows its security hygiene has not kept pace."
      },
      {
        type: "paragraph",
        text: "You do not need to be under active threat to engage us. The best time to run a penetration test is before an attacker does it for free."
      },
      {
        type: "heading",
        text: "Getting Started"
      },
      {
        type: "paragraph",
        text: "We begin every security engagement with a free 30-minute scoping call. During that call we map your digital estate, understand your compliance obligations, and identify which service — or combination of services — delivers the highest immediate risk reduction. There is no sales pressure: we will tell you if a free open-source scan is sufficient for your current stage."
      },
      {
        type: "cta",
        text: "Book a free security scoping call and we will have a risk assessment back to you within 48 hours.",
        buttonText: "Book a Security Consultation",
        buttonHref: "/contact"
      }
    ]
  }
];
