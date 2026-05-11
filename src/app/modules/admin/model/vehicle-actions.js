"use server";

import { revalidatePath } from "next/cache";

export const getAllVehicles = async () => {
  try {
    const response = await fetch(`https://cargo-transportation-two.vercel.app/api/admin/vehicles`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching vehicles:", error);
    throw new Error("Failed to fetch vehicles");
  }
};

export const createVehicle = async (formData) => {
  try {
    const response = await fetch(`https://cargo-transportation-two.vercel.app/api/admin/vehicles`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    revalidatePath("/dashboard/admin");
    return result;
  } catch (error) {
    console.error("Error creating vehicle:", error);
    throw new Error("Failed to create vehicle");
  }
};

export const updateVehicle = async (formData) => {
  try {
    const response = await fetch(`https://cargo-transportation-two.vercel.app/api/admin/vehicles`, {
      method: "PUT",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    revalidatePath("/dashboard/admin");
    return result;
  } catch (error) {
    console.error("Error updating vehicle:", error);
    throw new Error("Failed to update vehicle");
  }
};

export const deleteVehicle = async (id) => {
  try {
    const response = await fetch(`https://cargo-transportation-two.vercel.app/api/admin/vehicles?id=${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    revalidatePath("/dashboard/admin");
    return result;
  } catch (error) {
    console.error("Error deleting vehicle:", error);
    throw new Error("Failed to delete vehicle");
  }
};
