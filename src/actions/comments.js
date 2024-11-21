"use server";

import { revalidatePath } from "next/cache";

export const addComment = async (obj) => {
  const added = await fetch(`${process.env.BASE_URL}api/comments`, {
    method: "POST",
    body: JSON.stringify(obj),
  })
  if (added.ok) {
    console.log("Comments added successfully");
    revalidatePath(`/events/${obj.event}`);
  }
};

export const getComments = async (event) => {
  let url = `${process.env.BASE_URL}api/comments?event=${event}`;
  let comments = await fetch(url);
  comments = await comments.json();
  console.log("Comments Fetched successfully");
  return comments;
};