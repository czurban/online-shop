import { useEffect, useRef, useState } from "react";
import { BANNERS, promotions } from "../arrays";
import { ProductShowcase } from "../components/product";
import { Promotion } from "../components/promotions";
import type { Product } from "../types";

export function HomePage({
  recommendedlist,
  loading,
  error,
  onAddToCart,
}: {
  recommendedlist: Product[];
  loading: boolean;
  error: string | null;
  onAddToCart: (p: Product) => void;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [currentPosition, setCurrentPosition] = useState(0);
  const promoContainerRef = useRef<HTMLDivElement>(null);

  const maxScroll = Math.max(promotions.length * 147 - 1100, 0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === BANNERS.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? BANNERS.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPaused]);

  const moveRight = () => {
    const step = promoContainerRef.current?.clientWidth ?? 1240;
    setCurrentPosition((prev) => Math.min(prev + step, maxScroll));
  };

  const moveLeft = () => {
    const step = promoContainerRef.current?.clientWidth ?? 1240;
    setCurrentPosition((prev) => Math.max(prev - step, 0));
  };

  return (
    <div className="space-y-10">
      <div
        className="relative w-full h-75 md:h-100 bg-slate-200 rounded-2xl overflow-hidden shadow-md group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {BANNERS.map((banner) => (
            <div key={banner.id} className="w-full h-full shrink-0 relative">
              <img
                src={banner.image}
                alt={banner.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent flex items-end p-6 md:p-12">
                <h2 className="text-white text-xl md:text-3xl font-bold max-w-xl">
                  {banner.title}
                </h2>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-md transition opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:block z-10"
        >
          ❮
        </button>

        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-slate-800 p-3 rounded-full shadow-md transition opacity-0 group-hover:opacity-100 cursor-pointer hidden sm:block z-10"
        >
          ❯
        </button>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {BANNERS.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`cursor-pointer w-3 h-3 rounded-full transition-all ${
                currentSlide === index ? "bg-white w-6" : "bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-slate-800">Promotions!</h2>
          <button className="text-blue-800 hover:text-blue-950 text-sm font-semibold transition cursor-pointer">
            See all ❯
          </button>
        </div>

        <div
          ref={promoContainerRef}
          className="w-full overflow-hidden rounded-2xl bg-white p-6 shadow-sm border border-slate-200 relative group"
        >
          <div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentPosition}px)` }}
          >
            {promotions.map((promotion) => (
              <Promotion
                key={promotion.id}
                title={promotion.title}
                image={promotion.image}
              />
            ))}
          </div>

          {currentPosition > 0 && (
            <button
              onClick={moveLeft}
              className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 w-11 h-11 rounded-full shadow-md border border-slate-200 flex items-center justify-center hover:scale-105 transition cursor-pointer z-10"
            >
              ❮
            </button>
          )}

          {currentPosition < maxScroll && (
            <button
              onClick={moveRight}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-slate-800 w-11 h-11 rounded-full shadow-md border border-slate-200 flex items-center justify-center hover:scale-105 transition cursor-pointer z-10"
            >
              ❯
            </button>
          )}
        </div>
      </div>

      <div className="w-full space-y-6">
        <h1 className="text-2xl font-bold text-slate-800">
          Recommended by customers
        </h1>

        {loading && <p className="text-slate-500">Loading</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedlist.map((item) => (
              <ProductShowcase
                key={item.id}
                {...item}
                onAddToCart={() => onAddToCart(item)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
