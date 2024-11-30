"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000/";

export const addCategory = async (obj) => {
  try {
    const response = await fetch(`${BASE_URL}api/categories`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      console.error("Failed to add category:", await response.text());
      throw new Error("Failed to add category");
    }

    console.log("Category added successfully");
    revalidatePath("/admin/categories");
  } catch (error) {
    console.error("Error in addCategory:", error.message);
  }
};

export const getCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}api/categories`);
    if (!response.ok) {
      console.error("Failed to fetch categories:", await response.text());
      throw new Error("Failed to fetch categories");
    }

    const categories = await response.json();
    console.log("Categories fetched successfully");
    return categories;
  } catch (error) {
    console.error("Error in getCategories:", error.message);
    return [];
  }
};
