import  HttpStatus  from 'http-status';
import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";
import sendResponse from "../../utils/sendResponse";

//vehicle collection
const createVehicle = async(req:Request, res: Response)=>{

  try {
    const result = await vehicleServices.createVehicle(req.body)

    // console.log(result.rows[0]);

    return res.status(201).json({
      success: true,
      message: "Vehicle created successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

const getVehicle = async(req: Request, res:Response)=>{
  try{
    const result = await vehicleServices.getVehicle()
    if(result.rows.length === 0){
      res.status(200).json({
        success: true,
        message: 'No vehicles found',
        data: []
      })
    }
      res.status(200).json({
        success: true,
        message: 'vehicle received successfully ',
        data: result.rows
      })

  }catch(err:any){
    res.status(500).json({
      success: false,
      message: err.message,
      details: err
    })
  }
}


const getSingleVehicle = async(req: Request, res: Response)=>{
  // console.log(req.params.id)
  // res.send({message: 'api is cool'})
  try{
const result = await vehicleServices.getSingleVehicle(Number(req.params.vehicleId))

if(result.rows.length == 0){
  res.status(404).json({
    success: false,
      message: "user not found",
  })
}else{
    res.status(200).json({
      success: true,
      message: 'Vehicle retrieved successfully',
      data: result.rows[0]
    })
  }                    
  }catch(err:any){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


// const updateUser = async (req: Request, res: Response) => {
//   const { name, email } = req.body;
//   const { id } = req.params;

//   try {
//     const result = await userServices.updateUser(name, email, req.params.id as string)

//     if (result.rows.length === 0) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: 'User updated successfully',
//       data: result.rows[0],
//     });

//   } catch (err: any) {
//     return res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// }


const updateVehicle = async (req: Request, res: Response) => {
  try {
    const { vehicleId } = req.params;
    const result = await vehicleServices.updateVehicle(vehicleId as string, req.body);

    return sendResponse(res, {
      statusCode: HttpStatus.OK,
      success: true,
      message: "Vehicle updated successfully",
      data: result,
    });
  } catch (error: any) {
    let status: number = HttpStatus.BAD_REQUEST;
    if (
      error.message.includes("required") ||
      error.message.includes("Invalid")
    ) {
      status = HttpStatus.BAD_REQUEST;
    } else if (error.message.includes("not found")) {
      status = HttpStatus.NOT_FOUND;
    } else {
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    return res.status(status).json({
      success: false,
      message: `Failed to update vehicle`,
      errors: error.message,
    });
  }
};

const deleteVehicle = async(req: Request, res: Response)=>{
  // console.log(req.params.id)
  // res.send({message: 'api is cool'})
  try{
const result = await vehicleServices.deleteVehicle(Number(req.params.vehicleId))
if(result.rowCount === 0){
  res.status(404).json({
    success: false,
      message: "Vehicle not found",
  })
}else{
    res.status(200).json({
      success: true,
      message: 'Vehicle deleted successfully',
      data: result.rows
    })
  }                    
  }catch(err:any){
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}


export const vehicleControllers = {
 createVehicle,
 getVehicle,
 getSingleVehicle,
 updateVehicle,
 deleteVehicle
}