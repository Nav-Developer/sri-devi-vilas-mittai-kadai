import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-orange-400 via-orange-500 to-[#5c0f14] px-6 py-20 text-center text-cream-200">
      <p className="text-xs font-bold uppercase tracking-[0.3em] text-yellow-200">
        Sri Devi Vilas Mittai Kadai · Since 1962
      </p>

      {/* 404 — the 0 is a Laddu */}
      <h1 className="mt-6 flex items-center text-[7rem] font-black leading-none md:text-[11rem]">
        4
        <span className="mx-2 flex h-24 w-24 animate-bounce items-center justify-center rounded-full bg-yellow-300 text-5xl shadow-[0_10px_0_#92400e] md:h-36 md:w-36 md:text-7xl">
          🍯
        </span>
        4
      </h1>

      <h2 className="mt-4 text-3xl font-black text-white md:text-5xl">
        Oops! This sweet is missing.
      </h2>
      <p className="mt-2 text-lg font-bold text-yellow-100">
        ஐயோ! இந்த இனிப்பு காணாமல் போய்விட்டது!
      </p>

      <p className="mt-4 max-w-md text-cream-200/80">
        The page you are looking for has been eaten, melted, or it never
        existed. But don&apos;t worry — the sweets are still here.
      </p>

      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Link
          href="/"
          className="rounded-full bg-yellow-300 px-8 py-3 text-sm font-black uppercase tracking-wider text-[#5c0f14] shadow-[4px_4px_0_#5c0f14] transition hover:-translate-y-1"
        >
          ← Back to Home
        </Link>
        <Link
          href="/menu"
          className="rounded-full border-2 border-cream-200 px-8 py-3 text-sm font-black uppercase tracking-wider text-cream-200 transition hover:bg-cream-200 hover:text-[#5c0f14]"
        >
          See Our Menu
        </Link>
      </div>

      <p className="mt-12 text-xs text-cream-200/60">
        Periyakulam · Open daily 5:30 AM – 10:30 PM · +91 63797 65853
      </p>
    </main>
  );
}
