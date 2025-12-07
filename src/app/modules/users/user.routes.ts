import  express  from 'express';

import { userControllers } from "./user.controller";


const router = express.Router()

// user post route
// router.post("/", userControllers.createUser)
router.get("/", userControllers.getUser)
router.get("/:userId", userControllers.getSingleUser)
router.delete("/:userId", userControllers.deleteUser)

// vehicle route 
// router.post('/', )


export const userRoutes = router