import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getSingleEvent, goingToEvent } from "@/actions/events";
import { auth } from "../../../../auth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  UserCheckIcon,
  UserIcon,
} from "lucide-react";
import Image from "next/image";
import { redirect } from "next/navigation";
import Link from "next/link";
import { addComment, getComments } from "@/actions/comments";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default async function EventDetailsPage({ params }) {
  const { event } = await getSingleEvent(params.id);
  const { comments } = await getComments(params.id);
  if (!event) redirect("not-found");
  const session = await auth();

  console.log("event going==>", event);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const isGoingToEvent =
    session && event.going.find((data) => data._id == session.user._id);
  return (
    <div className="min-h-screen bg-background p-6">
      <Card className="max-w-3xl mx-auto">
        <CardHeader>
          <div className="relative w-full h-64 mb-4">
            <Image
              src={event.thumbnail}
              alt={event.title}
              fill
              className="object-cover rounded-t-lg"
            />
          </div>
          <Badge className="mb-2 w-36">{event.category.title}</Badge>
          <CardTitle className="text-3xl">{event.title}</CardTitle>
          <CardDescription>{event.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-4">
            <CalendarIcon className="text-muted-foreground" />
            <span>
              {formatDate(event.startDate)} - {formatDate(event.endDate)}
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <ClockIcon className="text-muted-foreground" />
            <span>
              {event.startTime} - {event.endTime}
            </span>
          </div>
          <div className="flex items-center space-x-4 mb-4">
            <MapPinIcon className="text-muted-foreground" />
            <span>{event.address}</span>
          </div>
          <Separator className="my-4" />
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src={event.createdBy.profileImg} />
              <AvatarFallback>
                {event.createdBy.fullname.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{event.createdBy.fullname}</p>
              <p className="text-sm text-muted-foreground">Event Organizer</p>
            </div>
          </div>
          <Separator className="my-4" />
          <div>
            <h3 className="text-lg font-semibold mb-2">Attendees</h3>
            <div className="flex flex-wrap gap-2">
              {event?.going?.map((user) => (
                <Avatar key={user._id} title={user.fullname}>
                  <AvatarImage src={user.profileImg} />
                  <AvatarFallback>{user.fullname.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col">
          {session ? (
            <form
              action={async () => {
                "use server";
                await goingToEvent(params.id, session.user._id);
              }}
            >
              {isGoingToEvent ? (
                <Button type="submit" className="w-full">
                  <span className="flex">
                    <UserCheckIcon className="mr-2 h-4 w-4" /> Going
                  </span>
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  <span className="flex">
                    <UserIcon className="mr-2 h-4 w-4" /> Want to Go
                  </span>
                </Button>
              )}
              {/* <UserIcon className="mr-2 h-4 w-4" />{" "} */}
              {/* {isGoingToEvent ? "Going" : "Want to Go"} */}
            </form>
          ) : (
            <Link className="w-full" href={"/signin"}>
              <Button className="w-full"> Login to participate in Event</Button>
            </Link>
          )}
          {session && (
            <div className="w-full space-y-4">
              <h2 className="text-xl font-semibold">Comments</h2>
              <form
                action={async (formData) => {
                  "use server";
                  await addComment({
                    event: params.id,
                    user: session.user._id,
                    comment: formData.get("comment"),
                  });
                }}
                className="space-y-2"
              >
                <div className="flex space-x-2">
                  <Input
                    className="flex-grow"
                    name="comment"
                    placeholder="Add a comment..."
                  />
                  <Button type="submit">Post</Button>
                </div>
              </form>
              <div className="space-y-4">
                {comments && comments.length > 0 ? (
                  comments.map((comment) => (
                    <div
                      key={comment._id}
                      className="flex items-start space-x-3 bg-muted p-3 rounded-lg"
                    >
                      <Avatar title={comment.user.fullname}>
                        <AvatarImage src={comment.user.profileImg} />
                        <AvatarFallback>
                          {comment.user.fullname.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <p className="font-semibold">{comment.user.fullname}</p>
                        <p className="text-md font-semibold text-muted-foreground mt-1">
                          {comment.comment}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {dayjs().from(dayjs(comment.createdAt))}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted-foreground">
                    No comments yet. Be the first to comment!
                  </p>
                )}
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}