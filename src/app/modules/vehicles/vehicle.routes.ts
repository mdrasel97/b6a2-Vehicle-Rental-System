import  express  from 'express';
import { vehicleControllers } from './vehicle.controller';
const router = express.Router()

// user post route
router.post("/", vehicleControllers.createVehicle)
router.get("/", vehicleControllers.getVehicle)


export const vehicleRoutes = router