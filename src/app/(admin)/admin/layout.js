import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Link from "next/link";
import { auth } from "../../../../auth";
import { redirect } from "next/navigation";

export default async function Layout({ children }) {
  const session = await auth();
  console.log("session=>", session);

  if (!session) redirect("/signin");
  if (session && session.role != "admin") redirect("/");

  return (
    <html>
      <body>
        <Tabs defaultValue="dashboard" className="w-full">
          <TabsList className="w-full">
            <Link href={"/admin/dashboard"}>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            </Link>
            <Link href={"/admin/users"}>
              <TabsTrigger value="users">Users</TabsTrigger>
            </Link>
            <Link href={"/admin/events"}>
              <TabsTrigger value="events">Events</TabsTrigger>
            </Link>
            <Link href={"/admin/categories"}>
              <TabsTrigger value="categories">Categories</TabsTrigger>
            </Link>
            <Link href={"/admin/subcategories"}>
              <TabsTrigger value="subcategories">Subcategories</TabsTrigger>
            </Link>
          </TabsList>

          <TabsContent value="dashboard">{children}</TabsContent>
          <TabsContent value="users">{children}</TabsContent>
          <TabsContent value="events">{children}</TabsContent>
          <TabsContent value="categories">{children}</TabsContent>
          <TabsContent value="subcategories">{children}</TabsContent>
        </Tabs>
      </body>
    </html>
  );
}