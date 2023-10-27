"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Product = {
  id: number;
  title: string;
  price: number;
};

export default function DeleteProduct(props: { product: any; id: any }) {
  const { product, id } = props;

  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleDelete(productId: number) {
    setIsMutating(true);

    await fetch(`http://localhost:3000/api/products/${id}`, {
      method: "DELETE",
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
      <button className="btn btn-error btn-sm" onClick={handleChange}>
        Supprimer
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">
            Êtes vous sur de supprimer {product.title} ?
          </h3>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Annuler
            </button>
            {!isMutating ? (
              <button
                type="button"
                onClick={() => handleDelete(product.id)}
                className="btn btn-primary"
              >
                Confirmer
              </button>
            ) : (
              <button type="button" className="btn loading">
                Suppression...
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
