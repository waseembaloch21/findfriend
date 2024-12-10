"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const addEvent = async (obj) => {
  const added = await fetch(`${process.env.BASE_URL}api/events`, {
    method: "POST",
    body: JSON.stringify(obj),
  });
  if (added.ok) {
    console.log("Event added successfully");
    revalidatePath("/admin/events");
  }
};

export const getEvents = async (category) => {
  console.log("Category passed to getEvents:", category);

  try {
    const response = await fetch(
      `${process.env.BASE_URL}api/events?category=${category || ""}`
    );

    if (!response.ok) {
      console.error("Failed to fetch events");
      return [];
    }

    const events = await response.json();
    console.log("Events fetched successfully:", events);
    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};


export const getSingleEvent = async (id) => {
  let event = await fetch(`${process.env.BASE_URL}api/events/${id}`, {
    cache: "no-cache",
  });
  if (event.ok) {
    event = await event.json();
    console.log("Event Fetched successfully");
    return event;
  } else {
    redirect("/not-found");
  }
  revalidatePath("/admin/categories");
};

export const goingToEvent = async (id, userId) => {
  let event = await fetch(`${process.env.BASE_URL}api/events/${id}/going`, {
    method: "POST",
    body: JSON.stringify({ userId }),
  });
  if (event.ok) {
    revalidatePath(`/events/${id}`);
    // const res = await event.json();
    // console.log("Event Updated successfully");
    // return res;
  } else {
    redirect("/not-found");
  }
};