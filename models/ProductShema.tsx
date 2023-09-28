import { client, connectMongoDB } from "@/lib/mongodb";
import { Product } from "./Product";
import { ObjectId } from "mongodb";

class ProductSchema {
  // Nom de la collection
  private collection = "products";

  private async getProductsCollection() {
    await connectMongoDB();
    const db = client.db();
    return db.collection<Product>(this.collection);
  }

  // Fonction d'insertion de produit
  async insertProduct(productData: Product): Promise<void> {
    try {
      const products = await this.getProductsCollection();

      const result = await products.insertOne(productData);
      client.close();

      console.log("Données insérées avec succès :", result);
    } catch (error) {
      console.error("Erreur lors de l'insertion des données :", error);
      throw error;
    }
  }

  // Fonction de récupération de produit
  async getAllProduct(): Promise<Product[]> {
    try {
      const products = await this.getProductsCollection();

      const result = await products.find().toArray();
      client.close();
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      throw error;
    }
  }

  // Fonction de recuperation de produit par id
  async getProductById(id: string): Promise<Product | null> {
    try {
      const products = await this.getProductsCollection();

      const result = await products.findOne({ _id: new ObjectId(id) });

      client.close();
      if (!result) {
        return null; // Aucun produit trouvé avec cet _id
      }
      return result;
    } catch (error) {
      console.error("Erreur lors de la récupération des données :", error);
      throw error;
    }
  }

  // Fonction de modification d'un produit par id
  async updateProductById(
    id: string,
    productData: Product
  ): Promise<Product | null> {
    try {
      const products = await this.getProductsCollection();
      console.log("_id:" + id);

      const result = await products.findOneAndUpdate(
        { _id: new ObjectId(id.toString()) },
        { $set: productData }
      );
      if (result == null) {
        return null;
      } else {
        const product = this.getProductById(id);
        return product;
      }
    } catch (error) {
      console.error("Erreur lors de la modification des données :", error);
      throw error;
    }
  }

  // Fonction de suppression de produit
  async deleteProductById(id: string): Promise<boolean> {
    try {
      const products = await this.getProductsCollection();
      const result = await products.findOneAndDelete({ _id: new ObjectId(id) });
      if (!result) {
        return false;
      }
      return true;
    } catch (error) {
      console.error("Erreur lors de la suppression des données :", error);
      throw error;
    }
  }
}

export default new ProductSchema();
