"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import OrderItemAdmin from "./order-item-admin";
import { updateOrderStatus } from "./model/order-actions";

const OrderList = ({ orders }) => {
  const [updatingId, setUpdatingId] = useState(null);
  const router = useRouter();

  const handleStatusChange = async (orderId, newStatus) => {
    setUpdatingId(orderId);
    try {
      await updateOrderStatus(orderId, newStatus);
      router.refresh();
    } catch (error) {
      console.error("Error updating order status:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between px-2 pb-2 border-b border-white/10">
        <h2 className="text-xl font-semibold">Список заказов</h2>
        <span className="text-sm text-white/55">
          Всего: {orders.length} заказов
        </span>
      </div>

      <div className="space-y-4">
        {orders.map((order) => (
          <OrderItemAdmin
            key={order.id}
            order={order}
            onStatusChange={(newStatus) =>
              handleStatusChange(order.id, newStatus)
            }
            isUpdating={updatingId === order.id}
          />
        ))}
      </div>

      {orders.length === 0 && (
        <div className="text-center py-12 border border-dashed border-white/15 rounded-2xl bg-white/3">
          <p className="text-white/55 text-lg">Заказов пока нет</p>
        </div>
      )}
    </div>
  );
};

export default OrderList;
