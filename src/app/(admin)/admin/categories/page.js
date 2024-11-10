import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

import Image from "next/image";
import { AddCategory } from "@/components/AddCategory/AddCategory";


const categories = [
  {
      title : 'Birthday',
      thumbnail:'https://images.unsplash.com/photo-1636041241625-42c19b151401?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      description : 'All your Birthday events',
},
{
  title : 'Indoor Sports',
  thumbnail:'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D',
  description : 'Playing A Football',
},
{
  title : 'Sports ',
  thumbnail:'https://images.unsplash.com/photo-1471439330580-1493ebc92c13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGN5Y2xpbmd8ZW58MHx8MHx8fDA%3D',
  description : 'All Comunity Member will be have Cycling Race',
},

]

export default function Categories() {
    return (
      <div className="min-h-screen  mx-10 px-1">
        <div className="flex justify-between items-center my-4">
          <h1 className="">Categories</h1>
          <AddCategory/>
        </div>
       <Table>
  <TableCaption>A list of your Categories.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >Thumbnail</TableHead>
      <TableHead className="w-[100px]">Title</TableHead>
      <TableHead>Description</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
        {categories.map((Category) => (
          <TableRow key={Category.title}>
            <TableCell className="text-right">
            <Image src={Category.thumbnail} height={40} width={40} className="rounded-md"/>
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