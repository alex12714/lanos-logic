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
  { name: "Make.com", logo: "/make-logo.png" },
  { name: "AirTable", logo: "/airtable-logo.jpg" },
  { name: "DocuSign", logo: "/docusign-logo-new.png" },
  { name: "Miro", logo: "/miro-logo.jpg" },
  { name: "GoHighLevel", logo: "/gohighlevel-logo-new.jpg" },
  { name: "ClickUp", logo: "/clickup-logo.png" },
  { name: "Claude AI", logo: "/claude-logo.png" },
  { name: "VectorShift", logo: "/vectorshift-logo-new.png" },
  { name: "Flutter", logo: "/flutter-logo.jpg" },
  { name: "Twilio", logo: "/twilio-logo.png" },
  { name: "Stripe", logo: "/stripe-logo.png" },
  { name: "VAPI", logo: "/vapi-logo.png" }
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
    description: "AI automation helps education providers automate student enrollment, course management, grading, and personalized learning. Lanos Logic builds automations that streamline admissions and free educators from repetitive administrative work.",
    stats: ["Streamlined admissions", "Automated grading", "Personalized learning paths"],
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
    name: "U.S. Government & Federal",
    description: "AI automation helps U.S. federal agencies, defense contractors, and state governments process documents, automate citizen services, and run compliance workflows securely. Lanos Logic builds FedRAMP-aligned AI solutions with secure document classification and automated compliance reporting.",
    stats: ["FedRAMP-aligned architecture", "Secure document classification", "Automated compliance reporting"],
    href: "/industries/government"
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical",
    description: "AI automation helps pharmaceutical companies support drug discovery, manage clinical trial data, automate regulatory submissions, and run pharmacovigilance. Lanos Logic builds vector database-powered knowledge retrieval for accelerated submissions and AI-powered adverse event detection.",
    stats: ["Accelerated regulatory submissions", "AI-powered adverse event detection", "Clinical data pipeline automation"],
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
    name: "Law & Attorneys",
    description: "AI automation helps law firms and attorneys analyze contracts, automate legal research, manage cases, and review documents faster. Lanos Logic builds vector database-powered precedent discovery and automated due diligence that speed up contract review.",
    stats: ["80% faster contract review", "AI-powered legal research", "Automated due diligence"],
    href: "/industries/legal"
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

export const caseStudies = [
  {
    id: "marketing-automation",
    title: "Digital Marketing Agency Scales Operations by 300%",
    category: "Marketing Agency",
    description: "A digital marketing agency tripled its client capacity (a 300% increase) without adding staff by automating client reporting, content creation, and campaign management, cutting reporting time by 85% and lifting revenue by 45%.",
    image: "/case-study-marketing.png",
    stats: [
      { value: "300%", label: "increase in client capacity" },
      { value: "85%", label: "reduction in reporting time" },
      { value: "45%", label: "increase in revenue" }
    ],
    tags: ["AI Agents", "Process Automation", "Analytics"],
    href: "/case-studies/marketing-automation"
  },
  {
    id: "sales-outreach",
    title: "Sales Agency Boosts Conversion Rates with AI Outreach",
    category: "Sales Agency",
    description: "A B2B sales agency implemented AI-powered outreach and follow-up sequences, lifting response rates by 68% and conversion rates by 42% for a 3.5x return on its automation investment.",
    image: "/case-study-sales.png",
    stats: [
      { value: "68%", label: "increase in response rates" },
      { value: "42%", label: "higher conversion rate" },
      { value: "3.5x", label: "ROI on automation investment" }
    ],
    tags: ["Voice AI", "AI Agents", "Process Automation"],
    href: "/case-studies/sales-outreach"
  },
  {
    id: "real-estate-automation",
    title: "Real Estate Firm Automates Client Journey",
    category: "Real Estate",
    description: "A real estate brokerage automated its entire client journey from lead qualification to closing, qualifying leads 75% faster, cutting paperwork time by 90%, and increasing closings by 28%.",
    image: "/case-study-real-estate.png",
    stats: [
      { value: "75%", label: "faster lead qualification" },
      { value: "90%", label: "reduction in paperwork time" },
      { value: "28%", label: "increase in closings" }
    ],
    tags: ["Document Automation", "Process Automation", "AI Agents"],
    href: "/case-studies/real-estate-automation"
  },
  {
    id: "vector-database-integration",
    title: "Vector Database Architecture Powers Enterprise Knowledge Discovery",
    category: "Enterprise AI",
    description: "A Fortune 500 pharmaceutical company deployed a vector database architecture to unify 15+ years of research data, enabling semantic search across 2M+ documents and reducing research discovery time from weeks to minutes.",
    image: "/case-study-saas.png",
    stats: [
      { value: "95%", label: "faster research discovery" },
      { value: "2M+", label: "documents indexed semantically" },
      { value: "60%", label: "reduction in duplicate research" }
    ],
    tags: ["Vector Databases", "AI Agents", "Knowledge Management"],
    href: "/case-studies/vector-database-integration"
  },
  {
    id: "government-compliance",
    title: "Federal Agency Automates Compliance with AI Document Processing",
    category: "U.S. Government",
    description: "A federal regulatory agency implemented AI-powered document classification and compliance automation, processing 500K+ annual submissions with 99.2% accuracy while maintaining FedRAMP-aligned security standards.",
    image: "/case-study-legal.png",
    stats: [
      { value: "99.2%", label: "document classification accuracy" },
      { value: "500K+", label: "annual submissions processed" },
      { value: "70%", label: "reduction in manual review" }
    ],
    tags: ["Document Automation", "AI Agents", "Compliance"],
    href: "/case-studies/government-compliance"
  }
];

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
    image: "/team/daniel-roberts.jpg"
  },
  {
    id: 2,
    name: "Alex Podbrezsky",
    role: "Founder & AI Solutions Architect",
    bio: "Alex designs AI-powered systems that combine automation, messaging, and business workflows into scalable digital products. He is deeply interested in emerging technologies, futurism, and the intersection between AI, communication, and human behavior.",
    image: "/team/alex-podbrezsky.jpg"
  },
  {
    id: 3,
    name: "Adrian Ionescu",
    role: "Lead Backend Developer",
    bio: "Adrian oversees backend architecture and infrastructure reliability across client and internal platforms. He is known for building custom electronics projects at home and has a personal workshop filled with experimental hardware prototypes.",
    image: "/team/adrian-ionescu.jpg"
  },
  {
    id: 4,
    name: "Leo Katz",
    role: "Product Strategy & Operations Manager",
    bio: "Leo coordinates product development and operational execution, ensuring projects move efficiently from concept to launch. He previously traveled through more than 20 countries while working remotely and enjoys studying behavioral psychology and negotiation.",
    image: "/team/leo-katz.jpg"
  },
  {
    id: 5,
    name: "Alex Tanaka",
    role: "AI Integrations Engineer",
    bio: "Alex specializes in connecting AI models, APIs, and third-party platforms into unified automation ecosystems. In his free time, he practices digital music production and experiments with AI-generated audio tools.",
    image: "/team/alex-tanaka.jpg"
  },
  {
    id: 6,
    name: "Anna Kowalska",
    role: "Client Success & Onboarding Specialist",
    bio: "Anna guides clients through onboarding and implementation, ensuring smooth adoption of automation systems and digital tools. She is passionate about languages and can comfortably communicate in four different languages.",
    image: "/team/anna-kowalska.jpg"
  },
  {
    id: 7,
    name: "Sophia Mitchell",
    role: "Marketing Director",
    bio: "Sophia leads brand strategy, digital campaigns, and content positioning for both the agency and its clients. She has a background in documentary photography and often incorporates storytelling principles into marketing campaigns.",
    image: "/team/sophia-mitchell.jpg"
  },
  {
    id: 8,
    name: "Marcus Halvorsen",
    role: "Sales Director",
    bio: "Marcus manages sales strategy and client acquisition, helping businesses understand how AI automation can solve operational bottlenecks. He enjoys mountain hiking in Scandinavia and is known internally for turning client meetings into strategic brainstorming sessions.",
    image: "/team/marcus-halvorsen.jpg"
  },
  {
    id: 9,
    name: "Daria Melnyk",
    role: "UI/UX Designer & Brand Creative",
    bio: "Daria creates intuitive interfaces and visual identities that make complex technology feel simple and engaging. She is inspired by modern architecture and frequently sketches interface concepts while visiting cafes and galleries.",
    image: "/team/daria-melnyk.jpg"
  },
  {
    id: 10,
    name: "Erik Dahlgren",
    role: "DevOps & Infrastructure Engineer",
    bio: "Erik manages cloud infrastructure, deployment pipelines, and system scalability for high-availability applications. He is an avid sailing enthusiast and enjoys applying engineering precision both to systems architecture and open-water navigation.",
    image: "/team/erik-dahlgren.jpg"
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
        text: "These services are designed for organisations who have built real systems and now need to protect them. Specifically: SaaS companies approaching their first SOC 2 audit, fintech and healthtech startups handling regulated data, enterprises integrating AI and automation into customer-facing workflows (our core client base), government contractors requiring FedRAMP-aligned security posture, and any organisation that has grown fast and knows its security hygiene has not kept pace."
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
