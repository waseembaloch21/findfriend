import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

import Image from "next/image";
import { AddCategory } from "@/components/AddCategory/AddCategory";
import { getCategories } from "@/actions/categories";

export default async function Categories() {
  const categories = await getCategories();
  console.log("categories=>", categories);
  return (
    <div className="min-h-screen mx-10 px-1">
      <div className="flex justify-between items-center my-4">
        <h1 className="font-bold text-xl">Categories</h1>
        <AddCategory />
      </div>

      <Table>
        <TableCaption>A list of your categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Thumbnail</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.categories?.map((category) => (
            <TableRow key={category.title}>
              <TableCell className="text-right">
                <img
                  src={category.thumbnail}
                  style={{ objectFit: "cover" }}
                  height={40}
                  width={40}
                />
              </TableCell>
              <TableCell className="font-medium">{category.title}</TableCell>
              <TableCell className="font-medium">
                {category.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}