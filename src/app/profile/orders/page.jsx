import Orders from "@/app/modules/orders/orders";
import OrdersBreadcrumbs from "@/app/modules/orders/orders-breadcrumbs";
import React from "react";

const page = () => {
  return (
    <main className="max-w-[1440px] w-full mx-auto p-5">
      <OrdersBreadcrumbs />
      <Orders />
    </main>
  );
};

export default page;
