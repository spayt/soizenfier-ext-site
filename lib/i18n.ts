import {
  COMPANY_NAME,
  COMPANY_EMAIL,
  COMPANY_PHONE,
  COMPANY_ADDRESS,
} from "./config";
export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export type TranslationDictionary = {
  company: string;
  mail: {
    contact: string;
  };
  nav: {
    home: string;
    // ourWork: string;
    about: string;
    services: string;
    hosting: string;
    pricing: string;
    checkout: string;
    contactUs: string;
    kimuntu: string;
    privacy: string;
    terms: string;
  };
  home: {
    servicesHeading: string;
    serviceCards: {
      website: { title: string; desc: string };
      adminDashboards: { title: string; desc: string };
      hosting: { title: string; desc: string };
      maintenance: { title: string; desc: string };
      content: { title: string; desc: string };
      seo: { title: string; desc: string };
    };
    whyHeading: string;
    whyCards: { title: string; desc: string }[];
    processHeading: string;
    processSteps: { title: string; desc: string }[];
    testimonialsHeading: string;
    testimonials: { quote: string; name: string; business: string }[];
    featuredProjectsHeading: string;
    featuredProjectsCta: string;
    pricingPreviewHeading: string;
    pricingPreviewDescription: string;
    pricingPreviewSubtitle: string;
    pricingPreviewWebsiteLabel: string;
    pricingPreviewMaintenanceLabel: string;
    pricingPreviewButton: string;
    trustStats: { value: string; label: string }[];
    ctaHeading: string;
    ctaDescription: string;
    ctaButton: string;
    ctaSecondary: string;
  };
  hosting: {
    heading: string;
    title: string;
    description: string;
    planLabel: string;
    planPrice: string;
    planCycle: string;
    planDescription: string;
    planFeature1: string;
    planFeature2: string;
    planFeature3: string;
    button: string;
    paymentCta: string;
    infoTitle: string;
    infoDescription: string;
    infoFeature1: string;
    infoFeature2: string;
    infoFeature3: string;
    pageLabel: string;
    pageTitle: string;
    pageDescription: string;
    dedicatedHeading: string;
    dedicatedDescription: string;
    dedicatedFeature1Title: string;
    dedicatedFeature1Desc: string;
    dedicatedFeature2Title: string;
    dedicatedFeature2Desc: string;
    dashboardTitle: string;
    dashboardDescription: string;
    loading: string;
    connectedAs: string;
    activeHostingTitle: string;
    activeHostingDescription: string;
    signInPrompt: string;
    signIn: string;
    signOut: string;
  };
  hero: {
    subtitle: string;
    title: string;
    description: string;
    talkButton: string;
    seeWorkButton: string;
  };
  services: {
    heading: string;
    website: string;
    webApps: string;
    mobileApps: string;
    websiteDesc: string;
    webAppsDesc: string;
    mobileAppsDesc: string;
    websiteAlt: string;
    webAppsAlt: string;
    mobileAppsAlt: string;
  };
  projects: {
    pageTitle: string;
    pageDescription: string;
    featuredProject: string;
    viewDetails: string;
    backToHome: string;
    backToProjects: string;
    detailsHeading: string;
    delivered: string;
    readyTitle: string;
    readyDescription: string;
    contactTeam: string;
    list: Record<
      ProjectKey,
      {
        title: string;
        summary: string;
        description: string;
        features: string[];
      }
    >;
  };
  language: {
    en: string;
    fr: string;
  };
  footer: {
    company: string;
  };
  servicesPage: {
    heading: string;
    description: string;
    design: string;
    dashboards: string;
    hostedService: string;
    maintenance: string;
    content: string;
    seo: string;
    contactService: string;
    points: Record<
      | "design"
      | "dashboards"
      | "hostedService"
      | "maintenance"
      | "content"
      | "seo",
      string[]
    >;
  };
  pricingPage: {
    heading: string;
    description: string;
    packages: string;
    packagesPriceNote: string;
    plansBridge: string;
    plans: string;
    plansTrustLine: string;
    requestQuote: string;
    getStarted: string;
    mostPopular: string;
    noContract: string;
    customQuote: string;
    customQuoteDesc: string;
    websitePackages: Record<
      string,
      {
        title: string;
        priceRange: string;
        bullets: string[];
      }
    >;
    monthlyPlans: Record<
      string,
      {
        title: string;
        price: string;
        bullets: string[];
      }
    >;
  };
  aboutPage: {
    title: string;
    intro: string;
    whoWeAre: string;
    whoWeAreDesc: string;
    technologies: string;
    technologiesDesc: string;
    process: string;
    mission: string;
    missionDesc: string;
    getInTouch: string;
  };
  contactPage: {
    title: string;
    intro: string;
    contactForm: string;
    formNote: string;
    nameLabel: string;
    emailLabel: string;
    subjectLabel: string;
    messageLabel: string;
    submitButton: string;
    successMessage: string;
    errorMessage: string;
    emailUs: string;
    otherWays: string;
    phone: string;
    address: string;
    seePricing: string;
  };
  checkoutPage: {
    heading: string;
    description: string;
    oneTimeTitle: string;
    oneTimeDescription: string;
    recurringTitle: string;
    recurringDescription: string;
    ctaButton: string;
    successTitle: string;
    successMessage: string;
    errorMessage: string;
    backToPricing: string;
    signInToContinue: string;
  };
  profilePage: {
    title: string;
    signInRequired: string;
    signIn: string;
    accountInfo: string;
    name: string;
    email: string;
    role: string;
    memberSince: string;
    currentPlan: string;
    noPlan: string;
    planStatus: string;
    planRenews: string;
    planCancels: string;
    manageSubscription: string;
    changePlan: string;
    signOut: string;
    hostingInfo: string;
    hostingActive: string;
    hostingDescription: string;
    loadingPortal: string;
    loading: string;
  };
  adminPage: {
    title: string;
    accessDenied: string;
    accessDeniedMessage: string;
    subscribers: string;
    noSubscribers: string;
    userId: string;
    email: string;
    plan: string;
    status: string;
    renewsOn: string;
    canceledOn: string;
    loading: string;
  };
};

export type ProjectKey = "nextgenCommerce" | "fittrackMobile" | "zenboardPro";
export type ProjectSlug =
  | "nextgen-commerce"
  | "fittrack-mobile"
  | "zenboard-pro";

export const projectEntries = [
  { slug: "nextgen-commerce" as const, key: "nextgenCommerce" as const },
  { slug: "fittrack-mobile" as const, key: "fittrackMobile" as const },
  { slug: "zenboard-pro" as const, key: "zenboardPro" as const },
] as const;

const dictionaries: Record<Locale, TranslationDictionary> = {
  en: {
    company: COMPANY_NAME,
    mail: {
      contact: COMPANY_EMAIL,
    },
    nav: {
      home: "Home",
      // ourWork: "Our Work",
      about: "About",
      services: "Services",
      hosting: "Hosting",
      pricing: "Pricing",
      checkout: "Checkout",
      contactUs: "Contact Us",
      kimuntu: "Kimuntu Gallery",
      privacy: "Privacy",
      terms: "Terms",
    },
    home: {
      servicesHeading: "What we build",
      serviceCards: {
        website: {
          title: "Website Design & Development",
          desc: "Fast, SEO-friendly marketing sites and e-commerce.",
        },
        adminDashboards: {
          title: "Admin Dashboards",
          desc: "Membership management, reporting, and internal tools.",
        },
        hosting: {
          title: "Managed Hosting",
          desc: "Reliable website hosting with daily backups and security.",
        },
        maintenance: {
          title: "Website Maintenance",
          desc: "Ongoing updates, fixes, and publishing support.",
        },
        content: {
          title: "Content Updates",
          desc: "Fresh content, images, and page changes without the hassle.",
        },
        seo: {
          title: "SEO Monitoring",
          desc: "Search performance tracking and optimization support.",
        },
      },
      whyHeading: "Why Choose Us",
      whyCards: [
        {
          title: "Fast Loading Websites",
          desc: "Optimized performance and quick page speeds.",
        },
        {
          title: "Mobile-First Design",
          desc: "Responsive layouts that work on all devices.",
        },
        {
          title: "Secure Hosting",
          desc: "SSL, backups, and security monitoring included.",
        },
        {
          title: "Ongoing Support",
          desc: "Regular maintenance and updates for peace of mind.",
        },
        {
          title: "Transparent Pricing",
          desc: "Clear pricing packages with no hidden fees.",
        },
        {
          title: "Direct Communication",
          desc: "Work directly with the founder, no middlemen.",
        },
      ],
      processHeading: "Our Process",
      processSteps: [
        {
          title: "Discovery",
          desc: "Understanding your goals and requirements.",
        },
        {
          title: "Design",
          desc: "Creating beautiful, user-focused layouts.",
        },
        {
          title: "Development",
          desc: "Building with modern, maintainable code.",
        },
        {
          title: "Launch",
          desc: "Deploying your site with care and support.",
        },
        {
          title: "Support & Growth",
          desc: "Ongoing updates and scaling assistance.",
        },
      ],
      testimonialsHeading: "What Our Clients Say",
      // TODO: replace with real client testimonials before launch
      testimonials: [
        {
          quote: "SoiZenFier built our site in under a month and contact inquiries tripled in the first 30 days. The price we agreed on is exactly what we paid — no surprises.",
          name: "Sarah L.",
          business: "Small Business Owner, Toronto",
        },
        {
          quote: "We needed a professional bilingual site without the agency runaround. They delivered clean work in both languages and communicated clearly throughout.",
          name: "Jean-François P.",
          business: "Professional Services, Montréal",
        },
      ],
      featuredProjectsHeading: "Featured Projects",
      featuredProjectsCta: "View case study →",
      pricingPreviewHeading: "Simple, Transparent Pricing",
      pricingPreviewDescription:
        "Website projects that fit your goals and budget.",
      pricingPreviewSubtitle: "Website Projects",
      pricingPreviewWebsiteLabel: "Website Projects",
      pricingPreviewMaintenanceLabel: "Maintenance Plans",
      pricingPreviewButton: "View All Plans",
      trustStats: [
        { value: "Fixed pricing", label: "No surprise invoices" },
        { value: "Bilingual", label: "French & English service" },
        { value: "All-in-one", label: "Design · Hosting · Maintenance" },
        { value: "No contract", label: "Monthly plans cancel anytime" },
      ],
      ctaHeading: "Ready to launch your project?",
      ctaDescription:
        "Let's work together to create a site that drives growth and engages your audience.",
      ctaButton: "Get a Quote",
      ctaSecondary: "Schedule Consultation",
    },
    hosting: {
      heading: "Hosting for your website",
      title: "Managed hosting and easy payment",
      description:
        "Keep your new website online with fast, secure hosting and simple monthly billing tailored for small businesses.",
      planLabel: "Starter plan",
      planPrice: "$59",
      planCycle: "per month",
      planDescription:
        "Our hosting includes performance monitoring, automated backups, and a smooth payment flow so your site stays reliable.",
      planFeature1: "Fast CDN and SSL included",
      planFeature2: "Daily backups and uptime monitoring",
      planFeature3: "Easy payment via email quote",
      button: "Request hosting",
      paymentCta: "Simple monthly billing",
      infoTitle: "Why host with us",
      infoDescription:
        "We handle hosting setup, security, and maintenance so you can focus on your business.",
      infoFeature1: "Managed server configuration",
      infoFeature2: "Transparent pricing and invoices",
      infoFeature3: "Support for website updates",
      pageLabel: "Hosting dashboard",
      pageTitle: "Connected hosting management",
      pageDescription:
        "This page is for customers who are already connected and want to manage their hosting plan, billing, and uptime.",
      dedicatedHeading: "Your hosting control center",
      dedicatedDescription:
        "Sign in to access your website hosting status, billing details, and service updates in one place.",
      dedicatedFeature1Title: "Billing transparency",
      dedicatedFeature1Desc:
        "Check your active plan, payment cycle, and renewal details without leaving the page.",
      dedicatedFeature2Title: "Performance insights",
      dedicatedFeature2Desc:
        "Monitor hosting uptime, security status, and delivery performance for your website.",
      dashboardTitle: "Connected user portal",
      dashboardDescription:
        "Sign in with your Google account to manage hosting access and track your active subscription.",
      loading: "Checking connection status...",
      connectedAs: "Connected as",
      activeHostingTitle: "Hosting is active",
      activeHostingDescription:
        "Your website hosting plan is live and ready for updates, maintenance, and scaling.",
      signInPrompt:
        "Please sign in to access your hosting dashboard and payment options.",
      signIn: "Sign in with Google",
      signOut: "Sign out",
    },
    language: {
      en: "English",
      fr: "Français",
    },
    hero: {
      subtitle: "Web • Web App • Mobile",
      title: "Professional Websites Built for Growth",
      description:
        "Custom websites, hosting, maintenance, content updates, and SEO monitoring — everything your business needs in one place.",
      talkButton: "Get a Quote",
      seeWorkButton: "Book a Consultation",
    },
    services: {
      heading: "What we build",
      website: "Websites",
      webApps: "Web Apps",
      mobileApps: "Mobile Apps",
      websiteDesc: "Fast, SEO-friendly marketing sites and e-commerce.",
      webAppsDesc: "Scalable single-page and server-driven applications.",
      mobileAppsDesc: "Native and cross-platform apps with great UX.",
      websiteAlt: "Websites",
      webAppsAlt: "Web apps",
      mobileAppsAlt: "Mobile apps",
    },
    projects: {
      pageTitle: "Built for modern brands and fast-growing teams.",
      pageDescription:
        "Explore our latest web, web app and mobile projects, each designed to create memorable experiences and measurable results.",
      featuredProject: "Featured project",
      viewDetails: "View details",
      backToHome: "Back to home",
      backToProjects: "Back to projects",
      detailsHeading: "Project details",
      delivered: "What we delivered",
      readyTitle: "Ready to build your next product?",
      readyDescription:
        "Every project begins with a clear strategy, beautiful design, and solid engineering. Let’s turn your website, web app, or mobile idea into something outstanding.",
      contactTeam: "Contact our team",
      list: {
        nextgenCommerce: {
          title: "NextGen Commerce",
          summary:
            "A high-performance storefront and headless CMS integration.",
          description:
            "A full-featured e-commerce platform that blends conversion-focused layouts with fast checkout, product discovery, and secure integration points.",
          features: [
            "Headless CMS content and product feeds",
            "Fast search and filtering UX",
            "Mobile-first responsive checkout",
          ],
        },
        fittrackMobile: {
          title: "FitTrack Mobile",
          summary:
            "A wellness companion app built for consistent habits and coaching.",
          description:
            "A cross-platform mobile experience with personalized goals, progress reporting, and beautiful onboarding flows.",
          features: [
            "Goal tracking and reminders",
            "Analytics dashboards",
            "Sync across devices",
          ],
        },
        zenboardPro: {
          title: "ZenBoard Pro",
          summary:
            "A productivity web app that keeps teams aligned without clutter.",
          description:
            "A simplified workspace tool that makes collaboration feel calm, organized, and easy to use.",
          features: [
            "Kanban-style boards with custom workflows",
            "Real-time updates and team notifications",
            "Flexible integrations for modern teams",
          ],
        },
      },
    },
    footer: {
      company: COMPANY_NAME,
    },
    servicesPage: {
      heading: "Website Services",
      description:
        "Comprehensive services from design to ongoing maintenance and SEO.",
      design: "Website Design & Development",
      dashboards: "Admin Dashboards",
      hostedService: "Managed Hosting",
      maintenance: "Website Maintenance",
      content: "Content Updates",
      seo: "SEO Monitoring",
      contactService: "Contact about this service",
      points: {
        design: [
          "Custom websites",
          "Responsive design",
          "Contact forms",
          "CMS integration",
          "Analytics",
        ],
        dashboards: [
          "Membership management",
          "Booking systems",
          "Internal tools",
          "Reporting dashboards",
        ],
        hostedService: [
          "SSL certificates",
          "Daily backups",
          "Monitoring",
          "CDN",
          "Security updates",
        ],
        maintenance: [
          "Bug fixes",
          "Framework updates",
          "Security patches",
          "Monthly reports",
        ],
        content: [
          "New pages",
          "Blog posts",
          "Event updates",
          "Image replacements",
        ],
        seo: [
          "Search Console setup",
          "Keyword tracking",
          "Performance reports",
          "Technical SEO checks",
        ],
      },
    },
    pricingPage: {
      heading: "Website Packages & Monthly Plans",
      description:
        "Transparent starting ranges — your exact price is confirmed before work begins.",
      packages: "Website Packages",
      packagesPriceNote:
        "Your exact price is confirmed before work begins. No surprises, ever.",
      plansBridge:
        "Site built? Keep it fast, secure and growing with a monthly care plan.",
      plans: "Monthly Care Plans",
      plansTrustLine: "Fixed monthly price · No contracts · No setup fees",
      requestQuote: "Get a Free Estimate",
      getStarted: "Get Started",
      mostPopular: "Most Popular",
      noContract: "No long-term contract · Cancel anytime",
      customQuote: "Need something different?",
      customQuoteDesc: "Every project is unique. Let's talk about yours.",
      websitePackages: {
        starter: {
          title: "Starter Website",
          priceRange: "$500 – $4,000 CAD",
          bullets: [
            "Up to 5 pages, ready to launch fast",
            "Mobile-first responsive design",
            "Contact form with email delivery",
            "Basic SEO so Google can find you",
          ],
        },
        business: {
          title: "Business Website",
          priceRange: "$4,000 – $8,000 CAD",
          bullets: [
            "10–20 pages with flexible CMS",
            "Blog ready to publish on day one",
            "Advanced SEO setup from the start",
            "Scales as your business grows",
          ],
        },
        custom: {
          title: "Custom Platform",
          priceRange: "$8,000 – $25,000+ CAD",
          bullets: [
            "Custom dashboard built to your workflow",
            "Stripe payments & subscriptions",
            "User accounts with role management",
            "Automation to save you hours weekly",
          ],
        },
      },
      monthlyPlans: {
        essential: {
          title: "Essential Care",
          price: "$99 CAD/month",
          bullets: [
            "Reliable managed hosting",
            "SSL certificate included",
            "Daily backups — nothing ever lost",
            "24/7 uptime monitoring",
          ],
        },
        growth: {
          title: "Growth Plan",
          price: "$249 CAD/month",
          bullets: [
            "Everything in Essential",
            "1 hour of site updates/month",
            "Monthly maintenance & health report",
          ],
        },
        premium: {
          title: "Premium Plan",
          price: "$499 CAD/month",
          bullets: [
            "Everything in Growth",
            "Up to 4 hours of updates/month",
            "SEO monitoring with monthly report",
            "Priority support — same business day",
          ],
        },
        "managed-content": {
          title: "Managed Content Plan",
          price: "From $799 CAD/month",
          bullets: [
            "Unlimited content updates",
            "New landing pages on request",
            "Blog publishing & formatting",
            "SEO recommendations each month",
          ],
        },
      },
    },
    aboutPage: {
      title: "About",
      intro:
        "We build and maintain modern websites and web applications for businesses, associations, and growing organizations.",
      whoWeAre: "Who we are",
      whoWeAreDesc:
        "A boutique agency led by a solo founder focused on clear communication and measurable outcomes.",
      technologies: "Technologies",
      technologiesDesc:
        "Next.js, React, TypeScript, Tailwind CSS, Headless CMS and serverless integrations.",
      process: "Process",
      mission: "Mission",
      missionDesc:
        "Deliver professional websites that help organizations grow with predictable, transparent pricing and ongoing support.",
      getInTouch: "Get in touch",
    },
    contactPage: {
      title: "Contact",
      intro:
        "Ready to launch your next website? Reach out and we'll schedule a consultation.",
      contactForm: "Contact form",
      formNote: "Fill out the form below and we'll reply as soon as possible.",
      nameLabel: "Your name",
      emailLabel: "Email address",
      subjectLabel: "Subject",
      messageLabel: "Message",
      submitButton: "Send message",
      successMessage: "Thank you! Your message has been sent.",
      errorMessage: "Something went wrong. Please try again later.",
      emailUs: "Email us",
      otherWays: "Other ways to reach us",
      phone: COMPANY_PHONE,
      address: COMPANY_ADDRESS,
      seePricing: "See pricing packages",
    },
    checkoutPage: {
      heading: "Secure Stripe Checkout",
      description:
        "Choose the payment option that fits your project and complete it with Stripe.",
      oneTimeTitle: "One-time payment",
      oneTimeDescription:
        "A single secure payment for design, development, or project setup.",
      recurringTitle: "Monthly subscription",
      recurringDescription:
        "Ongoing support, hosting, and maintenance billed each month.",
      ctaButton: "Continue to Stripe",
      successTitle: "Payment completed",
      successMessage:
        "Thank you! Your checkout is complete. We will follow up shortly.",
      errorMessage:
        "There was an issue creating the checkout session. Please try again.",
      backToPricing: "Back to pricing",
      signInToContinue: "Sign in to continue",
    },
    profilePage: {
      title: "My Profile",
      signInRequired: "Please sign in to access your profile.",
      signIn: "Sign in",
      accountInfo: "Account Information",
      name: "Name",
      email: "Email",
      role: "Role",
      memberSince: "Member since",
      currentPlan: "Current Plan",
      noPlan: "No active subscription",
      planStatus: "Status",
      planRenews: "Renews on",
      planCancels: "Cancels on",
      manageSubscription: "Manage Subscription & Payment",
      changePlan: "Change Plan",
      signOut: "Sign Out",
      hostingInfo: "Hosting Information",
      hostingActive: "Your hosting plan is active",
      hostingDescription:
        "Manage your hosting settings, billing details, and service updates through the hosting portal.",
      loadingPortal: "Opening portal…",
      loading: "Loading profile…",
    },
    adminPage: {
      title: "Administrator Dashboard",
      accessDenied: "Access Denied",
      accessDeniedMessage: "You do not have administrator access to this page.",
      subscribers: "Subscribers",
      noSubscribers: "No subscribers found.",
      userId: "User ID",
      email: "Email",
      plan: "Plan",
      status: "Status",
      renewsOn: "Renews On",
      canceledOn: "Canceled On",
      loading: "Loading subscribers…",
    },
  },
  fr: {
    company: COMPANY_NAME,
    mail: {
      contact: COMPANY_EMAIL,
    },
    nav: {
      home: "Accueil",
      // ourWork: "Notre travail",
      about: "À propos",
      services: "Services",
      hosting: "Hébergement",
      pricing: "Tarifs",
      checkout: "Paiement",
      contactUs: "Contactez-nous",
      kimuntu: "Galerie Kimuntu",
      privacy: "Confidentialité",
      terms: "Conditions",
    },
    home: {
      servicesHeading: "Ce que nous construisons",
      serviceCards: {
        website: {
          title: "Conception & développement de sites web",
          desc: "Sites marketing rapides, optimisés SEO et e-commerce.",
        },
        adminDashboards: {
          title: "Tableaux de bord d'administration",
          desc: "Gestion des membres, rapports et outils internes.",
        },
        hosting: {
          title: "Hébergement géré",
          desc: "Hébergement fiable avec sauvegardes quotidiennes et sécurité.",
        },
        maintenance: {
          title: "Maintenance de site web",
          desc: "Mises à jour continues, corrections et support de publication.",
        },
        content: {
          title: "Mises à jour de contenu",
          desc: "Contenu frais, images et modifications de pages sans effort.",
        },
        seo: {
          title: "Suivi SEO",
          desc: "Suivi des performances de recherche et optimisation.",
        },
      },
      whyHeading: "Pourquoi nous choisir",
      whyCards: [
        {
          title: "Sites rapides",
          desc: "Performances optimisées et vitesse de chargement élevée.",
        },
        {
          title: "Design mobile-first",
          desc: "Des mises en page réactives qui fonctionnent sur tous les appareils.",
        },
        {
          title: "Hébergement sécurisé",
          desc: "SSL, sauvegardes et surveillance de la sécurité inclus.",
        },
        {
          title: "Support continu",
          desc: "Maintenance régulière et mises à jour pour plus de sérénité.",
        },
        {
          title: "Tarification transparente",
          desc: "Des forfaits clairs sans frais cachés.",
        },
        {
          title: "Communication directe",
          desc: "Travaillez directement avec le fondateur, sans intermédiaire.",
        },
      ],
      processHeading: "Notre processus",
      processSteps: [
        {
          title: "Découverte",
          desc: "Comprendre vos objectifs et vos besoins.",
        },
        {
          title: "Conception",
          desc: "Créer des parcours utilisateurs clairs et attractifs.",
        },
        {
          title: "Développement",
          desc: "Construire avec du code moderne et maintenable.",
        },
        {
          title: "Lancement",
          desc: "Déployer votre site avec soin et support.",
        },
        {
          title: "Support & Croissance",
          desc: "Mises à jour continues et assistance pour évoluer.",
        },
      ],
      testimonialsHeading: "Ce que disent nos clients",
      // TODO: remplacer par de vrais témoignages clients avant le lancement
      testimonials: [
        {
          quote: "SoiZenFier a livré notre site en moins d'un mois et nos demandes de contact ont triplé en 30 jours. Le prix convenu est exactement ce qu'on a payé — aucune surprise.",
          name: "Sarah L.",
          business: "Propriétaire PME, Toronto",
        },
        {
          quote: "Nous voulions un site bilingue professionnel sans les délais d'une grande agence. Ils ont livré un travail soigné dans les deux langues avec une communication claire.",
          name: "Jean-François P.",
          business: "Services professionnels, Montréal",
        },
      ],
      featuredProjectsHeading: "Projets en vedette",
      featuredProjectsCta: "Voir l'étude de cas →",
      pricingPreviewHeading: "Tarification simple et transparente",
      pricingPreviewDescription:
        "Des projets web adaptés à vos objectifs et votre budget.",
      pricingPreviewSubtitle: "Projets Web",
      pricingPreviewWebsiteLabel: "Projets Web",
      pricingPreviewMaintenanceLabel: "Forfaits de maintenance",
      pricingPreviewButton: "Voir tous les forfaits",
      trustStats: [
        { value: "Prix fixes", label: "Aucune facture surprise" },
        { value: "Bilingue", label: "Service en français et en anglais" },
        { value: "Tout inclus", label: "Design · Hébergement · Maintenance" },
        { value: "Sans engagement", label: "Plans mensuels résiliables à tout moment" },
      ],
      ctaHeading: "Prêt à lancer votre projet ?",
      ctaDescription:
        "Collaborons pour créer un site qui stimule la croissance et engage votre audience.",
      ctaButton: "Demandez un devis",
      ctaSecondary: "Planifier une consultation",
    },
    hosting: {
      heading: "Hébergement pour votre site",
      title: "Hébergement géré et paiement simple",
      description:
        "Gardez votre nouveau site en ligne avec un hébergement rapide, sécurisé et une facturation mensuelle claire pour les petites entreprises.",
      planLabel: "Plan de base",
      planPrice: "59€",
      planCycle: "par mois",
      planDescription:
        "Notre hébergement inclut la surveillance des performances, des sauvegardes automatisées et un paiement simplifié pour un site fiable.",
      planFeature1: "CDN rapide et SSL inclus",
      planFeature2: "Sauvegardes quotidiennes et supervision",
      planFeature3: "Paiement simple sur demande",
      button: "Demander l'hébergement",
      paymentCta: "Facturation mensuelle simple",
      infoTitle: "Pourquoi nous héberger",
      infoDescription:
        "Nous gérons la configuration, la sécurité et la maintenance de l'hébergement pour que vous puissiez vous concentrer sur votre activité.",
      infoFeature1: "Configuration serveur gérée",
      infoFeature2: "Tarification transparente",
      infoFeature3: "Support pour les mises à jour",
      pageLabel: "Espace d'hébergement",
      pageTitle: "Gestion d'hébergement connectée",
      pageDescription:
        "Cette page est destinée aux clients déjà connectés qui souhaitent gérer leur hébergement, leur facturation et leur disponibilité.",
      dedicatedHeading: "Votre centre de contrôle d'hébergement",
      dedicatedDescription:
        "Connectez-vous pour accéder au statut d'hébergement, aux détails de facturation et aux mises à jour de service en un seul endroit.",
      dedicatedFeature1Title: "Transparence de facturation",
      dedicatedFeature1Desc:
        "Vérifiez votre plan actif, votre cycle de paiement et les détails de renouvellement sans quitter la page.",
      dedicatedFeature2Title: "Informations de performance",
      dedicatedFeature2Desc:
        "Surveillez le temps de disponibilité de l'hébergement, l'état de la sécurité et les performances de livraison de votre site.",
      dashboardTitle: "Portail utilisateur connecté",
      dashboardDescription:
        "Connectez-vous avec votre compte Google pour gérer l'accès à l'hébergement et suivre votre abonnement actif.",
      loading: "Vérification de l'état de connexion...",
      connectedAs: "Connecté en tant que",
      activeHostingTitle: "Hébergement actif",
      activeHostingDescription:
        "Votre plan d'hébergement est en ligne et prêt pour les mises à jour, la maintenance et la montée en charge.",
      signInPrompt:
        "Veuillez vous connecter pour accéder à votre tableau de bord d'hébergement et aux options de paiement.",
      signIn: "Se connecter avec Google",
      signOut: "Se déconnecter",
    },
    language: {
      en: "English",
      fr: "Français",
    },
    hero: {
      subtitle: "Web • Web App • Mobile",
      title: "Design réfléchi, ingénierie fiable.",
      description:
        "Nous créons de beaux sites web, des applications web puissantes et des expériences mobiles agréables qui aident les entreprises à se développer et les clients à s'engager.",
      talkButton: "Contactez-nous",
      seeWorkButton: "Réserver une consultation",
    },
    services: {
      heading: "Ce que nous construisons",
      website: "Sites web",
      webApps: "Applications web",
      mobileApps: "Applications mobiles",
      websiteDesc:
        "Sites marketing rapides, optimisés pour le référencement et e-commerce.",
      webAppsDesc: "Applications monopage et serveur évolutives.",
      mobileAppsDesc:
        "Applications natives et multiplateformes avec une excellente expérience utilisateur.",
      websiteAlt: "Sites web",
      webAppsAlt: "Applications web",
      mobileAppsAlt: "Applications mobiles",
    },
    projects: {
      pageTitle:
        "Conçu pour des marques modernes et des équipes en croissance.",
      pageDescription:
        "Découvrez nos derniers projets web, application web et mobile, conçus pour créer des expériences mémorables et des résultats mesurables.",
      featuredProject: "Projet en vedette",
      viewDetails: "Voir les détails",
      backToHome: "Retour à l'accueil",
      backToProjects: "Retour aux projets",
      detailsHeading: "Détails du projet",
      delivered: "Ce que nous avons livré",
      readyTitle: "Prêt à construire votre prochain produit ?",
      readyDescription:
        "Chaque projet commence par une stratégie claire, un design soigné et une ingénierie solide. Transformons votre idée de site web, d'application web ou mobile en quelque chose d'exceptionnel.",
      contactTeam: "Contactez notre équipe",
      list: {
        nextgenCommerce: {
          title: "NextGen Commerce",
          summary: "Une vitrine moderne avec une intégration CMS sans tête.",
          description:
            "Une plateforme e-commerce complète qui combine des mises en page axées sur la conversion avec un paiement rapide, la découverte de produits et des points d'intégration sécurisés.",
          features: [
            "Contenu CMS sans tête et flux de produits",
            "Recherche et filtrage rapides",
            "Paiement responsive orienté mobile",
          ],
        },
        fittrackMobile: {
          title: "FitTrack Mobile",
          summary:
            "Une application bien-être pour des habitudes constantes et du coaching.",
          description:
            "Une expérience mobile multiplateforme avec des objectifs personnalisés, des rapports d'avancement et des flux d'intégration élégants.",
          features: [
            "Suivi des objectifs et rappels",
            "Tableaux de bord analytiques",
            "Synchronisation entre appareils",
          ],
        },
        zenboardPro: {
          title: "ZenBoard Pro",
          summary:
            "Une application de productivité qui garde les équipes alignées sans encombrement.",
          description:
            "Un outil de travail simplifié qui rend la collaboration calme, organisée et facile à utiliser.",
          features: [
            "Tableaux Kanban avec flux de travail personnalisés",
            "Mises à jour en temps réel et notifications d'équipe",
            "Intégrations flexibles pour les équipes modernes",
          ],
        },
      },
    },
    footer: {
      company: COMPANY_NAME,
    },
    servicesPage: {
      heading: "Services Web",
      description:
        "Services complets de conception à la maintenance continue et au SEO.",
      design: "Conception et développement Web",
      dashboards: "Tableaux de bord d'administration",
      hostedService: "Hébergement géré",
      maintenance: "Maintenance Web",
      content: "Mises à jour de contenu",
      seo: "Suivi SEO",
      contactService: "Contacter pour ce service",
      points: {
        design: [
          "Sites web sur mesure",
          "Design responsive",
          "Formulaires de contact",
          "Intégration CMS",
          "Analytique",
        ],
        dashboards: [
          "Gestion des membres",
          "Systèmes de réservation",
          "Outils internes",
          "Tableaux de bord de reporting",
        ],
        hostedService: [
          "Certificats SSL",
          "Sauvegardes quotidiennes",
          "Surveillance",
          "CDN",
          "Mises à jour de sécurité",
        ],
        maintenance: [
          "Corrections de bugs",
          "Mises à jour du framework",
          "Patches de sécurité",
          "Rapports mensuels",
        ],
        content: [
          "Nouvelles pages",
          "Articles de blog",
          "Mises à jour d'événements",
          "Remplacements d'images",
        ],
        seo: [
          "Configuration Search Console",
          "Suivi des mots-clés",
          "Rapports de performance",
          "Contrôles SEO techniques",
        ],
      },
    },
    pricingPage: {
      heading: "Forfaits Web et plans mensuels",
      description:
        "Tarifs de base transparents — votre prix exact est confirmé avant le début des travaux.",
      packages: "Forfaits Web",
      packagesPriceNote:
        "Votre prix exact est confirmé avant le début des travaux. Sans surprise, jamais.",
      plansBridge:
        "Site lancé ? Gardez-le rapide, sécurisé et en croissance avec un plan mensuel.",
      plans: "Plans de maintenance mensuels",
      plansTrustLine: "Prix mensuel fixe · Sans engagement · Sans frais d'installation",
      requestQuote: "Obtenir une estimation",
      getStarted: "Commencer",
      mostPopular: "Le plus populaire",
      noContract: "Sans engagement · Annulation à tout moment",
      customQuote: "Besoin d'autre chose ?",
      customQuoteDesc: "Chaque projet est unique. Parlons du vôtre.",
      websitePackages: {
        starter: {
          title: "Forfait de démarrage",
          priceRange: "500 $ – 4 000 $ CAD",
          bullets: [
            "Jusqu'à 5 pages, prêt à lancer rapidement",
            "Design responsive mobile-first",
            "Formulaire de contact avec livraison par e-mail",
            "SEO de base pour être trouvé sur Google",
          ],
        },
        business: {
          title: "Forfait Affaires",
          priceRange: "4 000 $ – 8 000 $ CAD",
          bullets: [
            "10 à 20 pages avec CMS flexible",
            "Blog prêt à publier dès le premier jour",
            "Configuration SEO avancée dès le départ",
            "Évolue au rythme de votre entreprise",
          ],
        },
        custom: {
          title: "Plateforme sur mesure",
          priceRange: "8 000 $ – 25 000+ $ CAD",
          bullets: [
            "Tableau de bord personnalisé selon votre flux de travail",
            "Paiements Stripe et abonnements",
            "Comptes utilisateurs avec gestion des rôles",
            "Automatisation pour gagner des heures chaque semaine",
          ],
        },
      },
      monthlyPlans: {
        essential: {
          title: "Assistance essentielle",
          price: "99 $ CAD/mois",
          bullets: [
            "Hébergement géré fiable",
            "Certificat SSL inclus",
            "Sauvegardes quotidiennes — rien n'est jamais perdu",
            "Surveillance de disponibilité 24h/7j",
          ],
        },
        growth: {
          title: "Plan Croissance",
          price: "249 $ CAD/mois",
          bullets: [
            "Tout ce qui est dans Essentiel",
            "1 heure de mises à jour/mois",
            "Rapport de maintenance mensuel",
          ],
        },
        premium: {
          title: "Plan Premium",
          price: "499 $ CAD/mois",
          bullets: [
            "Tout ce qui est dans Croissance",
            "Jusqu'à 4 heures de mises à jour/mois",
            "Suivi SEO avec rapport mensuel",
            "Support prioritaire — réponse le jour même",
          ],
        },
        "managed-content": {
          title: "Forfait Contenu géré",
          price: "À partir de 799 $ CAD/mois",
          bullets: [
            "Mises à jour de contenu illimitées",
            "Nouvelles pages d'atterrissage sur demande",
            "Publication et mise en forme de blog",
            "Recommandations SEO chaque mois",
          ],
        },
      },
    },
    aboutPage: {
      title: "À propos",
      intro:
        "Nous créons et maintenons des sites web modernes et des applications web pour les entreprises, les associations et les organisations en croissance.",
      whoWeAre: "Qui sommes-nous",
      whoWeAreDesc:
        "Une agence de boutique dirigée par un fondateur solo concentré sur la communication claire et les résultats mesurables.",
      technologies: "Technologies",
      technologiesDesc:
        "Next.js, React, TypeScript, Tailwind CSS, CMS headless et intégrations serverless.",
      process: "Processus",
      mission: "Mission",
      missionDesc:
        "Fournir des sites web professionnels qui aident les organisations à se développer avec des tarifs prévisibles, transparents et un support continu.",
      getInTouch: "Nous contacter",
    },
    contactPage: {
      title: "Contact",
      intro:
        "Prêt à lancer votre prochain site web ? Contactez-nous et nous planifierons une consultation.",
      contactForm: "Formulaire de contact",
      formNote:
        "Remplissez le formulaire ci-dessous et nous répondrons dès que possible.",
      nameLabel: "Votre nom",
      emailLabel: "Adresse email",
      subjectLabel: "Sujet",
      messageLabel: "Message",
      submitButton: "Envoyer le message",
      successMessage: "Merci ! Votre message a été envoyé.",
      errorMessage: "Une erreur est survenue. Veuillez réessayer plus tard.",
      emailUs: "Nous envoyer un email",
      otherWays: "Autres façons de nous contacter",
      phone: COMPANY_PHONE,
      address: COMPANY_ADDRESS,
      seePricing: "Voir les forfaits tarifaires",
    },
    checkoutPage: {
      heading: "Paiement sécurisé Stripe",
      description:
        "Choisissez l'option de paiement adaptée à votre projet et finalisez-la avec Stripe.",
      oneTimeTitle: "Paiement unique",
      oneTimeDescription:
        "Un paiement sécurisé unique pour la conception, le développement ou la mise en place du projet.",
      recurringTitle: "Abonnement mensuel",
      recurringDescription:
        "Support continu, hébergement et maintenance facturés chaque mois.",
      ctaButton: "Continuer vers Stripe",
      successTitle: "Paiement terminé",
      successMessage:
        "Merci ! Votre paiement est terminé. Nous vous contacterons prochainement.",
      errorMessage:
        "Une erreur est survenue lors de la création de la session de paiement. Veuillez réessayer.",
      backToPricing: "Retour aux tarifs",
      signInToContinue: "Se connecter pour continuer",
    },
    profilePage: {
      title: "Mon profil",
      signInRequired: "Veuillez vous connecter pour accéder à votre profil.",
      signIn: "Se connecter",
      accountInfo: "Informations du compte",
      name: "Nom",
      email: "Courriel",
      role: "Rôle",
      memberSince: "Membre depuis",
      currentPlan: "Plan actuel",
      noPlan: "Aucun abonnement actif",
      planStatus: "Statut",
      planRenews: "Renouvellement le",
      planCancels: "Annulation le",
      manageSubscription: "Gérer l'abonnement et le paiement",
      changePlan: "Changer de plan",
      signOut: "Se déconnecter",
      hostingInfo: "Informations d'hébergement",
      hostingActive: "Votre plan d'hébergement est actif",
      hostingDescription:
        "Gérez vos paramètres d'hébergement, les détails de facturation et les mises à jour de service via le portail d'hébergement.",
      loadingPortal: "Ouverture du portail…",
      loading: "Chargement du profil…",
    },
    adminPage: {
      title: "Tableau de bord administrateur",
      accessDenied: "Accès refusé",
      accessDeniedMessage:
        "Vous n'avez pas les droits d'administrateur pour accéder à cette page.",
      subscribers: "Abonnés",
      noSubscribers: "Aucun abonné trouvé.",
      userId: "Identifiant utilisateur",
      email: "Courriel",
      plan: "Plan",
      status: "Statut",
      renewsOn: "Renouvellement le",
      canceledOn: "Annulé le",
      loading: "Chargement des abonnés…",
    },
  },
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function getDictionary(
  locale: string | undefined,
): TranslationDictionary {
  return dictionaries[isLocale(locale) ? locale : defaultLocale];
}

export function translate(
  dictionary: TranslationDictionary,
  key: string,
): string {
  const value = key.split(".").reduce<unknown>((item, segment) => {
    if (typeof item !== "object" || item === null) return undefined;
    return (item as Record<string, unknown>)[segment];
  }, dictionary);

  return typeof value === "string" ? value : key;
}

export function localePath(locale: Locale, path: string): string {
  return `/${locale}${path}`;
}

export function getProjectParams() {
  return projectEntries.map((project) => ({ slug: project.slug }));
}

export function getProjectList(dictionary: TranslationDictionary) {
  return projectEntries.map((project) => ({
    slug: project.slug,
    title: translate(dictionary, `projects.list.${project.key}.title`),
    summary: translate(dictionary, `projects.list.${project.key}.summary`),
  }));
}

export function isProjectSlug(value: string | undefined): value is ProjectSlug {
  return projectEntries.some((project) => project.slug === value);
}

export function getProjectDetail(
  slug: ProjectSlug,
  dictionary: TranslationDictionary,
) {
  const project = projectEntries.find((item) => item.slug === slug);
  if (!project) return null;

  return {
    slug: project.slug,
    title: translate(dictionary, `projects.list.${project.key}.title`),
    summary: translate(dictionary, `projects.list.${project.key}.summary`),
    description: translate(
      dictionary,
      `projects.list.${project.key}.description`,
    ),
    features: dictionary.projects.list[project.key].features,
  };
}
