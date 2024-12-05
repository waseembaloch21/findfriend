import { connectDB } from "@/lib/db/connectDB";
import { SubCategoryModal } from "@/lib/models/Subcategories";
import { CategoryModal } from "@/lib/models/Category";

export async function GET(request) {
  await connectDB();
  const reqUrl = request.url;
  const { searchParams } = new URL(reqUrl);
  const query = {};
  if (searchParams.get("category")) {
    query.category = searchParams.get("category");
  }
  console.log("query=>", query);
  const subCategories = await SubCategoryModal.find(query).populate(
    "category",
    "title"
  );

  return Response.json(
    {
      msg: "Subcategories Fetched Successfully",
      subCategories,
    },
    { status: 200 }
  );
}

export async function POST(request) {
  await connectDB();
  const obj = await request.json();
  let newSubCategory = new SubCategoryModal(obj);
  await newSubCategory.save();

  return Response.json(
    {
      msg: "SubCategory Added Successfully",
      newSubCategory: newSubCategory,
    },
    { status: 201 }
  );
}

export async function PUT(request) {}

export async function DELETE(request) {}