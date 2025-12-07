import { pool } from "../../../config/db";

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

const deleteVehicle = async(id:number)=>{
  const result = await pool.query(`DELETE FROM vehicles WHERE id = $1`, [id])

  return result
}

export const vehicleServices = {
    createVehicle,
    getVehicle,
    getSingleVehicle,
    deleteVehicle
}