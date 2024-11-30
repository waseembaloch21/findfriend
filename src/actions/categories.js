"use server";

import { revalidatePath } from "next/cache";

const BASE_URL = process.env.BASE_URL || "http://localhost:3000/";

export const addCategory = async (obj) => {
  try {
    const response = await fetch(`${BASE_URL}api/categories`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });

    if (!response.ok) {
      console.error("Failed to add category:", await response.text());
      return;
    }

    console.log("Category added successfully");
    revalidatePath("/admin/categories");
  } catch (error) {
    console.error("Error adding category:", error.message);
  }
};

export const getCategories = async () => {
  try {
    const categoriesRes = await fetch(`${BASE_URL}api/categories`);
    if (!categoriesRes.ok) {
      console.error("Failed to fetch categories");
      return [];
    }

    const categories = await categoriesRes.json();
    console.log("Categories fetched successfully");
    return categories;
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return [];
  }
};
