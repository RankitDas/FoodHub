import Image from 'next/image';
import { FOODS } from '@/constants/foods';

interface ParallaxFoodRibbonProps {
  ids: string[];
  className?: string;
  itemClassName?: string;
  imageClassName?: string;
  reverse?: boolean;
}

export const ParallaxFoodRibbon = ({
  ids,
  className = '',
  itemClassName = '',
  imageClassName = '',
  reverse = false,
}: ParallaxFoodRibbonProps) => {
  const foods = ids
    .map((id) => FOODS.find((food) => food.id === id))
    .filter((food): food is (typeof FOODS)[number] => Boolean(food));

  if (foods.length === 0) return null;

  const ribbonFoods = reverse ? [...foods].reverse() : foods;
  const repeatedFoods = [...ribbonFoods, ...ribbonFoods];

  return (
    <div className={`parallax-fade-mask flex w-max items-center gap-4 ${className}`} aria-hidden="true">
      {repeatedFoods.map((food, index) => (
        <div
          key={`${food.id}-${index}`}
          className={`relative shrink-0 overflow-hidden border border-white/45 bg-white/45 shadow-2xl backdrop-blur-md dark:border-white/10 dark:bg-gray-950/35 ${itemClassName}`}
        >
          <Image
            src={food.image}
            alt=""
            fill
            sizes="160px"
            className={`object-cover ${imageClassName}`}
          />
        </div>
      ))}
    </div>
  );
};
