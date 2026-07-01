import fs from "fs";
import path from "path";
import Link from "next/link";

export const metadata = {
  title: "Kimuntu — App Gallery",
  description:
    "A visual journey through the Ntu mobile experience — explore the screens, interfaces, and moments that bring the app to life.",
};

export default function KimuntuPage() {
  const imagesDirectory = path.join(process.cwd(), "public", "NtuAppImages");
  const imageFiles = fs.existsSync(imagesDirectory)
    ? fs
        .readdirSync(imagesDirectory)
        .filter((file) => /\.(jpe?g|png|webp|gif|svg|avif)$/i.test(file))
        .sort()
    : [];

  return (
    <div className="min-h-screen bg-[#06060a] text-white">

      {/* ── HERO ── */}
      <section className="relative overflow-hidden px-6 pt-20 pb-16 border-b border-white/5">
        <div className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-violet-600/12 blur-3xl" />
        <div className="pointer-events-none absolute top-0 right-0 w-80 h-80 rounded-full bg-indigo-500/8 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 w-64 h-64 rounded-full bg-violet-800/10 blur-3xl" />

        <div className="relative max-w-5xl mx-auto">
          <span className="w-8 h-0.5 rounded-full bg-violet-400 block mb-8" />

          <h1 className="text-[clamp(3.5rem,10vw,6rem)] font-black tracking-[-0.04em] text-white leading-none select-none">
            KIMUNTU
          </h1>

          <p className="mt-6 text-base md:text-lg text-slate-400 max-w-2xl leading-relaxed">
            A visual journey through the Ntu mobile experience — explore the
            screens, interfaces, and moments that bring the app to life.
          </p>

          <div className="mt-10 flex flex-wrap gap-3">
            <Link
              href="/kimuntu/privacyen"
              className="inline-flex items-center gap-2 rounded-full bg-violet-500 px-6 py-2.5 text-sm font-bold text-white hover:bg-violet-400 transition-all duration-200 hover:scale-[1.03] shadow-lg shadow-violet-500/25"
            >
              Privacy Policy
              <span className="text-[10px] font-semibold bg-white/20 rounded-full px-1.5 py-0.5 leading-none">EN</span>
            </Link>
            <Link
              href="/kimuntu/privacyfr"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-6 py-2.5 text-sm font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition-all duration-200"
            >
              Politique de confidentialité
              <span className="text-[10px] font-semibold bg-white/20 rounded-full px-1.5 py-0.5 leading-none">FR</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── GALLERY ── */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        {imageFiles.length > 0 ? (
          <>
            <div className="flex items-center gap-4 mb-10">
              <span className="w-8 h-0.5 rounded-full bg-violet-400 shrink-0" />
              <span className="text-sm font-medium text-slate-500">
                {imageFiles.length} screens
              </span>
              <span className="flex-1 h-px bg-white/5" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5 md:gap-7">
              {imageFiles.map((filename, i) => {
                const index = String(i + 1).padStart(2, "0");
                return (
                  <div key={filename} className="group flex flex-col items-center">
                    {/* Phone frame */}
                    <div className="relative w-full rounded-[2.2rem] bg-slate-900 ring-[5px] ring-slate-800 shadow-2xl shadow-black/60 overflow-hidden transition-all duration-500 group-hover:ring-violet-500/40 group-hover:shadow-violet-500/15 group-hover:-translate-y-2">
                      {/* Camera notch */}
                      <div className="absolute top-0 inset-x-0 z-10 h-7 bg-slate-900 flex items-center justify-center">
                        <div className="w-14 h-1.5 rounded-full bg-slate-700/80" />
                      </div>
                      {/* Screen */}
                      <div className="pt-7">
                        <img
                          src={`/NtuAppImages/${encodeURIComponent(filename)}`}
                          alt={`Ntu app screen ${index}`}
                          className="w-full block"
                        />
                      </div>
                      {/* Home bar */}
                      <div className="h-6 bg-slate-900 flex items-center justify-center">
                        <div className="w-24 h-1 rounded-full bg-slate-700/60" />
                      </div>
                      {/* Hover overlay */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.08)_0%,transparent_70%)]" />
                    </div>

                    {/* Caption */}
                    <p className="mt-3.5 text-xs font-medium text-slate-600 group-hover:text-violet-400 transition-colors duration-300">
                      Screen {index}
                    </p>
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div className="rounded-3xl border border-white/8 bg-white/3 p-16 text-center">
            <p className="text-white font-semibold text-lg">No screens yet</p>
            <p className="mt-2 text-sm text-slate-500">
              Add images to <code className="text-slate-400">public/NtuAppImages</code> and refresh.
            </p>
          </div>
        )}
      </section>

      {/* ── FOOTER STRIP ── */}
      <footer className="border-t border-white/5 mt-4 px-6 py-8">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Kimuntu · Ntu Mobile App
          </p>
          <div className="flex gap-5 text-xs text-slate-600">
            <Link href="/kimuntu/privacyen" className="hover:text-slate-400 transition-colors">Privacy (EN)</Link>
            <Link href="/kimuntu/privacyfr" className="hover:text-slate-400 transition-colors">Privacy (FR)</Link>
          </div>
        </div>
      </footer>

    </div>
  );
}
