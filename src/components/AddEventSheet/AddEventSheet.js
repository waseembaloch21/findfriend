"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// import { Autocomplete } from "@react-google-maps/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { addEvent } from "@/actions/events";
import { useToast } from "@/hooks/use-toast";

// Replace with your actual Google Maps API key
// const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAP_API_KEY;

const schema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  startTime: z.string().min(1, "Start time is required"),
  endTime: z.string().min(1, "End time is required"),
  thumbnail: z.string().url("Invalid URL for thumbnail"),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  category: z.string(),
  lat: z.string(),
  long: z.string(),
  address: z.string().min(1, "Address is required"),
  
});

export default function AddEventForm({ session, categories }) {
  const { toast } = useToast();

  const [isOpen, setIsOpen] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: 0, lng: 0 });
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      startTime: "",
      endTime: "",
      thumbnail: "",
      startDate: "",
      endDate: "",
      lat: 0,
      long: 0,
      address: "",
      category: "",
    },
  });

  const onSubmit = async (defaultValues) => {
    console.log(defaultValues);

    const obj = { ...defaultValues };
    obj.location = {
      lat: +obj.lat,
      long: +obj.long,
    };
    obj.createdBy = session.user._id;
    await addEvent(obj);
    reset();
    
    setIsOpen(false);
    toast({
      title: "Event added successfully",
    });
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline">Add Event</Button>
      </SheetTrigger>
      <SheetContent className="w-[400px] sm:w-[540px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Add New Event</SheetTitle>
          <SheetDescription>
            Fill in the details for your new event.
          </SheetDescription>
        </SheetHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Controller
              name="description"
              control={control}
              render={({ field }) => <Textarea {...field} />}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startDate">Start Date</Label>
              <Controller
                name="startDate"
                control={control}
                render={({ field }) => <Input type="date" {...field} />}
              />
              {errors.startDate && (
                <p className="text-red-500 text-sm">
                  {errors.startDate.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="endDate">End Date</Label>
              <Controller
                name="endDate"
                control={control}
                render={({ field }) => <Input type="date" {...field} />}
              />
              {errors.endDate && (
                <p className="text-red-500 text-sm">{errors.endDate.message}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="startTime">Start Time</Label>
              <Controller
                name="startTime"
                control={control}
                render={({ field }) => <Input type="time" {...field} />}
              />
              {errors.startTime && (
                <p className="text-red-500 text-sm">
                  {errors.startTime.message}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="endTime">End Time</Label>
              <Controller
                name="endTime"
                control={control}
                render={({ field }) => <Input type="time" {...field} />}
              />
              {errors.endTime && (
                <p className="text-red-500 text-sm">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <div>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category._id}>
                        {category.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <div>
            <Label htmlFor="thumbnail">Thumbnail URL</Label>
            <Controller
              name="thumbnail"
              control={control}
              render={({ field }) => <Input {...field} />}
            />
            {errors.thumbnail && (
              <p className="text-red-500 text-sm">{errors.thumbnail.message}</p>
            )}
          </div>
          <div className="flex">
            <div>
              <Label htmlFor="lat">Lat</Label>
              <Controller
                name="lat"
                control={control}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
            <div>
              <Label htmlFor="long">Long</Label>
              <Controller
                name="long"
                control={control}
                render={({ field }) => <Input type="number" {...field} />}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <Controller
              name="address"
              control={control}
              render={({ field }) => <Input type="text" {...field} />}
            />
          </div>

          <Button type="submit">
            {isSubmitting ? "Loading.." : "Add Event"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
}