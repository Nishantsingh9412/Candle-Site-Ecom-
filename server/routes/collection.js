import express from "express";
import {
  createCollection,
  getAllCollections,
  getCollectionBySlug,
  getCollectionById,
  updateCollection,
  deleteCollection,
} from "../controller/collectionController.js";

const router = express.Router();

// creating a new collection
router.post("/create", createCollection);
// getting all collections
router.get("/get-all-collections", getAllCollections);
// getting collection by slug
router.get("/get-collection-by-slug/:slug", getCollectionBySlug);
// getting collection by id
router.get("/get-collection-by-id/:id", getCollectionById);
// updating a collection by id
router.patch("/update-collection/:id", updateCollection);
// deleting a collection by id
router.delete("/delete-collection/:id", deleteCollection);

export default router;