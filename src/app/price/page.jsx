import React from "react";
import PriceBreadcrumbs from "../modules/price/price-breadcrumbs";
import Price from "../modules/price/price";

const page = ({ searchParams }) => {
  return (
    <main className="max-w-[1440px] w-full mx-auto p-5 space-y-3">
      <PriceBreadcrumbs />
      <Price searchParams={searchParams} />
    </main>
  );
};

export default page;
