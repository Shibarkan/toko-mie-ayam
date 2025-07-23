import ProductCard from "./ProductCard";
import { useRef, useEffect, useState } from "react";
import { FaUtensils } from "react-icons/fa";

const Menus = ({ filtered }) => {
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [offset, setOffset] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = kiri, -1 = kanan
  const touchStartX = useRef(null);
  const speed = 0.5; // px per frame

  useEffect(() => {
    let rafId;

    const animate = () => {
      if (!isPaused && containerRef.current) {
        setOffset((prev) => {
          const totalScroll = containerRef.current.scrollWidth / 2;
          let next = prev + direction * speed;
          if (next >= totalScroll) next = 0;
          if (next <= 0) next = totalScroll;
          return next;
        });
      }
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [isPaused, direction]);

  const handleMouseEnter = () => setIsPaused(true);
  const handleMouseLeave = () => setIsPaused(false);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    setIsPaused(true);
  };

  const handleTouchEnd = (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      setDirection(delta > 0 ? -1 : 1);
    }
    setIsPaused(false);
  };

  const handleMouseDown = (e) => {
    touchStartX.current = e.clientX;
    setIsPaused(true);
  };

  const handleMouseUp = (e) => {
    const delta = e.clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      setDirection(delta > 0 ? -1 : 1);
    }
    setIsPaused(false);
  };

  return (
    <section className="px-4 py-24 overflow-hidden relative">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center bg-gradient-to-r from-red-500 to-yellow-400 text-transparent bg-clip-text drop-shadow-lg mb-16">
        Daftar Menu Kami
      </h2>

      {filtered.length > 0 ? (
        <div
          className="relative w-full overflow-hidden"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
        >
          <div
            ref={containerRef}
            className="flex gap-6 w-max"
            style={{
              transform: `translateX(-${offset}px)`,
              transition: "transform 0s linear",
            }}
          >
            {[...filtered, ...filtered].map((item, index) => (
              <div
                key={`${item.id}-${index}`}
                className="min-w-[240px] max-w-[240px] flex-shrink-0"
              >
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-24">
          <FaUtensils className="text-[180px] mb-8 text-[#FB4141]" />
          <p className="text-3xl font-semibold text-gray-600">
            Menu tidak ditemukan. Coba cari yang lain ya~
          </p>
        </div>
      )}
    </section>
  );
};

export default Menus;
