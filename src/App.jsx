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

function App() {

  const { dolares, error } = useDolares();

  if (error) return <p>Error: {error}</p>
  if (!dolares.length) return <p>Cargando datos...</p>;

  return (
    <div className="justify-content-center gradient-bg">
      <Navbar />
      <Conversor dolares={dolares} />
      <ListaDolares dolares={dolares} />
      <LazyOnVisible minHeight={500}>
        <Suspense fallback={<div className="text-center py-4">Cargando inflación...</div>}>
          <Inflacion />
        </Suspense>
      </LazyOnVisible>
      <Footer />
    </div>
  )
}

export default App
