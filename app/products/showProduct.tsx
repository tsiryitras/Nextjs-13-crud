"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/models/Product";

export default function ShowProduct(props) {
  const { product, id } = props;

  const [title, setTitle] = useState(product.title);
  const [price, setPrice] = useState(product.price);
  const [modal, setModal] = useState(false);

  function handleChange() {
    setModal(!modal);
  }
  return (
    <div>
      <button className="btn btn-info btn-sm" onClick={handleChange}>
        Voir
      </button>

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Modifier {product.title}</h3>
          <div>{product.title}</div>
        </div>
      </div>
    </div>
  );
}
