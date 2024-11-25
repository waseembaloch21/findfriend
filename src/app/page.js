import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import UpcomingEvents from "@/components/UpcomingEvents/UpcomingEvents";
import { getEvents } from "@/actions/events";
import { getCategories } from "@/actions/categories";
import { auth } from "../../auth";

export default async function Home({ searchParams }) {
  console.log("searchparams=>", searchParams);
  const { category } = await (searchParams);
  const session = await auth();
  const { events } = await getEvents(category);
  const { categories } = await getCategories();

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

      <UpcomingEvents
        chosenCategory={category}
        events={events}
        session={session}
        categories={categories}
      />
    </div>
  );
}
