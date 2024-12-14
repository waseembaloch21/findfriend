import { getCategories } from "@/actions/categories";
import { getSubCategories } from "@/actions/subcategories";
import { AddSubCategory } from "@/components/AddSubCategory/AddSubCategory";
import CategoryDropdown from "@/components/CategoryDropdown/CategoryDropdown";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import Image from "next/image";

// const subcategories = [
//   {
//     title: "Cricket",
//     category: "Sports",
//     thumbnail:
//       "https://images.unsplash.com/photo-1470920456752-d50214d7ed59?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
//     description: "All Community Members will be have cycling Race",
//   },
//   {
//     title: "Footbal",
//     category: "Sports",
//     thumbnail:
//       "https://images.unsplash.com/photo-1470920456752-d50214d7ed59?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
//     description: "All Community Members will be have cycling Race",
//   },
//   {
//     title: "Tennis",
//     category: "Sports",
//     thumbnail:
//       "https://images.unsplash.com/photo-1470920456752-d50214d7ed59?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y3ljbGluZ3xlbnwwfHwwfHx8MA%3D%3D",
//     description: "All Community Members will be have cycling Race",
//   },
// ];

export default async function SubCategories({ searchParams }) {
  console.log("searchParams=>", searchParams);

  const subcategories = await getSubCategories(searchParams?.category);
  const categories = (await getCategories()).categories;
  return (
    <div className="min-h-screen mx-10 px-1">
      <div className="flex justify-between items-center my-4">
        <h1 className="font-bold text-xl">SubCategories</h1>
        <div className="flex gap-3">
          <CategoryDropdown categories={categories} />
          <AddSubCategory categories = {categories} />
        </div>
      </div>

      <Table>
        <TableCaption>A list of your subcategories.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Thumbnail</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Description</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subcategories?.subCategories?.map((subCat) => (
            <TableRow key={subCat.title}>
              <TableCell className="text-right">
                <Image
                alt="SubCategory Image"
                  src={subCat.thumbnail}
                  style={{ objectFit: "cover" }}
                  height={40}
                  width={40}
                />
              </TableCell>
              <TableCell className="font-medium">
                {subCat.category?.title}
              </TableCell>
              <TableCell className="font-medium">{subCat.title}</TableCell>
              <TableCell className="font-medium">
                {subCat.description}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}