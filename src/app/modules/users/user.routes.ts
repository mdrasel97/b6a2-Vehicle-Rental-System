import  express  from 'express';

import { userControllers } from "./user.controller";
import { auth } from '../../middlewares/auth';


const router = express.Router()

// user post route
// router.post("/", userControllers.createUser)
router.get("/", auth("admin"), userControllers.getUser)
router.get("/:userId", userControllers.getSingleUser)
router.delete("/:userId", userControllers.deleteUser)

// vehicle route 
// router.post('/', )


export const userRoutes = router