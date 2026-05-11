import React from "react";
import { getUserOrders } from "./model/get-user-orders";
import { Truck, Package } from "lucide-react";
import OrderItem from "./order-item";

const Orders = async () => {
  const orders = await getUserOrders();

  if (orders.length === 0) {
    return (
      <section className="min-h-screen bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-4">
              Заказов пока нет
            </h2>
            <p className="text-gray-400 max-w-md mx-auto">
              У вас еще нет созданных заказов. Оформите первый заказ на главной
              странице.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen">
      <div className="flex items-center gap-3 mb-8">
        <Truck className="w-8 h-8 text-primary" />
        <h1 className="text-3xl font-bold text-white uppercase">Мои заказы</h1>
        <span className="text-white px-3 py-1 rounded-full text-sm">
          {orders.length}
        </span>
      </div>

      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <OrderItem key={order.id} order={order} />
        ))}
      </div>

      <div className="mt-8 p-6 bg-foreground/50">
        <h3 className="text-lg font-semibold text-white mb-4">
          Статистика заказов
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div className="text-center">
            <p className="text-gray-400">Всего заказов</p>
            <p className="text-2xl font-bold text-white">{orders.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">На ожидании</p>
            <p className="text-2xl font-bold text-yellow-400">
              {orders.filter((o) => o.status === "Ожидание").length}
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Общая стоимость</p>
            <p className="text-2xl font-bold text-green-400">
              {new Intl.NumberFormat("ru-RU").format(
                orders.reduce((sum, order) => sum + order.totalPrice, 0)
              )}{" "}
              ₽
            </p>
          </div>
          <div className="text-center">
            <p className="text-gray-400">Средний чек</p>
            <p className="text-2xl font-bold text-blue-400">
              {new Intl.NumberFormat("ru-RU").format(
                orders.reduce((sum, order) => sum + order.totalPrice, 0) /
                  orders.length
              )}{" "}
              ₽
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Orders;
