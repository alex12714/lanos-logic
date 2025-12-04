// Mock data for Lanos Logic website

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About Us", href: "/about" },
  { label: "Case Studies", href: "/case-studies" },
  { label: "Contact", href: "/contact" }
];

export const heroFeatures = [
  "AI-Powered",
  "24/7 Automation",
  "Seamless Integration",
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
  }
];

export const services = [
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
    image: "https://www.lanos-logic.com/case-study-real-estate.png",
    stats: [
      { value: "75%", label: "faster lead qualification" },
      { value: "90%", label: "reduction in paperwork time" },
      { value: "28%", label: "increase in closings" }
    ],
    tags: ["Document Automation", "Process Automation", "AI Agents"],
    href: "/case-studies/real-estate-automation"
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

export const companyStats = [
  { value: "100+", label: "Clients Served" },
  { value: "500+", label: "Automations Built" },
  { value: "2M+", label: "Hours Saved" },
  { value: "99%", label: "Client Satisfaction" }
];
