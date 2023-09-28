import { client, connectMongoDB } from "@/lib/mongodb";
import ProductShema from "@/models/ProductShema";
import { NextApiRequest } from "next";
import { parse } from "querystring";

export async function GET(request: Request) {
  try {
    const results = await ProductShema.getAllProduct();
    // console.log(results);

    return new Response(JSON.stringify(results));
  } catch (err) {
    console.log(err);
  }
}

export async function POST(request: Request) {
  const productData = await request.json();
  await ProductShema.insertProduct(productData);
  return new Response(
    JSON.stringify({
      message: "Insertion réussie",
      productData: productData,
    })
  );
}
