import  httpStatus  from 'http-status';
import { Request, Response } from "express";
import { authServices } from "./auth.services";
import sendResponse from "../../utils/sendResponse";


const createUser = async (req: Request, res: Response) => {
  try {
    const result = await authServices.registration(req.body);
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User Registration successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: true,
      message: error.message, 
      data: null,
    });
  }
};

const userSignIn = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: true,
        message: "email and password cannot be empty",
        data: null,
      });
    }

    const result = await authServices.signIn(email, password);
    if (!result) {
      return sendResponse(res, {
        statusCode: httpStatus.BAD_REQUEST,
        success: false,
        message: "User not found",
        data: null,
      });
    }

    return sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "Sign In successful",
      data: result,
    });
  } catch (error: any) {
    return sendResponse(res, {
      statusCode: httpStatus.INTERNAL_SERVER_ERROR,
      success: true,
      message: error.message,
      data: null,
    });
  }
};


export const authControllers = {
  createUser,
  userSignIn,
};