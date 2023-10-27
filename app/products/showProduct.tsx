"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/models/Product";

export default function ShowProduct(props: { product: Product; id: any }) {
  const { product, id } = props;

  const [modal, setModal] = useState(false);

  const router = useRouter();

  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Voir
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Information de {product.title}</h3>
          <div className="flex mx-4">
            <ul>
              <li>
                <p>{product.title}</p>
              </li>
              <li>
                <p>{product.price} MGA</p>
              </li>
              <li>
                <p>{product.desc} </p>
              </li>
            </ul>
          </div>
          <div className="modal-action">
            <button type="button" className="btn" onClick={handleChange}>
              Fermer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
