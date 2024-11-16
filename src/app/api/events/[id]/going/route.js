import { connectDB } from "@/lib/db/connectDB";
import { SubCategoryModal } from "@/lib/models/Subcategories";
import { CategoryModal } from "@/lib/models/Category";
import { EventModal } from "@/lib/models/Event";
import { UserModal } from "@/lib/models/User";

export async function POST(request, { params }) {
  await connectDB();

  const event = await EventModal.findOne({ _id: params.id });
  if (!event)
    return Response.json(
      {
        error: true,
        msg: "Event Not Found",
      },
      { status: 404 }
    );
  const { userId } = await request.json();
  if (!event.going.includes(userId)) {
    const updated = await EventModal.findOneAndUpdate(
      { _id: params.id },
      {
        $push: { going: userId },
      }
    ).exec();
    return Response.json(
      {
        msg: "Congrats , You are now part of Great event.",
        event: updated,
      },
      { status: 200 }
    );
  } else {
    const updated = await EventModal.findOneAndUpdate(
      { _id: params.id },
      {
        $pull: { going: userId },
      }
    ).exec();
    return Response.json(
      {
        msg: "You are no longer part of Event",
        event: updated,
      },
      { status: 200 }
    );
  }
}