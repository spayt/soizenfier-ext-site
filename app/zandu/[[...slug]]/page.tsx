"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";

export default function DeepLinkPage() {
  const params = useParams();
  const slug = params?.slug;

  useEffect(() => {
    if (!slug) return;

    const path = Array.isArray(slug) ? slug.join("/") : slug;
    const search = window.location.search;

    // Deep link vers l'application mobile
    const appUrl = `zandu://${path}${search}`;

    // Fallback si l'application n'est pas installée
    const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);
    const isAndroid = /Android/i.test(navigator.userAgent);

    let hasFocus = true;

    const handleBlur = () => {
      hasFocus = false;
    };

    window.addEventListener("blur", handleBlur);

    window.location.href = appUrl;

    const timeout = setTimeout(() => {
      if (!hasFocus) return;

      if (isIOS) {
        // window.location.href = "https://apps.apple.com/app/YOUR_APP_ID";
      } else if (isAndroid) {
        window.location.href =
          "https://play.google.com/store/apps/details?id=com.soizenfier.zandu";
      }
    }, 2000);

    return () => {
      clearTimeout(timeout);
      window.removeEventListener("blur", handleBlur);
    };
  }, [slug]);

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "sans-serif",
        textAlign: "center",
        padding: "20px",
      }}
    >
      <div>
        <h1>Opening Zandu...</h1>
        <p>
          If the application does not open automatically, you will be redirected
          to the download page.
        </p>
      </div>
    </main>
  );
}
