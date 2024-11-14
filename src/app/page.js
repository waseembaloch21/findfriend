import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { auth, signOut } from "../../auth";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-primary text-primary-foreground py-12">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Find Your Friend</h1>
          <p className="text-xl mb-8">
            Discover events and make new connections
          </p>
          <div className="flex justify-center">
            <Input
              className="w-full text-black max-w-sm mr-2"
              placeholder="Search events..."
              type="search"
            />
            <Button>Search</Button>
          </div>
        </div>
      </header>

      {
        session ?
      <form
      action={async () => {
        "use server"
        await signOut()
      }}
    >
      <Button type="submit">Sign Out</Button>
    </form> :
      <Link href={'/signin'}>
       <Button>Sign In</Button>
      </Link>
      }

    </div>
  );
}
