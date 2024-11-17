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

// const subcategories = [
// {
//   title : 'Cricket ',
//   Category:'Sports',
//   thumbnail:'https://images.unsplash.com/photo-1471439330580-1493ebc92c13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGN5Y2xpbmd8ZW58MHx8MHx8fDA%3D',
//   description : 'All Comunity Member will be have Cycling Race',
// },
// {
//   title : 'Football ',
//   Category:'Sports',
//   thumbnail:'https://images.unsplash.com/photo-1471439330580-1493ebc92c13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGN5Y2xpbmd8ZW58MHx8MHx8fDA%3D',
//   description : 'All Comunity Member will be have Cycling Race',
// },
// {
//   title : 'Tennis ',
//   Category:'Sports',
//   thumbnail:'https://images.unsplash.com/photo-1471439330580-1493ebc92c13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGN5Y2xpbmd8ZW58MHx8MHx8fDA%3D',
//   description : 'All Comunity Member will be have Cycling Race',
// },

// ]

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
            <Image src={subCat.thumbnail} alt="Image"   style={{ objectFit: "cover" }} height={40} width={40} className="rounded-md"/>
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