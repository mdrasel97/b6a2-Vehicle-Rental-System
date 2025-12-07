import  HttpStatus  from 'http-status';
import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";
import sendResponse from "../../utils/sendResponse";
import catchAsync from '../../utils/catchAsync';
import { IVehicle } from './vehicle.interface';
import { StatusCodes } from 'http-status-codes';

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


const updateVehicle = catchAsync(async (req: Request, res: Response) => {
  const vehicleId = Number(req.params.vehicleId);
  const result = await vehicleServices.updateVehicle(vehicleId, req.body);
  sendResponse<IVehicle | null>(res, {
    statusCode: result ? StatusCodes.OK : StatusCodes.NOT_FOUND,
    success: true,
    message: result ? "Vehicle updated successfully" : "Vehicle not found",
    data: result,
  });
});

const deleteVehicle = catchAsync(async (req: Request, res: Response) => {
  const vehicleId = Number(req.params.vehicleId);
  const result = await vehicleServices.deleteVehicle(vehicleId);
  sendResponse<IVehicle | null>(res, {
    statusCode: result ? StatusCodes.OK : StatusCodes.NOT_FOUND,
    success: true,
    message: result ? "Vehicle deleted successfully" : "Vehicle not found",
    data: result,
  });
});


export const vehicleControllers = {
 createVehicle,
 getVehicle,
 getSingleVehicle,
 updateVehicle,
 deleteVehicle
}