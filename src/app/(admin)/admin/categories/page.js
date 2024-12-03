import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image";
import { AddCategory } from "@/components/AddCategory/AddCategory";
import { getCategories } from "@/actions/categories";

export default async function Categories() {
  const categories = await getCategories();
  console.log("categories=>", categories);
  return (
    <div className="min-h-screen  mx-10 px-1">
      <div className="flex justify-between items-center my-4">
        <h1 className="">Categories</h1>
        <AddCategory />
      </div>
      <Table>
        <TableCaption>A list of your Categories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]" >Thumbnail</TableHead>
            <TableHead >Title</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {categories?.categories?.map((Category) => (
            <TableRow key={Category.title}>
              <TableCell className="text-right">
                <Image src={Category?.thumbnail} alt="Image" height={40} width={40} className="rounded-md" />
              </TableCell>
              <TableCell className="font-medium">{Category.title}</TableCell>
              <TableCell>{Category.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}