export const locales = ["en", "fr"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";
const compagnyEmail = "admin@soizenfier.com";
const compagnyPhone = "(438) 985-1221";

export type TranslationDictionary = {
  company: string;
  mail: {
    contact: string;
  };
  nav: {
    ourWork: string;
    services: string;
    hosting: string;
    contactUs: string;
    privacy: string;
    terms: string;
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
  };
  pricingPage: {
    heading: string;
    description: string;
    packages: string;
    plans: string;
    requestQuote: string;
    getStarted: string;
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
    emailUs: string;
    otherWays: string;
    phone: string;
    seePricing: string;
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
    company: "SoiZenFier Technologies Inc.",
    mail: {
      contact: compagnyEmail,
    },
    nav: {
      ourWork: "Our Work",
      services: "Services",
      hosting: "Hosting",
      contactUs: "Contact Us",
      privacy: "Privacy",
      terms: "Terms",
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
      company: "SoiZenFier Technologies Inc.",
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
    },
    pricingPage: {
      heading: "Website Packages & Monthly Plans",
      description:
        "Transparent starting ranges; contact us for a tailored quote.",
      packages: "Website Packages",
      plans: "Monthly Plans",
      requestQuote: "Request Quote",
      getStarted: "Get Started",
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
      formNote:
        "(Replace with a real form integration — currently links to email.)",
      emailUs: "Email us",
      otherWays: "Other ways to reach us",
      phone: compagnyPhone,
      seePricing: "See pricing packages",
    },
  },
  fr: {
    company: "SoiZenFier Technologies Inc.",
    mail: {
      contact: compagnyEmail,
    },
    nav: {
      ourWork: "Notre travail",
      services: "Services",
      hosting: "Hébergement",
      contactUs: "Contactez-nous",
      privacy: "Confidentialité",
      terms: "Conditions",
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
      seeWorkButton: "Voir nos réalisations",
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
      company: "SoiZenFier Technologies Inc.",
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
    },
    pricingPage: {
      heading: "Forfaits Web et plans mensuels",
      description:
        "Tarifs de base transparents ; contactez-nous pour un devis personnalisé.",
      packages: "Forfaits Web",
      plans: "Plans mensuels",
      requestQuote: "Demander un devis",
      getStarted: "Commencer",
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
        "Next.js, React, TypeScript, Tailwind CSS, CMS sans tête et intégrations serverless.",
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
        "(À remplacer par une vraie intégration de formulaire — actuellement lié au courrier électronique.)",
      emailUs: "Nous envoyer un email",
      otherWays: "Autres façons de nous contacter",
      phone: compagnyPhone,
      seePricing: "Voir les forfaits tarifaires",
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
