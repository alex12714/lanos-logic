// Glossary of core AI automation and security terms used across Lanos Logic
// services. Each definition is answer-first and self-contained so it reads as a
// single quotable paragraph for both humans and AI assistants. Definitions
// describe widely-understood industry concepts (no client-specific claims).

export const glossaryTerms = [
  {
    term: 'AI Agent',
    definition:
      'An AI agent is an intelligent software assistant that understands natural language, makes decisions, and executes multi-step tasks autonomously on behalf of a business. Unlike a simple chatbot, an AI agent can call tools, query data, and complete real workflows — answering customer questions, qualifying leads, or updating records 24/7 with contextual understanding of the business it serves.',
  },
  {
    term: 'Voice AI Agent',
    definition:
      'A voice AI agent is a natural-sounding virtual assistant that answers and places phone calls, holds human-like conversations, books appointments, qualifies leads, and handles support around the clock. It listens, understands intent, responds in real time, and performs a seamless warm hand-off to a human team member whenever a call needs escalation.',
  },
  {
    term: 'Document Automation',
    definition:
      'Document automation uses AI to extract data from documents, generate and manage contracts, and run approval workflows without manual handling. It typically combines OCR, data extraction, e-signature, and compliance-ready audit trails to turn hours of manual document processing into minutes, while reducing the data-entry errors that come with manual work.',
  },
  {
    term: 'Process Automation',
    definition:
      'Process automation is the use of software to run repeatable business workflows end to end — moving data between systems, triggering actions, and enforcing rules without human intervention. It connects the tools a business already uses so that tasks like onboarding, invoicing, or lead routing happen automatically, freeing teams to focus on higher-value work.',
  },
  {
    term: 'Vector Database',
    definition:
      'A vector database stores the meaning of content as numerical embeddings, enabling semantic search and retrieval over large collections of documents. Instead of matching exact keywords, it finds information by conceptual similarity, which lets AI systems answer questions grounded in a company’s proprietary data rather than guessing.',
  },
  {
    term: 'Embeddings',
    definition:
      'Embeddings are numerical representations of text, images, or other data that capture meaning as a list of numbers (a vector). Items with similar meaning sit close together in this numerical space, which is what allows a vector database to perform semantic search and power retrieval-augmented generation.',
  },
  {
    term: 'RAG (Retrieval-Augmented Generation)',
    definition:
      'Retrieval-augmented generation (RAG) is a technique that combines a vector database with a language model: relevant passages are first retrieved from a company’s own data, then given to the model so its answers are accurate, current, and traceable to real sources. RAG is how AI assistants stay grounded in proprietary knowledge instead of relying only on their training data.',
  },
  {
    term: 'Semantic Search',
    definition:
      'Semantic search finds information based on meaning rather than exact keyword matches. By comparing the embeddings of a query against the embeddings of stored content, it surfaces the most conceptually relevant results — so a search for “cut delivery costs” can return a document about “reducing logistics spend” even with no shared words.',
  },
  {
    term: 'MCP (Model Context Protocol)',
    definition:
      'The Model Context Protocol (MCP) is an open standard that lets AI assistants connect directly to external tools and data sources through a consistent interface. An MCP server exposes capabilities — such as listing services or submitting a request — that an AI agent can discover and call programmatically, enabling agentic interaction with a business without custom integrations.',
  },
  {
    term: 'LLM (Large Language Model)',
    definition:
      'A large language model (LLM) is an AI model trained on vast amounts of text to understand and generate human-like language. LLMs power modern AI agents, chat assistants, and content tools by predicting and producing coherent responses, and they become far more useful for business when grounded in company-specific data through techniques like RAG.',
  },
  {
    term: 'BPMN (Business Process Model and Notation)',
    definition:
      'BPMN is the global standard for diagramming business processes using a shared visual language of tasks, decision points, and flows. A BPMN blueprint makes a workflow easy for both stakeholders and developers to understand, and serves as the implementation-ready map that guides building and testing an automation.',
  },
  {
    term: 'Workflow Automation',
    definition:
      'Workflow automation connects applications and triggers so that a sequence of steps runs automatically when a condition is met — for example, a new form submission creating a CRM record, scheduling a call, and sending a confirmation. It removes manual hand-offs between systems and ensures each step happens consistently and on time.',
  },
  {
    term: 'OCR (Optical Character Recognition)',
    definition:
      'Optical character recognition (OCR) is technology that converts text inside images, scans, and PDFs into machine-readable data. In document automation, OCR is the first step that turns paper forms and scanned contracts into structured information an automated workflow can validate, route, and act on.',
  },
  {
    term: 'Low-Code Automation',
    definition:
      'Low-code automation builds working software and integrations using visual tools and configuration rather than writing everything from scratch in code. It allows robust business automations to be assembled and changed quickly on platforms like Make.com, n8n, and Airtable, shortening delivery time while keeping the door open for custom code where it adds value.',
  },
  {
    term: 'Penetration Testing',
    definition:
      'Penetration testing is an authorised, simulated cyberattack carried out by certified security engineers who think like adversaries to expose exploitable weaknesses before real attackers find them. Following standards such as PTES, the OWASP Web Security Testing Guide, and MITRE ATT&CK, a pentest produces reproducible findings and a remediation plan accepted as evidence for audits like SOC 2 and ISO 27001.',
  },
  {
    term: 'Vulnerability Scanning',
    definition:
      'Vulnerability scanning is the continuous, systematic process of identifying known weaknesses across web applications, APIs, and cloud infrastructure before an adversary can exploit them. Findings are scored using CVSS and mapped to business risk, producing a prioritised remediation plan rather than raw scanner output.',
  },
  {
    term: 'Systems Hardening',
    definition:
      'Systems hardening is the proactive work of reducing a system’s attack surface by applying secure configuration baselines across servers, cloud, containers, and databases. Grounded in standards like the CIS Benchmarks and NIST guidelines, hardening ensures that even if a vulnerability exists, attackers have far less to target.',
  },
  {
    term: 'Zero Trust',
    definition:
      'Zero Trust is a security model built on the principle “never trust, always verify.” Rather than assuming anything inside the network is safe, it continuously authenticates and authorises every user, device, and request with least-privilege access — a foundational approach for protecting cloud-native and AI-driven architectures.',
  },
];
