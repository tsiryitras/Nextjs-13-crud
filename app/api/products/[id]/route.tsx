import ProductShema from "@/models/ProductShema";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const results = await ProductShema.getProductById(id);
  //   console.log(results);
  if (results === null) {
    return new Response(
      JSON.stringify({ message: "Aucun produit trouvé avec cette id" })
    );
  }
  return new Response(JSON.stringify(results));
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const productData = await request.json();
  console.log("params.id: " + id);

  const results = await ProductShema.updateProductById(id, productData);
  console.log(results);

  if (results !== null) {
    return new Response(
      JSON.stringify({ message: "Modification réussi", results })
    );
  } else {
    return new Response(
      JSON.stringify({ message: "Aucun produit trouvé avec cette id" })
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  const isDeleted = await ProductShema.deleteProductById(id);
  if (isDeleted) {
    return new Response(
      JSON.stringify({ message: "Le produit a été supprimer avec succes" })
    );
  }
  return new Response(
    JSON.stringify({ message: "Le produit n'a pas été trouvé" })
  );
}
