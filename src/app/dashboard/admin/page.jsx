import Admin from "@/app/modules/admin/admin";
import AdminBreadcrumbs from "@/app/modules/admin/admin-breadcrumbs";
export const dynamic = "force-dynamic";
const page = () => {
  return (
    <main className="max-w-[1440px] w-full mx-auto p-5 space-y-3">
      <AdminBreadcrumbs />
      <Admin />
    </main>
  );
};

export default page;
