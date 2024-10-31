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


const events = [
  {
      title : 'Birthday',
      description : 'Birthday of My Brother',
      location : 'gwader',
      thumbnail:'https://images.unsplash.com/photo-1636041241625-42c19b151401?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
      date: new Date(). toLocaleDateString(),

},
{
  title : 'Football',
  description : 'Playing A Football',
  location : 'gwader',
  thumbnail:'https://images.unsplash.com/photo-1543351611-58f69d7c1781?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Zm9vdGJhbGx8ZW58MHx8MHx8fDA%3D',
  date: new Date(). toLocaleDateString(),

},
{
  title : 'Cycling Marathon',
  description : 'All Comunity Member will be have Cycling Race',
  location : 'gwader',
  thumbnail:'https://images.unsplash.com/photo-1471439330580-1493ebc92c13?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGN5Y2xpbmd8ZW58MHx8MHx8fDA%3D',
  date: new Date(). toLocaleDateString(),

},
{
  title : 'Birthday',
  description : 'Birthday of My Brother',
  location : 'gwader',
  thumbnail:'https://images.unsplash.com/photo-1531956531700-dc0ee0f1f9a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8YmlydGhkYXl8ZW58MHx8MHx8fDA%3D',
  date: new Date(). toLocaleDateString(),

},

]

export default function Events() {
    return (
      <div className="min-h-screen container mx-auto">
        <div className="flex justify-between items-center my-4">
          <h1 className="font-bold text-xl">Events</h1>
        </div>
        <Table>
  <TableCaption>A list of your recent events.</TableCaption>
  <TableHeader>
    <TableRow>
      <TableHead >Thumbnail</TableHead>
      <TableHead className="w-[100px]">Title</TableHead>
      <TableHead>Description</TableHead>
      <TableHead>Location</TableHead>
      <TableHead className="text-right">Date</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
        {events.map((event) => (
          <TableRow key={event.title}>
            <TableCell className="text-right">
            <Image src={event.thumbnail} height={40} width={40} className="rounded-md"/>
              </TableCell>
            <TableCell className="font-medium">{event.title}</TableCell>
            <TableCell>{event.description}</TableCell>
            <TableCell>{event.location}</TableCell>
            <TableCell>{event.date}</TableCell>
          </TableRow>
        ))}
      </TableBody>
</Table>

      </div>
    );
  }