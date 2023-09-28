import { Product } from "@/models/Product";
import AddProduct from "./addProduct";
import DeleteProduct from "./deleteProduct";
import UpdateProduct from "./updateProduct";
import * as dotenv from "dotenv";
import getProducts from "@/lib/getProducts";
import ShowProduct from "./showProduct";
dotenv.config();

export const metadata = {
  title: "Produit Liste",
};

export default async function ProductList() {
  const products: Product[] = await getProducts();

  return (
    <div className="py-10 px-10">
      <div className="py-2">
        <AddProduct />
      </div>
      <table className="table w-full">
        <thead>
          <tr>
            <th>#</th>
            <th>Nom produit</th>
            <th>Prix</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.length <= 0 ? (
            <tr className="flex flex-col justify-center items-center">
              <td colSpan={1}>Aucune produit dans le stock</td>
            </tr>
          ) : (
            products.map((product, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{product.title}</td>
                <td>{product.price} MGA</td>
                <td className="flex">
                  <div className="mr-1">
                    <ShowProduct product={product} id={product._id} />
                  </div>
                  <div className="mr-1">
                    <UpdateProduct product={product} id={product._id} />
                  </div>
                  <div className="mr-1">
                    <DeleteProduct product={product} id={product._id} />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
