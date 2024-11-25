import { getUsers } from "@/actions/users";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


const users = [
  {
    fullname: 'Waseem Baloch',
    email: 'baloch123@gmail.com',
    location: 'gwader',
    profileImage: 'https://images.unsplash.com/photo-1636041241625-42c19b151401?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    events: 4,

  },
  {
    fullname: 'Muhammad Ali',
    email: 'baloch313@gmail.com',
    location: 'Pasni',
    profileImage: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    events: 5,

  },
  {
    fullname: ' Saif Baloch',
    email: 'baloch789@gmail.com',
    location: 'Ormara',
    profileImage: 'https://images.unsplash.com/photo-1636041241625-42c19b151401?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    events: 6,

  },
  {
    fullname: 'Adnan Baloch',
    email: 'baloch456@gmail.com',
    location: 'Jiwani',
    profileImage: 'https://images.unsplash.com/photo-1639149888905-fb39731f2e6c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OTN8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D',
    events: 7,

  },
]

export default async function Users() {
  const users = await getUsers();
  return (
    <div className="min-h-screen  mx-10">
      <div className="flex justify-between itemsF-center my-4">
        <h1 className="font-bold text-xl">Users</h1>
      </div>
      <Table>
        <TableCaption>A list of your recent Users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Profile Image</TableHead>
            <TableHead className="w-[100px]">Fullname</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Location</TableHead>
            <TableHead className="text-right">Events</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.users?.map((user) => (
            <TableRow key={user._id}>
              <TableCell className="text-right">
                <Avatar>
                  <AvatarImage alt="image" height={40} width={40} src={user.profileImg} />
                  <AvatarFallback>-</AvatarFallback>
                </Avatar>
                {/* <Image src={user.profileImage} alt="sorry Image is displaying" height={40} width={40} className="rounded-md" /> */}
              </TableCell>
              <TableCell className="font-medium">{user.fullname}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.location}</TableCell>
              <TableCell>{user.events}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

    </div>
  );
}