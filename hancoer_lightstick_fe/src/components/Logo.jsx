export default function Logo({ size = 'md' }) {
    const sizes = {
      sm: { box: 'w-10 h-10', text: 'text-2xl' },
      md: { box: 'w-14 h-14', text: 'text-3xl' },
      lg: { box: 'w-20 h-20', text: 'text-5xl' },
    };
  
    return (
      <div className="flex items-center gap-3">
        {/* Box Logo */}
        <div
          className={`${sizes[size].box} relative bg-gradient-to-br from-emerald-300 via-emerald-400 to-teal-400 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-400/50 rotate-6 hover:rotate-0 transition-transform duration-300`}
        >
          {/* Huruf H pakai SVG (anti-font-error) */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-2/3 h-2/3 drop-shadow"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M5 4v16M19 4v16M5 12h14"
              stroke="white"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
  
          {/* Dekor bulat */}
          <span className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-300 rounded-full animate-pulse"></span>
          <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-pink-300 rounded-full"></span>
        </div>
  
        {/* Teks Nama */}
        <div className="leading-none">
          <span className={`${sizes[size].text} font-black text-emerald-900 tracking-tighter`}>
            Hancoer<span className="text-emerald-500">.</span>
          </span>
          <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
            Lightstick
          </p>
        </div>
      </div>
    );
  }