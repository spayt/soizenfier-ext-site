export type WebsitePackage = {
  id: string;
  title: string;
  priceRange: string;
  bullets: string[];
};

export type MonthlyPlan = {
  id: string;
  title: string;
  price: string;
  amountCents: number;
  bullets: string[];
  syncToStripe?: boolean;
};

export const websitePackages: WebsitePackage[] = [
  {
    id: "starter",
    title: "Starter Website",
    priceRange: "$500 – $4,000 CAD",
    bullets: [
      "Up to 5 pages",
      "Responsive design",
      "Contact form",
      "Basic SEO",
    ],
  },
  {
    id: "business",
    title: "Business Website",
    priceRange: "$4,000 – $8,000 CAD",
    bullets: ["10–20 pages", "CMS", "Blog", "Advanced SEO setup"],
  },
  {
    id: "custom",
    title: "Custom Platform",
    priceRange: "$8,000 – $25,000+ CAD",
    bullets: [
      "Custom dashboard",
      "Stripe integration",
      "User accounts",
      "Automation",
    ],
  },
];

export const monthlyPlans: MonthlyPlan[] = [
  // {
  //   id: "familly",
  //   title: "Familly Plan",
  //   price: "$20 CAD/month",
  //   amountCents: 2000,
  //   bullets: ["Hosting", "SSL", "Backups"],
  //   syncToStripe: false,
  // },
  {
    id: "essential",
    title: "Essential Care",
    price: "$99 CAD/month",
    amountCents: 9900,
    bullets: ["Hosting", "SSL", "Backups", "Monitoring"],
  },
  {
    id: "growth",
    title: "Growth Plan",
    price: "$249 CAD/month",
    amountCents: 24900,
    bullets: [
      "Everything in Essential",
      "1 hour updates/month",
      "Monthly maintenance",
    ],
  },
  {
    id: "premium",
    title: "Premium Plan",
    price: "$499 CAD/month",
    amountCents: 49900,
    bullets: [
      "Everything in Growth",
      "Up to 4 hours updates/month",
      "SEO monitoring",
      "Priority support",
    ],
  },
  {
    id: "managed-content",
    title: "Managed Content Plan",
    price: "$799–$1,500 CAD/month",
    amountCents: 79900,
    bullets: [
      "Content updates",
      "Landing pages",
      "Blog publishing",
      "SEO recommendations",
    ],
  },
];

export const pricingIntro = {
  startingFrom: {
    website: "$500",
    maintenance: "$99/month",
  },
};

export default { websitePackages, monthlyPlans, pricingIntro };
