import { connectDB } from "@/lib/db/connectDB";
import { EventModal } from "@/lib/models/Event";

export async function GET(request, { params }) {
  await connectDB();
  let event = await EventModal.findOne({ _id: params.id })
    .populate("category", "title")
    .populate("createdBy", "fullname email profileImg")
    .populate("subcategory", "title")
    .populate("going", "fullname email profileImg"); 
  return Response.json(
    {
      msg: "Event Fetched Successfully",
      event,
    },
    { status: 200 }
  );
}