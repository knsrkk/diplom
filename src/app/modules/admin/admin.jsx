import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/app/shared/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/app/shared/ui/card";
import VehicleList from "./vehicle-list";
import UpdateForm from "./update-form";
import CreateForm from "./create-form";
import DeleteForm from "./delete-form";
import OrderList from "./order-list";
import { getAllOrders } from "./model/order-actions";
import { getAllVehicles } from "./model/vehicle-actions";

const Admin = async () => {
  const [orders, vehicles] = await Promise.all([
    getAllOrders(),
    getAllVehicles(),
  ]);

  return (
    <section className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-8 backdrop-blur-sm">
      <h1 className="text-3xl md:text-5xl lg:text-6xl font-black mb-4 uppercase text-white tracking-wide">
        Админ панель
      </h1>
      <p className="text-white/70 mb-8 max-w-2xl">
        Управление транспортом и заказами в едином интерфейсе.
      </p>
      <Card className="w-full bg-white/6 border border-white/10 text-white shadow-xl">
        <CardHeader>
          <CardTitle className="text-lg md:text-2xl font-bold">
            Выберите пункт
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs
            defaultValue="list"
            className="flex gap-6 lg:flex-row justify-between"
          >
            <TabsList className="flex flex-col h-auto max-h-59 bg-[#1f252c] border border-white/10 rounded-2xl p-2 max-w-64 w-full space-y-2">
              <TabsTrigger
                value="list"
                className="w-full justify-start py-3 px-4 cursor-pointer mb-0 text-white! rounded-xl data-[state=active]:bg-[#D9A41A] data-[state=active]:text-[#111315]! data-[state=active]:shadow-sm"
              >
                Список транспорта
              </TabsTrigger>
              <TabsTrigger
                value="create"
                className="w-full justify-start py-3 px-4 cursor-pointer mb-0 text-white! rounded-xl data-[state=active]:bg-[#D9A41A] data-[state=active]:text-[#111315]! data-[state=active]:shadow-sm"
              >
                Создать транспорт
              </TabsTrigger>
              <TabsTrigger
                value="update"
                className="w-full justify-start py-3 px-4 cursor-pointer mb-0 text-white! rounded-xl data-[state=active]:bg-[#D9A41A] data-[state=active]:text-[#111315]! data-[state=active]:shadow-sm"
              >
                Обновить транспорт
              </TabsTrigger>
              <TabsTrigger
                value="delete"
                className="w-full justify-start py-3 px-4 cursor-pointer mb-0 text-white! rounded-xl data-[state=active]:bg-[#D9A41A] data-[state=active]:text-[#111315]! data-[state=active]:shadow-sm"
              >
                Удалить транспорт
              </TabsTrigger>
              <TabsTrigger
                value="order"
                className="w-full justify-start py-3 px-4 cursor-pointer mb-0 text-white! rounded-xl data-[state=active]:bg-[#D9A41A] data-[state=active]:text-[#111315]! data-[state=active]:shadow-sm"
              >
                Просмотр заказов
              </TabsTrigger>
            </TabsList>

            <div className="w-full">
              <TabsContent value="list" className="mt-0">
                <VehicleList vehicles={vehicles} />
              </TabsContent>

              <TabsContent value="create" className="mt-0">
                <CreateForm />
              </TabsContent>

              <TabsContent value="update" className="mt-0">
                <UpdateForm vehicles={vehicles} />
              </TabsContent>

              <TabsContent value="delete" className="mt-0">
                <DeleteForm vehicles={vehicles} />
              </TabsContent>

              <TabsContent value="order" className="mt-0">
                <OrderList orders={orders} />
              </TabsContent>
            </div>
          </Tabs>
        </CardContent>
      </Card>
    </section>
  );
};

export default Admin;
