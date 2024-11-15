"use server";

import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  let users = await fetch(`${process.env.BASE_URL}api/users`);
  users = await users.json();
  console.log("Users Fetched successfully");
  return users;
  revalidatePath("/admin/categories");
};