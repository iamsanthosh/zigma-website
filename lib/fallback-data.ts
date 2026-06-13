// Mirrors the Supabase seed data. Used as a fallback when Supabase env vars
// are not configured, so the project runs immediately after `npm install`.
// Once Supabase is connected, all of this is overridden by DB content.

export const FALLBACK_LABELS: Record<string, string> = {
  "site.name": "Zigma Technologies",
  "site.tagline": "Engineering tomorrow's infrastructure, today.",

  "nav.home": "Home",
  "nav.about": "About Us",
  "nav.solutions": "Solutions",
  "nav.products": "Products",
  "nav.industries": "Industries",
  "nav.case_studies": "Case Studies",
  "nav.resources": "Resources",
  "nav.careers": "Careers",
  "nav.contact": "Contact",
  "nav.cta.enquire": "Enquire Now",

  "footer.tagline": "Two decades of engineering excellence across technology, automation, power, security and solar.",
  "footer.quicklinks": "Quick Links",
  "footer.verticals": "Business Verticals",
  "footer.contact": "Get in Touch",
  "footer.rights": "All rights reserved.",
  "footer.newsletter.title": "Stay updated",
  "footer.newsletter.placeholder": "Enter your email",
  "footer.newsletter.cta": "Subscribe",

  "home.hero.eyebrow": "20 Years of Engineering Trust",
  "home.hero.title": "Powering Industry. Securing Infrastructure. Driving the Energy Transition.",
  "home.hero.subtitle": "From enterprise IT to industrial automation, power continuity to solar energy — Zigma Technologies delivers integrated solutions across seven specialized verticals.",
  "home.hero.cta_primary": "Explore Solutions",
  "home.hero.cta_secondary": "Talk to an Expert",

  "home.verticals.eyebrow": "What We Do",
  "home.verticals.title": "Seven Verticals. One Integrated Partner.",
  "home.verticals.subtitle": "Every department of your business, covered by a single technology partner with two decades of delivery experience.",

  "home.timeline.eyebrow": "Our Journey",
  "home.timeline.title": "Two Decades of Building What's Next",

  "home.casestudies.eyebrow": "Proven Impact",
  "home.casestudies.title": "Results Our Clients Stand Behind",

  "home.cta.title": "Ready to discuss your project?",
  "home.cta.subtitle": "Tell us about your requirements and our solution architects will get back within one business day.",
  "home.cta.button": "Request a Callback",

  "common.explore": "Explore",
  "common.learn_more": "Learn more",
  "common.read_more": "Read more",
  "common.view_all": "View all",
  "common.specifications": "Specifications",
  "common.overview": "Overview",
  "common.applications": "Applications",
  "common.related_products": "Related Products",
  "common.coming_soon": "Detailed offerings for this vertical are coming soon.",
  "common.faqs": "Frequently Asked Questions",
  "common.download_brochure": "Download Brochure",
  "common.request_quote": "Request a Quote",
  "common.whatsapp": "Chat on WhatsApp",
  "common.callback": "Request a Callback",

  "stats.years": "Years of Excellence",
  "stats.clients": "Clients Served",
  "stats.projects": "Projects Delivered",
  "stats.verticals": "Business Verticals",

  "vertical.ent_tech.title": "Enterprise Technology Solutions",
  "vertical.ent_tech.tag": "EN-01",
  "vertical.ent_tech.desc": "End-to-end IT infrastructure, networking and enterprise systems built for scale and resilience.",

  "vertical.automation.title": "Industrial Automation",
  "vertical.automation.tag": "AUT-02",
  "vertical.automation.desc": "PLC, SCADA and process automation solutions that keep production lines running efficiently.",

  "vertical.ups.title": "UPS Solutions",
  "vertical.ups.tag": "UPS-03",
  "vertical.ups.desc": "Critical power backup and continuity systems for enterprises, hospitals and data centers.",

  "vertical.security.title": "Security Solutions",
  "vertical.security.tag": "SEC-04",
  "vertical.security.desc": "Surveillance, access control and integrated security systems for safer facilities.",

  "vertical.software.title": "Software & Managed Services",
  "vertical.software.tag": "SWM-05",
  "vertical.software.desc": "Custom software, IT support and fully managed services backed by certified engineers.",

  "vertical.solar.title": "Solar Energy Solutions",
  "vertical.solar.tag": "SOL-06",
  "vertical.solar.desc": "Residential to industrial solar installations — on-grid, off-grid and hybrid systems with full lifecycle support.",

  "vertical.amc.title": "Annual Maintenance Services",
  "vertical.amc.tag": "AMC-07",
  "vertical.amc.desc": "Proactive maintenance contracts that maximize uptime and extend the life of your critical systems.",

  "solar.hero.title": "Solar Energy Solutions for Every Scale",
  "solar.hero.subtitle": "From rooftop residential systems to industrial-scale solar parks — Zigma designs, installs and maintains solar infrastructure that pays for itself.",
  "solar.quote.title": "Request a Solar Quote",
  "solar.quote.subtitle": "Share a few details and our solar consultants will prepare a customized proposal.",

  "form.name": "Full Name",
  "form.email": "Email Address",
  "form.phone": "Phone Number",
  "form.company": "Company Name",
  "form.message": "Message",
  "form.submit": "Submit Enquiry",
  "form.success": "Thank you. Our team will contact you shortly.",
  "form.error": "Something went wrong. Please try again.",
  "form.roof_area": "Roof Area (sq. ft.)",
  "form.monthly_bill": "Average Monthly Electricity Bill (₹)",
  "form.location": "Installation Location",
};

export const FALLBACK_VERTICALS = [
  {
    id: "v1",
    slug: "enterprise-technology",
    title_key: "vertical.ent_tech.title",
    tag_key: "vertical.ent_tech.tag",
    description_key: "vertical.ent_tech.desc",
    color_theme: "#1E5C8C",
    display_order: 1,
  },
  {
    id: "v2",
    slug: "industrial-automation",
    title_key: "vertical.automation.title",
    tag_key: "vertical.automation.tag",
    description_key: "vertical.automation.desc",
    color_theme: "#0A2A4A",
    display_order: 2,
  },
  {
    id: "v3",
    slug: "ups-solutions",
    title_key: "vertical.ups.title",
    tag_key: "vertical.ups.tag",
    description_key: "vertical.ups.desc",
    color_theme: "#3E7CB1",
    display_order: 3,
  },
  {
    id: "v4",
    slug: "security-solutions",
    title_key: "vertical.security.title",
    tag_key: "vertical.security.tag",
    description_key: "vertical.security.desc",
    color_theme: "#13202E",
    display_order: 4,
  },
  {
    id: "v5",
    slug: "software-managed-services",
    title_key: "vertical.software.title",
    tag_key: "vertical.software.tag",
    description_key: "vertical.software.desc",
    color_theme: "#1E5C8C",
    display_order: 5,
  },
  {
    id: "v6",
    slug: "solar-energy",
    title_key: "vertical.solar.title",
    tag_key: "vertical.solar.tag",
    description_key: "vertical.solar.desc",
    color_theme: "#E8A33D",
    display_order: 6,
  },
  {
    id: "v7",
    slug: "annual-maintenance",
    title_key: "vertical.amc.title",
    tag_key: "vertical.amc.tag",
    description_key: "vertical.amc.desc",
    color_theme: "#0A2A4A",
    display_order: 7,
  },
];

export const FALLBACK_HEADER_MENU = [
  { id: "m1", parent_id: null, label_key: "nav.home", url_slug: "/", display_order: 1, children: [] },
  { id: "m2", parent_id: null, label_key: "nav.about", url_slug: "/about", display_order: 2, children: [] },
  {
    id: "m3",
    parent_id: null,
    label_key: "nav.solutions",
    url_slug: "/solutions",
    display_order: 3,
    children: FALLBACK_VERTICALS.map((v, i) => ({
      id: `m3-${i}`,
      parent_id: "m3",
      label_key: v.title_key,
      url_slug: `/solutions/${v.slug}`,
      display_order: i,
      children: [],
    })),
  },
  {
    id: "m4",
    parent_id: null,
    label_key: "nav.products",
    url_slug: "/products",
    display_order: 4,
    children: [],
  },
  { id: "m5", parent_id: null, label_key: "nav.industries", url_slug: "/industries", display_order: 5, children: [] },
  { id: "m6", parent_id: null, label_key: "nav.case_studies", url_slug: "/case-studies", display_order: 6, children: [] },
  {
    id: "m7",
    parent_id: null,
    label_key: "nav.resources",
    url_slug: "/resources",
    display_order: 7,
    children: [],
  },
  { id: "m8", parent_id: null, label_key: "nav.careers", url_slug: "/careers", display_order: 8, children: [] },
  { id: "m9", parent_id: null, label_key: "nav.contact", url_slug: "/contact", display_order: 9, children: [] },
];

export const FALLBACK_FOOTER_MENU = [
  { id: "f1", parent_id: null, label_key: "nav.about", url_slug: "/about", display_order: 1, children: [] },
  { id: "f2", parent_id: null, label_key: "nav.case_studies", url_slug: "/case-studies", display_order: 2, children: [] },
  { id: "f3", parent_id: null, label_key: "nav.resources", url_slug: "/resources", display_order: 3, children: [] },
  { id: "f4", parent_id: null, label_key: "nav.careers", url_slug: "/careers", display_order: 4, children: [] },
  { id: "f5", parent_id: null, label_key: "nav.contact", url_slug: "/contact", display_order: 5, children: [] },
];

export const FALLBACK_STATS = [
  { id: "s1", stat_value: "20+", label_key: "stats.years", display_order: 1 },
  { id: "s2", stat_value: "500+", label_key: "stats.clients", display_order: 2 },
  { id: "s3", stat_value: "1000+", label_key: "stats.projects", display_order: 3 },
  { id: "s4", stat_value: "7", label_key: "stats.verticals", display_order: 4 },
];

export const FALLBACK_MILESTONES = [
  { id: "t1", year: 2005, title_key: "", title_text: "Zigma Technologies founded", description_text: "Started as a regional IT infrastructure provider." },
  { id: "t2", year: 2010, title_key: "", title_text: "Industrial Automation division launched", description_text: "Expanded into PLC/SCADA and process automation." },
  { id: "t3", year: 2014, title_key: "", title_text: "UPS & Power Solutions added", description_text: "Began delivering critical power backup systems for enterprises." },
  { id: "t4", year: 2018, title_key: "", title_text: "Security Solutions vertical established", description_text: "Integrated surveillance and access-control deployments at scale." },
  { id: "t5", year: 2021, title_key: "", title_text: "Software & Managed Services launched", description_text: "Added custom software and 24x7 managed IT support." },
  { id: "t6", year: 2025, title_key: "", title_text: "Solar Energy Solutions introduced", description_text: "Launched residential to industrial solar offerings with AMC support." },
];

export const SOLAR_PAGES = [
  { slug: "residential", label: "Residential Solar", desc: "Rooftop solar systems for homes that cut electricity bills and add long-term property value." },
  { slug: "commercial", label: "Commercial Solar", desc: "Solar installations for offices, retail and commercial buildings designed around business hours and load profiles." },
  { slug: "industrial", label: "Industrial Solar", desc: "High-capacity solar arrays engineered for factories, warehouses and large industrial sites." },
  { slug: "on-grid", label: "On-Grid Systems", desc: "Grid-connected solar systems that feed excess power back to the grid for maximum savings." },
  { slug: "off-grid", label: "Off-Grid Systems", desc: "Standalone solar power systems with battery storage for locations without reliable grid access." },
  { slug: "hybrid", label: "Hybrid Systems", desc: "Combined grid and battery backup systems that keep power flowing during outages." },
  { slug: "water-pumps", label: "Solar Water Pumps", desc: "Solar-powered pumping solutions for agriculture, irrigation and rural water supply." },
  { slug: "street-lights", label: "Solar Street Lights", desc: "Autonomous solar lighting for streets, campuses and public infrastructure." },
  { slug: "batteries", label: "Solar Batteries", desc: "High-cycle storage batteries that extend the value of every solar installation." },
  { slug: "inverters", label: "Solar Inverters", desc: "Reliable string and hybrid inverters that convert and manage solar power efficiently." },
  { slug: "amc", label: "Annual Maintenance Contracts", desc: "Scheduled maintenance and performance monitoring that keeps solar installations running at peak output." },
];

export type FallbackProduct = {
  id: string;
  slug: string;
  vertical_slug: string;
  name: string;
  short_desc: string;
  overview: string;
  applications: string;
  specs: { label: string; value: string }[];
  faqs: { q: string; a: string }[];
};

export const FALLBACK_PRODUCTS: FallbackProduct[] = [
  {
    id: "p1",
    slug: "enterprise-network-infrastructure",
    vertical_slug: "enterprise-technology",
    name: "Enterprise Network Infrastructure",
    short_desc: "Switching, routing and wireless infrastructure built for always-on enterprises.",
    overview:
      "A complete enterprise networking stack covering core switches, edge routers and managed Wi-Fi, designed for high availability and centralized monitoring across multiple sites.",
    applications: "Corporate offices, campuses, data centers, multi-branch enterprises.",
    specs: [
      { label: "Switching Capacity", value: "Up to 48-port 10G managed switches" },
      { label: "Redundancy", value: "Dual power supply, hot-swappable modules" },
      { label: "Wireless Standard", value: "Wi-Fi 6 (802.11ax)" },
      { label: "Management", value: "Centralized cloud dashboard" },
    ],
    faqs: [
      { q: "Can this be deployed across multiple branch offices?", a: "Yes, the platform supports centralized management across unlimited sites from a single dashboard." },
      { q: "Is on-site installation included?", a: "Installation, configuration and staff training are included in every deployment package." },
    ],
  },
  {
    id: "p2",
    slug: "cloud-data-center-solutions",
    vertical_slug: "enterprise-technology",
    name: "Cloud & Data Center Solutions",
    short_desc: "Hybrid cloud and on-premise data center design, virtualization and migration.",
    overview:
      "End-to-end data center modernization including server virtualization, storage consolidation and hybrid cloud connectivity for predictable performance and cost control.",
    applications: "Mid-to-large enterprises, BFSI, healthcare data centers.",
    specs: [
      { label: "Virtualization", value: "VMware / Hyper-V supported" },
      { label: "Storage", value: "Scalable SAN/NAS up to multi-petabyte" },
      { label: "Cloud Connectivity", value: "AWS, Azure, GCP hybrid links" },
      { label: "Backup", value: "Automated, encrypted, offsite replication" },
    ],
    faqs: [
      { q: "Do you support hybrid cloud setups?", a: "Yes, we design and manage hybrid architectures connecting on-premise infrastructure with major cloud providers." },
    ],
  },
  {
    id: "p3",
    slug: "plc-scada-automation",
    vertical_slug: "industrial-automation",
    name: "PLC & SCADA Automation Systems",
    short_desc: "Programmable logic controllers and SCADA platforms for process automation.",
    overview:
      "Integrated PLC and SCADA solutions that automate production lines, monitor process variables in real time and reduce manual intervention across manufacturing facilities.",
    applications: "Manufacturing plants, process industries, utilities.",
    specs: [
      { label: "Controller Types", value: "Modular and compact PLCs" },
      { label: "SCADA Platform", value: "Real-time monitoring & alarms" },
      { label: "Communication", value: "Modbus, Profibus, Ethernet/IP" },
      { label: "Scalability", value: "Single line to plant-wide deployment" },
    ],
    faqs: [
      { q: "Can existing machinery be retrofitted?", a: "Yes, our engineers assess existing equipment and design retrofit automation packages where feasible." },
    ],
  },
  {
    id: "p4",
    slug: "robotic-process-integration",
    vertical_slug: "industrial-automation",
    name: "Robotic Process Integration",
    short_desc: "Industrial robotics integration for assembly, packaging and material handling.",
    overview:
      "We integrate industrial robotic arms and automated guided vehicles into existing production environments, with safety systems and operator training included.",
    applications: "Automotive, electronics assembly, packaging lines, warehousing.",
    specs: [
      { label: "Robot Types", value: "6-axis arms, AGVs, palletizers" },
      { label: "Safety", value: "Light curtains, e-stops, fenced cells" },
      { label: "Integration", value: "Compatible with existing PLC/SCADA" },
    ],
    faqs: [
      { q: "Is training provided for operators?", a: "Yes, comprehensive operator and maintenance training is included with every robotic integration." },
    ],
  },
  {
    id: "p5",
    slug: "online-ups-systems",
    vertical_slug: "ups-solutions",
    name: "Online UPS Systems (1kVA–500kVA)",
    short_desc: "Double-conversion online UPS for zero-transfer-time power continuity.",
    overview:
      "True online double-conversion UPS systems that provide clean, continuous power for servers, data centers and critical equipment, with N+1 redundancy options.",
    applications: "Data centers, hospitals, banks, manufacturing control rooms.",
    specs: [
      { label: "Capacity Range", value: "1kVA – 500kVA" },
      { label: "Topology", value: "Double-conversion online" },
      { label: "Transfer Time", value: "0 ms (zero break)" },
      { label: "Battery Backup", value: "Configurable 10 min – 8 hrs" },
    ],
    faqs: [
      { q: "What backup time can I get?", a: "Backup time is fully configurable based on battery bank sizing — from 10 minutes to several hours." },
    ],
  },
  {
    id: "p6",
    slug: "modular-ups-data-center",
    vertical_slug: "ups-solutions",
    name: "Modular UPS for Data Centers",
    short_desc: "Hot-swappable modular UPS architecture for scalable, high-availability facilities.",
    overview:
      "Modular UPS units that allow capacity to be added incrementally and modules to be replaced without downtime — ideal for growing data center environments.",
    applications: "Data centers, colocation facilities, telecom hubs.",
    specs: [
      { label: "Module Size", value: "25kVA / 50kVA increments" },
      { label: "Redundancy", value: "N+1 / 2N configurations" },
      { label: "Hot-Swap", value: "Yes, no downtime required" },
    ],
    faqs: [
      { q: "Can capacity be increased later without downtime?", a: "Yes, additional power modules can be inserted live without interrupting the load." },
    ],
  },
  {
    id: "p7",
    slug: "ip-cctv-surveillance",
    vertical_slug: "security-solutions",
    name: "IP CCTV Surveillance Systems",
    short_desc: "HD and AI-enabled IP camera systems with centralized video management.",
    overview:
      "Full IP surveillance deployments including AI-based analytics (motion, intrusion, face detection), centralized VMS and remote mobile monitoring.",
    applications: "Corporate campuses, factories, retail chains, residential complexes.",
    specs: [
      { label: "Resolution", value: "Up to 4K / 8MP" },
      { label: "Analytics", value: "Motion, intrusion, line-crossing, face detection" },
      { label: "Storage", value: "NVR / Cloud hybrid recording" },
      { label: "Remote Access", value: "Mobile app + web portal" },
    ],
    faqs: [
      { q: "Can cameras be monitored remotely?", a: "Yes, all systems include mobile app access for live and recorded footage from anywhere." },
    ],
  },
  {
    id: "p8",
    slug: "access-control-systems",
    vertical_slug: "security-solutions",
    name: "Biometric Access Control Systems",
    short_desc: "Fingerprint, face and RFID-based access control with attendance integration.",
    overview:
      "Multi-factor access control systems combining biometric verification with RFID cards, integrated with time & attendance and visitor management modules.",
    applications: "Offices, factories, data centers, gated communities.",
    specs: [
      { label: "Authentication", value: "Fingerprint, Face, RFID, PIN" },
      { label: "Integration", value: "HRMS / Payroll attendance sync" },
      { label: "Door Capacity", value: "Single door to enterprise-wide" },
    ],
    faqs: [
      { q: "Does this integrate with our HR system for attendance?", a: "Yes, attendance data can be synced with most major HRMS and payroll platforms." },
    ],
  },
  {
    id: "p9",
    slug: "custom-erp-development",
    vertical_slug: "software-managed-services",
    name: "Custom ERP Development",
    short_desc: "Tailored ERP systems covering inventory, finance, HR and operations.",
    overview:
      "We design and build modular ERP systems aligned to your specific operational workflows, replacing spreadsheets and disconnected tools with one integrated platform.",
    applications: "Manufacturing, distribution, retail chains, service businesses.",
    specs: [
      { label: "Modules", value: "Inventory, Finance, HR, Sales, Procurement" },
      { label: "Deployment", value: "Cloud or on-premise" },
      { label: "Access", value: "Web and mobile" },
    ],
    faqs: [
      { q: "Can it integrate with our existing accounting software?", a: "Yes, our ERP solutions are built with integration connectors for popular accounting platforms." },
    ],
  },
  {
    id: "p10",
    slug: "managed-it-support",
    vertical_slug: "software-managed-services",
    name: "24x7 Managed IT Support",
    short_desc: "Round-the-clock IT helpdesk, monitoring and infrastructure management.",
    overview:
      "A fully managed IT support service covering helpdesk, proactive monitoring, patch management and on-site support, backed by SLA-driven response times.",
    applications: "SMEs and enterprises without large in-house IT teams.",
    specs: [
      { label: "Coverage", value: "24x7x365" },
      { label: "Response SLA", value: "Critical issues within 1 hour" },
      { label: "Monitoring", value: "Proactive infrastructure monitoring" },
    ],
    faqs: [
      { q: "What is the response time for critical issues?", a: "Critical issues are responded to within 1 hour as per our standard SLA, 24x7." },
    ],
  },
  {
    id: "p11",
    slug: "rooftop-solar-residential",
    vertical_slug: "solar-energy",
    name: "Rooftop Solar System – Residential (1-10 kW)",
    short_desc: "On-grid rooftop solar systems sized for homes, with subsidy assistance.",
    overview:
      "Complete residential rooftop solar packages including panels, inverter, mounting structure, net-metering coordination and government subsidy paperwork support.",
    applications: "Independent houses, villas, residential apartments.",
    specs: [
      { label: "Capacity Range", value: "1 kW – 10 kW" },
      { label: "Panel Type", value: "Mono PERC, 540W+" },
      { label: "Warranty", value: "25-year panel performance warranty" },
      { label: "Net Metering", value: "Assistance included" },
    ],
    faqs: [
      { q: "How long does installation take?", a: "Most residential rooftop installations are completed within 2-3 days after approvals." },
      { q: "Is government subsidy applicable?", a: "Yes, our team handles subsidy application paperwork as part of the installation package." },
    ],
  },
  {
    id: "p12",
    slug: "industrial-solar-park",
    vertical_slug: "solar-energy",
    name: "Industrial Solar Power Plant (100kW+)",
    short_desc: "Large-scale ground-mount and rooftop solar plants for industrial consumption.",
    overview:
      "Design, supply, installation and commissioning of large solar plants for industrial captive consumption, including structural design, grid synchronization and performance monitoring.",
    applications: "Factories, industrial parks, large commercial campuses.",
    specs: [
      { label: "Capacity Range", value: "100 kW – 5 MW+" },
      { label: "Mounting", value: "Ground-mount / rooftop / carport" },
      { label: "Monitoring", value: "Real-time SCADA-based performance dashboard" },
    ],
    faqs: [
      { q: "What is the typical payback period?", a: "Industrial solar installations typically achieve payback within 3-5 years depending on tariff and usage patterns." },
    ],
  },
];

export type FallbackIndustry = {
  id: string;
  slug: string;
  name: string;
  description: string;
};

export const FALLBACK_INDUSTRIES: FallbackIndustry[] = [
  { id: "i1", slug: "government", name: "Government & Public Sector", description: "Secure, compliant infrastructure and automation for government departments and public utilities." },
  { id: "i2", slug: "healthcare", name: "Healthcare", description: "Reliable power, security and IT infrastructure for hospitals and diagnostic centers." },
  { id: "i3", slug: "manufacturing", name: "Manufacturing", description: "Automation, power continuity and security systems built for production environments." },
  { id: "i4", slug: "education", name: "Education", description: "Campus-wide networking, security and solar solutions for schools and universities." },
  { id: "i5", slug: "banking-finance", name: "Banking & Finance", description: "High-availability infrastructure and surveillance for branches and data centers." },
  { id: "i6", slug: "retail", name: "Retail", description: "Networking, surveillance and solar solutions across multi-location retail chains." },
  { id: "i7", slug: "real-estate", name: "Real Estate & Infrastructure", description: "Integrated power, security and solar systems for residential and commercial developments." },
  { id: "i8", slug: "agriculture", name: "Agriculture", description: "Solar water pumping and irrigation power solutions for farms and rural infrastructure." },
];

export type FallbackCaseStudy = {
  id: string;
  slug: string;
  title: string;
  client_name: string;
  vertical_slug: string;
  summary: string;
  challenge: string;
  solution: string;
  result: string;
};

export const FALLBACK_CASE_STUDIES: FallbackCaseStudy[] = [
  {
    id: "c1",
    slug: "manufacturing-plant-automation-upgrade",
    title: "Automation Upgrade Cuts Downtime by 40% at Manufacturing Plant",
    client_name: "Leading Auto-Components Manufacturer",
    vertical_slug: "industrial-automation",
    summary: "A legacy production line was retrofitted with PLC/SCADA automation, reducing unplanned downtime significantly.",
    challenge: "Manual process controls were causing frequent unplanned stoppages and inconsistent quality across shifts.",
    solution: "Zigma retrofitted the line with modular PLCs, a centralized SCADA dashboard, and real-time alarm monitoring.",
    result: "Unplanned downtime reduced by 40%, with full visibility into line performance across all shifts.",
  },
  {
    id: "c2",
    slug: "hospital-ups-power-continuity",
    title: "Zero-Downtime Power for a 300-Bed Hospital",
    client_name: "Regional Multi-Specialty Hospital",
    vertical_slug: "ups-solutions",
    summary: "Modular online UPS deployment ensured uninterrupted power for critical care units.",
    challenge: "Frequent grid fluctuations were affecting ICU and operation theatre equipment.",
    solution: "Deployed N+1 modular online UPS systems with automated battery monitoring across critical wings.",
    result: "Achieved zero unplanned power interruptions to critical care areas since deployment.",
  },
  {
    id: "c3",
    slug: "retail-chain-surveillance-rollout",
    title: "Centralized Surveillance Across 50 Retail Outlets",
    client_name: "National Retail Chain",
    vertical_slug: "security-solutions",
    summary: "IP CCTV and centralized VMS rollout enabled remote monitoring across all store locations.",
    challenge: "Disconnected, store-level CCTV systems made loss-prevention and incident review slow and inconsistent.",
    solution: "Standardized IP camera deployment across 50 stores with centralized cloud-based VMS and mobile access.",
    result: "Incident response time reduced from days to hours, with centralized reporting for loss prevention teams.",
  },
  {
    id: "c4",
    slug: "campus-network-modernization",
    title: "Campus-Wide Network Modernization for University",
    client_name: "Private University Campus",
    vertical_slug: "enterprise-technology",
    summary: "Legacy wired network replaced with Wi-Fi 6 infrastructure across the entire campus.",
    challenge: "Outdated network infrastructure could not support growing device density across hostels and academic blocks.",
    solution: "Deployed enterprise-grade Wi-Fi 6 access points with centralized cloud management and segmented VLANs.",
    result: "Network reliability improved campus-wide, supporting 3x more concurrent connected devices.",
  },
  {
    id: "c5",
    slug: "industrial-solar-captive-plant",
    title: "1.2 MW Captive Solar Plant for Textile Manufacturer",
    client_name: "Textile Manufacturing Group",
    vertical_slug: "solar-energy",
    summary: "Ground-mount solar plant installed to offset rising grid electricity costs.",
    challenge: "Rising industrial power tariffs were impacting production cost competitiveness.",
    solution: "Designed and commissioned a 1.2 MW ground-mount solar plant with real-time performance monitoring.",
    result: "Achieved approximately 35% reduction in monthly electricity costs with a projected 4-year payback.",
  },
  {
    id: "c6",
    slug: "managed-it-support-bfsi",
    title: "24x7 Managed IT Support for Regional Bank Branches",
    client_name: "Regional Cooperative Bank",
    vertical_slug: "software-managed-services",
    summary: "Centralized managed IT support deployed across 30+ branch locations.",
    challenge: "Branch-level IT issues were causing service delays with no centralized tracking or SLAs.",
    solution: "Implemented 24x7 managed IT helpdesk with proactive monitoring and ticketing across all branches.",
    result: "Average issue resolution time improved by over 60%, with full SLA compliance reporting.",
  },
];

export type FallbackBlogPost = {
  id: string;
  slug: string;
  title: string;
  category: string;
  excerpt: string;
};

export const FALLBACK_BLOG_POSTS: FallbackBlogPost[] = [
  { id: "b1", slug: "solar-roi-explained", title: "Solar ROI Explained: What to Expect in Year 1 vs Year 5", category: "Solar ROI", excerpt: "A practical breakdown of how solar payback periods work for residential and industrial installations." },
  { id: "b2", slug: "choosing-online-vs-offline-ups", title: "Online vs Offline UPS: Which One Does Your Business Need?", category: "Industry Insights", excerpt: "Understanding the difference between UPS topologies and how to choose the right one for critical loads." },
  { id: "b3", slug: "plc-scada-basics", title: "PLC & SCADA Basics: A Primer for Plant Managers", category: "Industry Insights", excerpt: "An introduction to how programmable controllers and SCADA systems work together on the factory floor." },
  { id: "b4", slug: "ip-camera-vs-analog", title: "IP Cameras vs Analog: Making the Right Surveillance Choice", category: "Product Updates", excerpt: "Comparing IP and analog CCTV systems across cost, scalability and feature set." },
  { id: "b5", slug: "off-grid-solar-rural-applications", title: "Off-Grid Solar for Rural and Remote Applications", category: "Solar ROI", excerpt: "How off-grid solar systems are enabling power access in locations without reliable grid connectivity." },
  { id: "b6", slug: "managed-it-vs-inhouse-team", title: "Managed IT Services vs an In-House Team: Cost Comparison", category: "Industry Insights", excerpt: "A cost and capability comparison to help SMEs decide between managed IT and building an internal team." },
];

export type FallbackJob = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
};

export const FALLBACK_JOBS: FallbackJob[] = [
  { id: "j1", title: "Solar Installation Engineer", department: "Solar Energy Solutions", location: "Bengaluru, Karnataka", type: "Full-time" },
  { id: "j2", title: "PLC/SCADA Automation Engineer", department: "Industrial Automation", location: "Bengaluru, Karnataka", type: "Full-time" },
  { id: "j3", title: "Network Support Engineer", department: "Enterprise Technology Solutions", location: "Bengaluru, Karnataka", type: "Full-time" },
  { id: "j4", title: "Business Development Executive – Solar", department: "Solar Energy Solutions", location: "Bengaluru, Karnataka", type: "Full-time" },
  { id: "j5", title: "Service Engineer – UPS & Power Systems", department: "UPS Solutions", location: "Multiple Locations", type: "Full-time" },
];


export type FallbackOffice = {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  is_headquarters: boolean;
};

export const FALLBACK_OFFICES: FallbackOffice[] = [
  {
    id: "o1",
    name: "Head Office – Bengaluru",
    address: "Zigma Technologies, MG Road, Bengaluru, Karnataka 560001, India",
    phone: "+91 90000 00001",
    email: "info@zigmatech.example",
    is_headquarters: true,
  },
  {
    id: "o2",
    name: "Branch Office – Hyderabad",
    address: "Zigma Technologies, HITEC City, Hyderabad, Telangana 500081, India",
    phone: "+91 90000 00002",
    email: "hyderabad@zigmatech.example",
    is_headquarters: false,
  },
  {
    id: "o3",
    name: "Branch Office – Chennai",
    address: "Zigma Technologies, Guindy, Chennai, Tamil Nadu 600032, India",
    phone: "+91 90000 00003",
    email: "chennai@zigmatech.example",
    is_headquarters: false,
  },
];
