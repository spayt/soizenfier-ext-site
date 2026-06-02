import Link from "next/link";
import {
  locales,
  localePath,
  type Locale,
  type TranslationDictionary,
} from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  currentPath: string;
  dictionary: TranslationDictionary;
};

export default function LanguageSwitcher({
  currentLocale,
  currentPath,
  dictionary,
}: LanguageSwitcherProps) {
  return (
    <div className="inline-flex items-center rounded-full border border-slate-200 bg-white/90 px-3 py-2 text-sm text-slate-700 shadow-sm">
      {locales.map((locale) => {
        const label = dictionary.language[locale];
        const isActive = locale === currentLocale;

        return (
          <Link
            key={locale}
            href={localePath(locale, currentPath)}
            className={`rounded-full px-3 py-1 transition hover:bg-slate-100 ${
              isActive
                ? "bg-slate-100 font-semibold text-slate-900"
                : "text-slate-600"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
