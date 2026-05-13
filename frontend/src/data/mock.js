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
    description: "Automate campaign management, content creation, analytics reporting, and client onboarding processes.",
    stats: ["50% faster client reporting", "3x more content production", "Automated lead nurturing"],
    href: "/industries/marketing-agencies"
  },
  {
    id: "sales",
    name: "Sales Agencies",
    description: "Streamline lead qualification, follow-ups, proposal generation, and sales pipeline management.",
    stats: ["40% increase in qualified leads", "Automated follow-up sequences", "Smart contract generation"],
    href: "/industries/sales-agencies"
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Enhance customer support, inventory management, order processing, and personalized marketing.",
    stats: ["24/7 customer support", "Automated inventory alerts", "Personalized recommendations"],
    href: "/industries/ecommerce"
  },
  {
    id: "education",
    name: "Education",
    description: "Automate student enrollment, course management, grading, and personalized learning experiences.",
    stats: ["Streamlined admissions", "Automated grading", "Personalized learning paths"],
    href: "/industries/education"
  },
  {
    id: "healthcare",
    name: "Healthcare",
    description: "Improve patient scheduling, billing, record management, and follow-up communications.",
    stats: ["Reduced no-shows", "Streamlined billing", "Automated patient follow-ups"],
    href: "/industries/healthcare"
  },
  {
    id: "logistics",
    name: "Logistics",
    description: "Optimize route planning, shipment tracking, inventory management, and customer communications.",
    stats: ["Real-time tracking updates", "Optimized delivery routes", "Automated shipping notifications"],
    href: "/industries/logistics"
  },
  {
    id: "real-estate",
    name: "Real Estate",
    description: "Automate lead qualification, property matching, document management, and client communications.",
    stats: ["Automated property alerts", "Smart document processing", "Virtual property tours"],
    href: "/industries/real-estate"
  },
  {
    id: "professional-services",
    name: "Professional Services",
    description: "Streamline client onboarding, project management, billing, and reporting processes.",
    stats: ["Automated time tracking", "Smart document generation", "Client portal access"],
    href: "/industries/professional-services"
  },
  {
    id: "manufacturing",
    name: "Manufacturing",
    description: "Enhance production planning, quality control, inventory management, and supply chain operations.",
    stats: ["Predictive maintenance", "Automated quality checks", "Supply chain optimization"],
    href: "/industries/manufacturing"
  },
  {
    id: "government",
    name: "U.S. Government & Federal",
    description: "FedRAMP-aligned AI solutions for federal agencies, defense contractors, and state governments. Secure document processing, citizen services automation, and compliance workflows.",
    stats: ["FedRAMP-aligned architecture", "Secure document classification", "Automated compliance reporting"],
    href: "/industries/government"
  },
  {
    id: "pharmaceutical",
    name: "Pharmaceutical",
    description: "AI-driven drug discovery support, clinical trial data management, regulatory submission automation, and pharmacovigilance with vector database-powered knowledge retrieval.",
    stats: ["Accelerated regulatory submissions", "AI-powered adverse event detection", "Clinical data pipeline automation"],
    href: "/industries/pharmaceutical"
  },
  {
    id: "life-sciences",
    name: "Life Sciences",
    description: "Intelligent research data management, genomic data processing, lab automation integration, and AI-assisted literature review using semantic search and vector embeddings.",
    stats: ["Semantic research discovery", "Automated lab data integration", "AI literature analysis"],
    href: "/industries/life-sciences"
  },
  {
    id: "legal",
    name: "Law & Attorneys",
    description: "AI-powered contract analysis, legal research automation, case management workflows, and document review using vector databases for precedent discovery and due diligence.",
    stats: ["80% faster contract review", "AI-powered legal research", "Automated due diligence"],
    href: "/industries/legal"
  }
];

export const services = [
  {
    id: "vector-database-solutions",
    name: "Vector Database Solutions",
    shortDescription: "Enterprise-grade vector database architecture for semantic search, knowledge retrieval, and AI-powered discovery across massive document collections.",
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
    shortDescription: "Intelligent virtual assistants that automate customer interactions, answer queries, and execute tasks 24/7.",
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
    shortDescription: "Natural-sounding voice assistants that handle calls, appointments, and customer support with human-like conversation.",
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
    shortDescription: "Intelligent document processing that extracts data, manages contracts, and automates approval workflows.",
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
    shortDescription: "End-to-end business process automation that eliminates repetitive tasks and streamlines operations.",
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
    shortDescription: "AI-powered content creation, scheduling, and engagement management across all social platforms.",
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
    shortDescription: "Streamline customer communications with Twilio-powered SMS, voice, and messaging solutions.",
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
    shortDescription: "Custom mobile applications built with Flutter framework that integrate with your business automations.",
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
    shortDescription: "Data-driven insights and performance tracking to optimize your automation strategies.",
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
    shortDescription: "Automated and continuous vulnerability discovery using OWASP Top 10, CVE databases, and enterprise scanning platforms to identify exploitable weaknesses before attackers do.",
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
    shortDescription: "Adversarial simulation by certified ethical hackers using PTES, OWASP, and MITRE ATT&CK methodologies to expose exploitable vulnerabilities in web apps, APIs, networks, and cloud infrastructure.",
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
    shortDescription: "Defense-in-depth hardening of cloud infrastructure, servers, and applications following CIS Benchmarks, NIST SP 800-123, and Zero Trust Architecture principles to minimize your attack surface.",
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
    description: "A digital marketing agency automated their client reporting, content creation, and campaign management, allowing them to triple their client base without adding staff.",
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
    description: "A B2B sales agency implemented AI-powered outreach and follow-up sequences, resulting in significantly higher engagement and conversion rates.",
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
    description: "A real estate brokerage automated their entire client journey from lead qualification to closing, creating a seamless experience for buyers and sellers.",
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
    name: "Alex Rivera",
    role: "Founder & CEO",
    bio: "Former tech lead at Fortune 500 companies with 15+ years of experience in AI and automation.",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop"
  },
  {
    id: 2,
    name: "Sarah Chen",
    role: "Head of AI Solutions",
    bio: "AI researcher with a PhD from MIT, specializing in natural language processing and machine learning.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop"
  },
  {
    id: 3,
    name: "Marcus Johnson",
    role: "Lead Developer",
    bio: "Full-stack developer with expertise in building scalable automation systems and integrations.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop"
  },
  {
    id: 4,
    name: "Emily Watson",
    role: "Client Success Manager",
    bio: "Dedicated to ensuring clients achieve maximum value from their automation implementations.",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop"
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
