"use server";

import { revalidatePath } from "next/cache";

export const addSubCategory = async (obj) => {
  const added = await fetch(`${process.env.BASE_URL}api/subcategories`, {
    method: "POST",
    body: JSON.stringify(obj),
  });
  if (added.ok) {
    console.log("Subcategories added successfully");
    revalidatePath("/admin/subcategories");
  }
};

export const getSubCategories = async (category) => {
  let url;
  if (category) {
    url = `${process.env.BASE_URL}api/subcategories?category=${category}`;
  } else {
    url = `${process.env.BASE_URL}api/subcategories`;
  }
  let subcategories = await fetch(url);
  subcategories = await subcategories.json();
  console.log("Subcategories Fetched successfully");
  return subcategories;
};