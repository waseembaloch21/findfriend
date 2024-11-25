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
} from "@/components/ui/table"
import Image from "next/image";

export default async function SubCategories({searchParams}) {
   console.log("searchParams=>", searchParams);
  const subcategories = await getSubCategories(searchParams?.category);
   const categories = (await getCategories()).categories;
    return (
      <div className="min-h-screen  mx-10 px-1">
        <div className="flex justify-between items-center my-4">
          <h1 className="font-bold text-xl">SubCategories</h1>
          <div className="flex gap-3">
          <CategoryDropdown categories={categories}/>
          <AddSubCategory categories = {categories}/>
          </div>
        </div>
       <Table>
  <TableCaption>A list of your SubCategories.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead className="w-[100px]" >Thumbnail</TableHead>
      <TableHead >Category</TableHead>
      <TableHead >Title</TableHead>
      <TableHead>Description</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
        {subcategories?.subcategories?.map((subCat) => (
          <TableRow key={subCat.title}>
            <TableCell className="text-right">
            <Image src={subCat?.thumbnail} alt="Image" style={{ objectFit: "cover" }} height={40} width={40} className="rounded-md"/>
              </TableCell>
              <TableCell className="font-medium">{subCat.Category?.title}</TableCell>
            <TableCell className="font-medium">{subCat.title}</TableCell>
            <TableCell>{subCat.description}</TableCell>
          
          </TableRow>
        ))}
      </TableBody>
</Table>
      </div>
    );
  }