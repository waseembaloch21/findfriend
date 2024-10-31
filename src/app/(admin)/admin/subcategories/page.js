import { AddSubCategory } from "@/components/AddSubCategory/AddSubCategory";
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
const subcategories = [
{
  title : 'Cricket ',
  Category:'Sports',
  thumbnail:'https://images.unsplash.com/photo-1471439330580-1493ebc92c13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGN5Y2xpbmd8ZW58MHx8MHx8fDA%3D',
  description : 'All Comunity Member will be have Cycling Race',
},
{
  title : 'Football ',
  Category:'Sports',
  thumbnail:'https://images.unsplash.com/photo-1471439330580-1493ebc92c13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGN5Y2xpbmd8ZW58MHx8MHx8fDA%3D',
  description : 'All Comunity Member will be have Cycling Race',
},
{
  title : 'Tennis ',
  Category:'Sports',
  thumbnail:'https://images.unsplash.com/photo-1471439330580-1493ebc92c13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGN5Y2xpbmd8ZW58MHx8MHx8fDA%3D',
  description : 'All Comunity Member will be have Cycling Race',
},

]

export default function categories() {
    return (
      <div className="min-h-screen  mx-10 px-1">
        <div className="flex justify-between items-center my-4">
          <h1 className="font-bold text-xl">SubCategories</h1>
          <AddSubCategory/>
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
        {subcategories.map((Category) => (
          <TableRow key={Category.title}>
            <TableCell className="text-right">
            <Image src={Category.thumbnail} height={40} width={40} className="rounded-md"/>
              </TableCell>
              <TableCell className="font-medium">{Category.Category}</TableCell>
            <TableCell className="font-medium">{Category.title}</TableCell>
            <TableCell>{Category.description}</TableCell>
          
          </TableRow>
        ))}
      </TableBody>
</Table>
      </div>
    );
  }