import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.services";

//vehicle collection
const createVehicle = async(req:Request, res: Response)=>{

  try {
    const result = await vehicleServices.createVehicle(req.body)

    // console.log(result.rows[0]);

    return res.status(201).json({
      success: true,
      message: "Data inserted",
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
 deleteVehicle
}