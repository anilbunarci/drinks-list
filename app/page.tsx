import React from "react";
import clsx from "clsx";
import data from "../data/drinks.json";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "700"],
});

export default function Home() {
  const { drinks } = data;

  const drinksWithDiscountRates = drinks.map((drink) => {
    return {
      ...drink,
      discountRate: (
        ((Number(drink.price) - Number(drink.discountPrice)) /
          Number(drink.price)) *
        100
      ).toFixed(1),
    };
  });

  const drinksSorted = drinksWithDiscountRates
    .filter((drink) => drink.category !== "ŞARAP")
    .sort((a, b) => parseInt(b.discountRate) - parseInt(a.discountRate));

  return (
    <main
      className={clsx(
        poppins.className,
        "flex items-center justify-center h-screen p-3 md:p-16"
      )}
    >
      <div className="w-full max-h-full px-3 py-2 overflow-y-auto text-sm divide-y divide-gray-400 lg:max-w-3xl glassified md:p-8 md:text-base">
        <div className="grid w-full grid-cols-9 mb-2 font-bold gap-x-3 md:gap-x-4">
          <span className="col-span-5 md:col-span-4">İÇKİ ADI</span>
          <span className="hidden md:block md:col-span-2">TÜR</span>
          <span className="col-span-2 md:col-span-1">&#129031; FİYAT</span>
          <span className="hidden md:block md:col-span-1">&#129029; FİYAT</span>
          <span className="col-span-2 md:col-span-1">ORAN</span>
        </div>
        {drinksSorted.map((drink) => (
          <div
            key={drink.name}
            className="grid items-baseline w-full grid-cols-9 py-3 gap-x-3 md:gap-x-4 gap-y-0"
          >
            <span
              title={drink.name}
              className="col-span-5 truncate md:col-span-4"
            >
              {drink.name}
            </span>
            <span className="hidden col-span-2 md:block">{drink.category}</span>
            <span className="col-span-2 md:col-span-1">
              {drink.discountPrice}₺
            </span>
            <span className="hidden col-span-1 md:block">{drink.price}₺</span>
            <span className="col-span-2 md:col-span-1">
              %{drink.discountRate}
            </span>
          </div>
        ))}
      </div>
    </main>
  );
}
