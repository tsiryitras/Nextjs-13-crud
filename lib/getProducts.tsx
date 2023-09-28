import * as dotenv from "dotenv";
dotenv.config();

export default async function getProducts() {
  const res = await fetch(process.env.API_URL, {
    method: "GET",
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = await res.json();
  // console.log(data);

  return data;
}
