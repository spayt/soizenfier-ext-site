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
    id: "business",
    title: "Business Website",
    priceRange: "$2,000 – $4,000 CAD",
    bullets: [
      "10–20 pages with flexible CMS",
      "Blog ready to publish on day one",
      "Advanced SEO setup from the start",
      "Scales as your business grows",
    ],
  },
  {
    id: "starter",
    title: "Starter Website",
    priceRange: "$250 – $2,000 CAD",
    bullets: [
      "Up to 5 pages, ready to launch fast",
      "Mobile-first responsive design",
      "Contact form with email delivery",
      "Basic SEO so Google can find you",
    ],
  },
  {
    id: "custom",
    title: "Custom Platform",
    priceRange: "$4,000 – $12,500+ CAD",
    bullets: [
      "Custom dashboard built to your workflow",
      "Stripe payments & subscriptions",
      "User accounts with role management",
      "Automation to save you hours weekly",
    ],
  },
];

export const monthlyPlans: MonthlyPlan[] = [
  // {
  //   id: "familly",
  //   title: "Familly Plan",
  //   price: "$22 CAD/month",
  //   amountCents: 2200,
  //   bullets: ["Hosting", "SSL", "Backups"],
  //   syncToStripe: false,
  // },
  {
    id: "essential",
    title: "Essential Care",
    price: "$49.50 CAD/month",
    amountCents: 4950,
    bullets: [
      "Your site stays online 24/7",
      "Secure browsing (the padlock icon)",
      "Daily backups — nothing ever lost",
      "We catch problems before your customers do",
    ],
  },
  {
    id: "growth",
    title: "Growth Plan",
    price: "$124.50 CAD/month",
    amountCents: 12450,
    bullets: [
      "Everything in Essential",
      "One hour of hands-on changes each month",
      "Monthly health report — know your site is solid",
    ],
  },
  {
    id: "premium",
    title: "Premium Plan",
    price: "$249.50 CAD/month",
    amountCents: 24950,
    bullets: [
      "Everything in Growth",
      "Up to 4 hours of updates per month",
      "SEO monitoring with monthly report",
      "Priority support — same business day",
    ],
  },
  {
    id: "managed-content",
    title: "Managed Content Plan",
    price: "From $399.50 CAD/month",
    amountCents: 39950,
    bullets: [
      "Unlimited content updates",
      "New landing pages on request",
      "Blog publishing & formatting",
      "SEO recommendations each month",
    ],
  },
];

export const pricingIntro = {
  startingFrom: {
    website: "$250",
    maintenance: "$49.50/month",
  },
};

export default { websitePackages, monthlyPlans, pricingIntro };
