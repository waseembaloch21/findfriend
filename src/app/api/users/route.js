import { connectDB } from "@/lib/db/connectDB";
import { UserModal } from "@/lib/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function GET(request) {
  await connectDB();
  const users = await UserModal.find();
  return Response.json(
    {
      msg: "Users Fetched Successfully",
      users,
    },
    { status: 200 }
  );
}

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  const user = await UserModal.findOne({ email: obj.email });

  if (user)
    return Response.json(
      { error: true, msg: "User with this email already Exist" },
      { status: 403 }
    );

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(obj.password, saltRounds);
  obj.password = hashedPassword;

  let newUser = new UserModal(obj);
  await newUser.save();

  var token = jwt.sign(
    { _id: newUser._id, role: newUser.role },
    process.env.JWT_KEY
  );

  console.log("obj=>", obj);

  return Response.json(
    {
      msg: "Users Added Successfully ",
      user: newUser,
      token,
    },
    { status: 201 }
  );
}

export async function PUT(request) {}

export async function DELETE(request) {}