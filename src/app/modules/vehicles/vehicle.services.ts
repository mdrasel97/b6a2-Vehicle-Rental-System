

import { pool } from "../../../config/db";
import { IVehicle } from "./vehicle.interface";

// vehicle
const createVehicle = async (payload: Record<string, unknown>)=>{
  const {vehicle_name,  type, registration_number, daily_rent_price, availability_status} = payload;

   

   const result = await pool.query(
         `INSERT INTO vehicles( vehicle_name,  type, registration_number, daily_rent_price, availability_status) VALUES($1, $2, $3, $4, $5) RETURNING *`,
         [vehicle_name,  type, registration_number, daily_rent_price, availability_status]
       ); 

       return result
}


const getVehicle = async()=>{
    const result = await pool.query(`
      SELECT * FROM vehicles
      `)

      return result
}

const getSingleVehicle = async(id: number)=>{
    // console.log(id)
  const result =  await pool.query(`SELECT * FROM vehicles WHERE id = $1`, [id])

  return result 
}


// const updateVehicle = async(name: string, email:string, id:number)=>{

//   const result = await pool.query(
//       `UPDATE vehicles 
//        SET name=$1, email=$2 
//        WHERE id=$3 
//        RETURNING *`,
//       [id]
//     );

//     return result
// }

//Update Vehicle
const updateVehicle = async (
  vehicleId: number,
  payload: Partial<IVehicle>
): Promise<IVehicle | null> => {
  const existingVehicle = await pool.query(
    `SELECT * FROM vehicles WHERE id = $1`,
    [vehicleId]
  );

  if (existingVehicle.rows.length === 0) {
    throw new Error("Vehicle not found");
  }

  const updatedVehicle: IVehicle = {
    ...existingVehicle.rows[0],
    ...payload,
  };
  const queryText = `UPDATE vehicles SET 
    vehicle_name = $1, 
    type = $2, 
    registration_number = $3, 
    daily_rent_price = $4, 
    availability_status = $5 
    WHERE id = $6 RETURNING *`;

  const values = [
    updatedVehicle.vehicle_name,
    updatedVehicle.type,
    updatedVehicle.registration_number,
    updatedVehicle.daily_rent_price,
    updatedVehicle.availability_status,
    vehicleId,
  ];

  const result = await pool.query(queryText, values);
  return result.rows[0];
};



const deleteVehicle = async(id:number)=>{
  // const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id])

  const checkBookingsQuery = `SELECT COUNT(*) FROM bookings WHERE vehicle_id = $1 AND status = 'active'`;

   const bookingsResult = await pool.query(checkBookingsQuery, [id]);
  if (parseInt(bookingsResult.rows[0].count, 10) > 0) {
    throw new Error("Cannot delete vehicle with active bookings");

  }
  const queryText = `DELETE FROM vehicles WHERE id = $1 RETURNING *`;
  const values = [id];
  const result = await pool.query(queryText, values);
  return result.rows[0];
}

export const vehicleServices = {
    createVehicle,
    getVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}