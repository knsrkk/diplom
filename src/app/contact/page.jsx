import React from "react";
import ContactsBreadcrumbs from "../modules/contacts/contacts-breadcrumbs";
import Contacts from "../modules/contacts/contacts";

const page = () => {
  return (
    <main className="max-w-[1440px] w-full mx-auto p-5">
      <ContactsBreadcrumbs />
      <Contacts />
    </main>
  );
};

export default page;
