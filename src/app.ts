import  express, { Request, Response }  from 'express';
import { userRoutes } from './app/modules/users/user.routes';
import { vehicleRoutes } from './app/modules/vehicles/vehicle.routes';
import authRoutes from './app/modules/auth/auth.routes';
const app = express()



app.use(express.json())

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World of express with typescript!");
});
// route call 
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/users', userRoutes)
app.use('/api/v1/vehicles', vehicleRoutes)
// app.use('/api/v1/vehicles',)

// Todo
// app.use(Not-Found)
// app.use(Global error handler)
// app.use(logger)

export default app

