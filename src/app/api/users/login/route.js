import { connectDB } from "@/lib/db/connectDB";
import { UserModal } from "@/lib/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  const user = await UserModal.findOne({ email: obj.email });

  if (!user)
    return Response.json(
      { error: true, msg: "User not found" },
      { status: 403 }
    );

  const isPasswordValid = await bcrypt.compare(obj.password, user.password);

  if (!isPasswordValid)
    return Response.json(
      { error: true, msg: "Password is not valid." },
      { status: 403 }
    );

  var token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_KEY);

  return Response.json(
    {
      msg: "Users Login Successfully ",
      user,
      token,
    },
    { status: 200 }
  );
}