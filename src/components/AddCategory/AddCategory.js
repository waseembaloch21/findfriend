"use client"
import React, { useRef, useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
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
import { uploadImage } from "@/actions/upload"
import { addCategory } from "@/actions/categories"

export function AddCategory() {
  const [open, setOpen] = useState(false)
  const isDesktop = true

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add Category</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>

            <DialogTitle>Add Category</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when done.
            </DialogDescription>
          </DialogHeader>
          <ProfileForm />
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
            Make changes to your profile here. Click save when done.
          </DrawerDescription>
        </DrawerHeader>
        <ProfileForm className="px-4" />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}

function ProfileForm({ className }) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef()
  const { toast } = useToast()
  const handleAddCategory = async (formData) => {
    console.log("formData=>", formData);
    setLoading(true);
    let uploadLink = await uploadImage(formData);
    const obj = {
      title: formData.get("title"),
      description: formData.get("description"),
      thumbnail: uploadLink,
    };
    await addCategory(obj);
    toast({
      title: "Category added successfully",
    });
    formRef?.current?.reset();
    setLoading(false);
  };

  return (
    <form
      action={handleAddCategory}
      ref={formRef}
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
      <Button disabled={loading} type="submit">
        {loading ? "Loading..." : "Add Category"}
      </Button>
    </form>
  )
}
