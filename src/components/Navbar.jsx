function Logo() {
  return (
    <span className="flex items-center gap-2 select-none" aria-label="DolarActual">
      <span className="font-extrabold text-xl leading-none tracking-tight text-[#00e676]">
        &lt;$&gt;
      </span>
      <span className="font-extrabold text-xl leading-none tracking-tight">
        <span className="text-white">Dolar</span>
        <span className="text-[#00e676]"> Actual</span>
      </span>
    </span>
  );
}

const Navbar = () => (
  <nav
    className="sticky top-0 z-40 border-b border-white/10"
    style={{ background: 'rgba(1, 112, 134, 0.45)', backdropFilter: 'blur(14px)' }}
  >
    <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
      <a href="/" className="flex items-center">
        <Logo />
      </a>
      <p className="text-xs text-white/30 hidden sm:block tracking-wide">
        Actualización cada 5 min
      </p>
    </div>
  </nav>
);

export default Navbar;
