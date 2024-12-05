import { connectDB } from "@/lib/db/connectDB";
import { SubCategoryModal } from "@/lib/models/Subcategories";
import { CategoryModal } from "@/lib/models/Category";
import { EventModal } from "@/lib/models/Event";
import { UserModal } from "@/lib/models/User";

export async function GET(request, { params }) {
  await connectDB();
  let event = await EventModal.findOne({ _id: params.id })
    .populate("category", "title")
    .populate("createdBy", "fullname email profileImg")
    .populate("subcategory", "title")
    .populate("going", "fullname email profileImg"); // Populate going field

  return Response.json(
    {
      msg: "Event Fetched Successfully",
      event,
    },
    { status: 200 }
  );
}