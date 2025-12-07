
import { StatusCodes } from 'http-status-codes';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { IUser } from './user.interface';
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


const updateUserById = catchAsync(
  async (req: Request & { user?: IUser }, res: Response) => {
    const userId = Number(req.params.userId);
    const updateData = req.body;
    const loggedInUser = req.user as IUser;
    if (loggedInUser?.role !== "admin" && loggedInUser?.id !== userId) {
      return sendResponse<IUser | null>(res, {
        statusCode: StatusCodes.FORBIDDEN,
        success: false,
        message: "Forbidden! You can only update your own profile.",
        data: null,
      });
    }
    if (loggedInUser.role !== "admin" && "role" in updateData) {
      return sendResponse(res, {
        statusCode: StatusCodes.FORBIDDEN,
        success: false,
        message: "Forbidden! You cannot update your own role.",
        data: null,
      });
    }
    if (loggedInUser?.role !== "admin" && req.body.role) {
      delete req.body.role;
    }
    const result = await userServices.updateUserById(userId, updateData);
    sendResponse<IUser | null>(res, {
      statusCode: result ? StatusCodes.OK : StatusCodes.NOT_FOUND,
      success: true,
      message: result
        ? "User updated successfully"
        : "User not found with the provided ID",
      data: result,
    });
  }
);

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const userId = Number(req.params.userId);
  const result = await userServices.deleteUser(userId);
  sendResponse<IUser | null>(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: result
      ? "User deleted successfully"
      : "User not found with the provided ID",
    data: result,
  });
});


export const userControllers = {
    getUser,
    getSingleUser, 
    updateUserById,
    deleteUser
}

