import express from "express";
import {verifyAdmin} from "../utils/verifyToken.js";
import { createRoom, deleteRoom,getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";

const router = express.Router();

router.post("/:hotelid",verifyAdmin,createRoom);

router.put("/availability/:id",updateRoomAvailability);

router.put("/:id",verifyAdmin,updateRoom);

router.delete("/:id/:hotelid",verifyAdmin,deleteRoom);

router.get("/:id",getRoom);

router.get("/",getRooms);

export default router;