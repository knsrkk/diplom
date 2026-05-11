import React from "react";
import AutoparkBreadcrumbs from "../modules/autopark/autopark-breadcrumbs";
import Autopark from "../modules/autopark/autopark";

const page = ({ searchParams }) => {
  return (
    <main className="max-w-[1440px] w-full mx-auto p-5 space-y-3">
      <AutoparkBreadcrumbs />
      <Autopark searchParams={searchParams} />
    </main>
  );
};

export default page;
