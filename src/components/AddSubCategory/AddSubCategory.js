"use client"

import  React, { useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { addSubCategory } from "@/actions/subcategories";
import { uploadImage } from "@/actions/upload";

export function AddSubCategory({categories}) {
  const [open, setOpen] = useState(false)
  const isDesktop = true

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Sub Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            
            <DialogTitle>Add Sub Category</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when  done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm onClose={() => setOpen(false)} categories={categories} />
        </DialogContent>
      </Dialog>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">Edit Profile</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>
            Make changes to your profile here. Click save when  done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" categories={categories} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className,categories,onClose }) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef();
  const { toast } = useToast();

  const handleAddCategory = async (formData) => {
    console.log("formData=>", formData);
    // setLoading(true);
    let uploadLink = await uploadImage(formData);
    const obj = {
      title: formData.get("title"),
      description: formData.get("description"),
      category: formData.get("category"),
      thumbnail: uploadLink,
    };
    console.log("obj=>", obj);
    await addSubCategory(obj);
    toast({
      title: "Subcategory added successfully",
    });
    formRef?.current?.reset();
    setLoading(false);
    onClose()
  };
  return (
    <form
    action={handleAddCategory}
    className={cn("grid items-start gap-4", className)}>
     <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          required
          name="title"
          type="title"
          id="title"
          placeholder="Sports" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="description">Description</Label>
        <Input
          required
          name="description"
          id="description"
          placeholder="About Category" />
      </div>
      <div className="grid gap-2">
        <Label htmlFor="thumbnail">Thumbnail</Label>
        <Input
          required
          name="thumbnail"
          type="file" />
      </div>
      <div className="grid gap-2">
      <Select name="category">
      <SelectTrigger>
        <SelectValue placeholder="Select Category" />
      </SelectTrigger>
      <SelectContent>
        {categories?.map((data) => (
          <SelectItem key={data._id} value={data._id}>
            {data.title}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
      </div>
      <Button type="submit">Save changes</Button>
    </form>
  )
}
