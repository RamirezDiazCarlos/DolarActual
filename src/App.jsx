import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import Conversor from "./components/Conversor";
import Navbar from "./components/Navbar";
import ListaDolares from "./components/ListaDolares";
import useDolares from "./hooks/useDolares";
import Footer from './components/Footer';

const Inflacion = lazy(() => import("./components/Inflacion"));

function LazyOnVisible({ children, fallback, minHeight = 200 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: visible ? undefined : minHeight }}>
      {visible ? children : fallback}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl border border-white/10 p-6 animate-pulse bg-white/5 h-full">
      <div className="h-2.5 w-20 rounded-full bg-white/10 mb-4" />
      <div className="h-8 w-28 rounded-lg bg-white/10 mb-2" />
      <div className="h-7 w-24 rounded-lg bg-white/10 mb-5" />
      <div className="h-2 w-32 rounded-full bg-white/10" />
    </div>
  );
}

function LoadingState() {
  return (
    <div className="min-h-[100dvh]">
      <div className="h-16 bg-white/5 border-b border-white/10" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <div className="h-2.5 w-24 rounded-full bg-white/10 animate-pulse mb-3" />
        <div className="h-8 w-48 rounded-lg bg-white/10 animate-pulse mb-8" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="md:col-span-2"><SkeletonCard /></div>
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <SkeletonCard />
          <div className="md:col-span-2"><SkeletonCard /></div>
          <SkeletonCard />
        </div>
      </div>
    </div>
  );
}

function ErrorState({ message }) {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto mb-5">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="text-red-400">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
            <line x1="12" y1="9" x2="12" y2="13" />
            <line x1="12" y1="17" x2="12.01" y2="17" />
          </svg>
        </div>
        <h2 className="text-xl font-semibold text-white mb-2 tracking-tight">Sin conexión</h2>
        <p className="text-white/40 text-sm mb-5">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-5 py-2.5 text-sm font-medium rounded-xl bg-[#2ac19d]/10 border border-[#2ac19d]/25 text-[#2ac19d] hover:bg-[#2ac19d]/20 transition-colors"
        >
          Reintentar
        </button>
      </div>
    </div>
  );
}

function App() {
  const { dolares, error } = useDolares();

  if (error) return <ErrorState message={error} />;
  if (!dolares.length) return <LoadingState />;

  return (
    <div>
      <Navbar />
      <Conversor dolares={dolares} />
      <ListaDolares dolares={dolares} />
      <LazyOnVisible minHeight={500}>
        <Suspense fallback={
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="h-2.5 w-24 rounded-full bg-white/10 animate-pulse mb-3" />
            <div className="h-8 w-36 rounded-lg bg-white/10 animate-pulse mb-6" />
            <div className="h-72 rounded-2xl bg-white/5 border border-white/10 animate-pulse" />
          </div>
        }>
          <Inflacion />
        </Suspense>
      </LazyOnVisible>
      <Footer />
    </div>
  );
}

export default App;
