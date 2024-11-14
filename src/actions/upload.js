"use server";

export async function uploadImage(categoryForm) {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  const timestamp = Math.floor(Date.now() / 1000);
  const signature = generateSignature(timestamp, apiSecret);

  const formData = new FormData();
  formData.append("file", categoryForm.get('thumbnail'));

  formData.append("api_key", apiKey);
  formData.append("timestamp", timestamp);
  formData.append("signature", signature);

  const response = await fetch(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    {
      method: "POST",
      body: formData,
    }
  );

  const data = await response.json();

  if (response.ok) {
    console.log("data=>", data.secure_url);
    return data.secure_url;
  } else {
    console.log("error=>", data.error.message);
    return data.error.message;
  }
}

function generateSignature(timestamp, apiSecret) {
  const crypto = require("crypto");
  const signature = crypto
    .createHash("sha256")
    .update(`timestamp=${timestamp}${apiSecret}`)
    .digest("hex");
  return signature;
}