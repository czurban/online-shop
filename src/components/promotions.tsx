import type { Promotions } from "../types";

export const Promotion = ({ title, image }: Promotions) => {
  return (
    <div className="flex flex-shrink-0 flex-col items-center text-center w-[130px] group/card cursor-pointer">
      <div className="w-[120px] h-[120px] rounded-full overflow-hidden border border-slate-100 bg-slate-50 shadow-inner transition-transform duration-300 group-hover/card:scale-105">
        <img src={image} alt={title} className="w-full h-full object-cover" />
      </div>
      <p className="text-xs font-medium text-slate-700 mt-3 line-clamp-2 max-w-[120px] group-hover/card:text-blue-800 transition-colors">
        {title}
      </p>
    </div>
  );
};
