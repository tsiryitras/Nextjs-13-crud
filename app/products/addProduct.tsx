"use client";

import { SyntheticEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

export default function AddProduct() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [stock, setStock] = useState("");
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  const router = useRouter();

  async function handleSubmit(e: SyntheticEvent) {
    e.preventDefault();

    setIsMutating(true);
    setIsEmpty(false);
    await fetch("http://localhost:3000/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        price: price,
        desc: desc,
        stock: stock,
      }),
    });

    setIsMutating(false);

    setTitle("");
    setPrice("");
    setDesc("");
    setStock("");
    router.refresh();
    setModal(false);
  }

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button className="btn" onClick={handleChange}>
        Ajouter une produit
      </button>

      <input
        type="checkbox"
        checked={modal}
        onChange={handleChange}
        className="modal-toggle"
      />

      <div className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Ajouter nouvelle produit</h3>
          <form onSubmit={handleSubmit}>
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
                onChange={(e) => setPrice(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Prix"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Description</label>
              <input
                type="text"
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Description"
              />
            </div>
            <div className="form-control">
              <label className="label font-bold">Stock</label>
              <input
                type="text"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                className="input w-full input-bordered"
                placeholder="Stock"
              />
            </div>
            <div className="modal-action">
              <button type="button" className="btn" onClick={handleChange}>
                Fermer
              </button>
              {!isMutating ? (
                <button type="submit" className="btn btn-primary">
                  Enregistrer
                </button>
              ) : (
                <button type="button" className="btn loading">
                  Enregistrement...
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
