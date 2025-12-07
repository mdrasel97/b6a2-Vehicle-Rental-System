import  express  from 'express';
import { vehicleControllers } from './vehicle.controller';
import { auth } from '../../middlewares/auth';
const router = express.Router()

// user post route
router.post("/",auth('admin'), vehicleControllers.createVehicle)
router.get("/", vehicleControllers.getVehicle)
router.get("/:vehicleId", vehicleControllers.getSingleVehicle)
router.put("/:vehicleId",auth("admin"), vehicleControllers.updateVehicle);
router.delete("/:vehicleId",auth('admin'), vehicleControllers.deleteVehicle)


export const vehicleRoutes = router