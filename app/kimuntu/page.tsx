import fs from "fs";
import path from "path";
import Link from "next/link";

const imagesDirectory = path.join(process.cwd(), "public", "NtuAppImages");
const imageFiles = fs.existsSync(imagesDirectory)
  ? fs
      .readdirSync(imagesDirectory)
      .filter((file) => /\.(jpe?g|png|webp|gif|svg|avif)$/i.test(file))
  : [];

export const metadata = {
  title: "Kimuntu Gallery",
  description: "Gallery of Ntu app images and a link to the privacy policy.",
};

export default function KimuntuPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-4 py-10 text-slate-900">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-4xl font-semibold">Kimuntu Gallery</h1>
          <p className="mt-3 text-lg leading-8 text-slate-600">
            Discover the app visuals from the Ntu mobile application. These
            images are served from the <code>public/NtuAppImages</code> folder.
          </p>
          <p className="mt-4 text-base text-slate-700">
            View the mobile app privacy policy here:
          </p>
          <div className="mt-4 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/kimuntu/privacyen"
              className="inline-flex rounded-full bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Privacy Policy (EN)
            </Link>
            <Link
              href="/kimuntu/privacyfr"
              className="inline-flex rounded-full border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
            >
              Politique de confidentialité (FR)
            </Link>
          </div>
        </div>

        {imageFiles.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {imageFiles.map((filename) => (
              <div
                key={filename}
                className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
              >
                <img
                  src={`/NtuAppImages/${encodeURIComponent(filename)}`}
                  alt={filename}
                  className="h-72 w-full object-cover"
                />
                <div className="p-4">
                  <p className="text-sm font-medium text-slate-900">
                    {filename}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-3xl border border-slate-200 bg-white p-10 text-center text-slate-600 shadow-sm">
            <p className="text-lg font-medium">
              No images found in public/NtuAppImages.
            </p>
            <p className="mt-2 text-sm">
              Add images to that folder and refresh the page.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
