import { connectDB } from "@/lib/db/connectDB";
import { CommentsModal } from "@/lib/models/Comment";

export async function GET(request) {
  await connectDB();
  const event = request?.nextUrl?.searchParams?.get("event");
  const comments = await CommentsModal.find({ event: event }).populate(
    "user",
    "fullname email profileImg"
  );
  return Response.json(
    {
      msg: "Comments Fetched Successfully",
      comments,
    },
    { status: 200 }
  );
}

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newComment = new CommentsModal(obj);
  await newComment.save();

  return Response.json(
    {
      msg: "Comment Added Successfully ",
      comment: newComment,
    },
    { status: 201 }
  );
}

export async function PUT(request) { }

export async function DELETE(request) { }