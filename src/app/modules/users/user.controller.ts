
import { userServices } from './user.services';
import { Request, Response } from "express";




const getUser = async(req: Request, res:Response)=>{
  try{
    const result = await userServices.getUser()
      res.status(200).json({
        success: true,
        message: 'users received successfully ',
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


const getSingleUser = async(req: Request, res: Response)=>{
  // console.log(req.params.id)
  // res.send({message: 'api is cool'})
  try{
const result = await userServices.getSingleUser(Number(req.params.userId))

if(result.rows.length == 0){
  res.status(404).json({
    success: false,
      message: "user not found",
  })
}else{
    res.status(200).json({
      success: true,
      message: 'user fetched successfully',
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


const updateUser = async (req: Request, res: Response) => {
  const { name, email } = req.body;
  const { id } = req.params;

  try {
    const result = await userServices.updateUser(name, email, req.params.id as string)

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: 'User updated successfully',
      data: result.rows[0],
    });

  } catch (err: any) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
}

const deleteUser = async(req: Request, res: Response)=>{
  // console.log(req.params.id)
  // res.send({message: 'api is cool'})
  try{
const result = await userServices.deleteUser(Number(req.params.userId))
if(result.rowCount === 0){
  res.status(404).json({
    success: false,
      message: "user not found",
  })
}else{
    res.status(200).json({
      success: true,
      message: 'user deleted successfully',
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


export const userControllers = {
    getUser,
    getSingleUser, 
    updateUser,
    deleteUser
}