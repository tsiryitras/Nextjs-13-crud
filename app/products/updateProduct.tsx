"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/models/Product";

export default function UpdateProduct(props) {
  const { product, id } = props;

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);
    // console.log("id:" + id);
    const results = await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
      }),
    });

    setIsMutating(false);

    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Modifier
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Modifier {product.title}</h3>
          <form onSubmit={handleUpdate}>
            <div className="form-control">
              <label className="label font-bold">Titre</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Nom du produit"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Prix</label>
              <input
                type="text"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="input w-full input-bordered"
                placeholder="Prix"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Fermer
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Modifier
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Modification...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
