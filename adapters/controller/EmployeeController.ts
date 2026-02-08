// library
import { Router,  Request, Response, NextFunction } from 'express';
import { DateTime } from 'luxon';

// service
import { EmployeeService } from '../../core/services/DbAws/EmployeeService';
import { AuthorizationService } from "../../core/services/utility/AuthorizationService";

//port model
import { Employee } from '../../core/entites/DbAws/Employee';
import { LoginEmployee } from '../../core/entites/DbAws/LoginEmployee';



export function createEmployeeController(postgresEmployee: EmployeeService,authorizationService:AuthorizationService) {
  const router = Router();
  router.get('/employees', authorizationService.authMiddleware.bind(authorizationService), async (req: Request, res: Response) => {
    const result = await postgresEmployee
      .readAll()
      .then((result) => {
        return { header:req.headers, message: 'Success', statuscode: 200, result: result };
      })
      .catch((err) => {
        return { message: 'Data not found', statuscode: 404 };
      });
    res.status(200).send(result);
  });
  // per employee id
  router.get(`/employees/:id`,authorizationService.authMiddleware.bind(authorizationService), async (_req: Request, res: Response) => {
    console.log('id ', _req.params.id);
    const result = await postgresEmployee
      .readOne(Number(_req.params.id))
      .then((res) => {
        return { message: 'Success', statuscode: 200, result: res };
      })
      .catch((err) => {
        return { message: 'Data not found', statuscode: 404 };
      });
    res.status(200).send(result);
  });
  // create employee
  router.post(`/create`, async (_req: Request, res: Response) => {
   
    const request: Employee = new Employee(
      1,
      _req.body.employee_name,
      _req.body.employee_lastname,
      _req.body.email,
      _req.body.phone,
      _req.body.region,
      _req.body.position,
      _req.body.salary,
      _req.body.password,
      true
    );
   
    const result = await postgresEmployee
      .create(request)
      .then(() => {
        return { message: 'Success', statuscode: 200 };
      })
      .catch((err) => {
       
        if(err.errorcode == 10 ) return { message:`${err.message}`,status:404}
        if(err.errorcode == 23505) return { message: 'Email already exists', statuscode: 400 };
        return { message: 'Data not found', statusCode: 404 };
      });
    res.status(200).send(result);
  });

  // login employeee
  router.post(`/login` ,async (req: Request, res: Response) => {
   
    const request: LoginEmployee = new LoginEmployee(
      req.body.email,
      req.body.password,
 
    );
   try{

    const result = await postgresEmployee.login(request);
    const refreshPayload = {
      "userId":result.userId,
    }
    console.log('res',result)
    const accessPayload = {
      "userId": result.Id, 
      "user": result.user,
      "permission": result.permission,
    }
     console.log('accessPayload',accessPayload);
    const refreshToken = authorizationService.generateToken(refreshPayload,process.env.REFRESH_SECRET,"refreshToken");
    const accesstoken = authorizationService.generateToken(accessPayload,process.env.JWT_SECRET,"accessToken");
    console.log('refreshToken',refreshToken);
     console.log('accessToken',accesstoken);
    res.cookie('jwt',refreshToken,{
      httpOnly:true,
      secure:process.env.NODE_ENV === 'production',
      sameSite:'strict',
      maxAge:7 * 24 * 60 * 60 * 1000,
    })

    res.status(200).json({
      Authorization: `Bearer ${accesstoken}`,
       message: "Success",
       statuscode: 200,
       result:result
    })

  
     
     } catch (err: any) {
      console.log("err",err)
    if (err.errorcode === 10) {
      return res.status(404).json({ message: err.message });
    }
    if (err.errorcode === 23505) {
      return res.status(400).json({ message: "Email already exists" });
    }
    return res.status(401).json({ message: "Invalid email or password" });
    
   }
    
     
  
  },
);
  // update employee
  router.patch(`/update`,authorizationService.authMiddleware.bind(authorizationService), async(_req: Request, res: Response) => {
    const request: Employee = new Employee(
      _req.body.employee_id,
      _req.body.employee_name,
      _req.body.employee_lastname,
      _req.body.email,
      _req.body.phone,
      _req.body.region,
      _req.body.position,
      _req.body.salary,
     _req.body.password,
      _req.body.active,
  
    );
    const result = await postgresEmployee.update(request).then((res) => {
      return { message: 'Success', statuscode: 200 };
    }).catch((err) => {
      console.log('err',err)
      if(err.errorcode == 0 ) return { message:'id is null',status:404 }
      if(err.errorcode == 10 ) return { message:`${err.message}`,status:404}
      if(err.errorcode == 23505) return { message: 'Email already exists', statuscode: 400 };
      return { message: 'Data not found', statusCode: 404 };
    });
    console.log(result)
    res.status(200).send(result);
  });

  // active and inactive employee
  router.patch(`/active`,authorizationService.authMiddleware.bind(authorizationService), (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello World' });
  });

  router.patch(`/inactive`,authorizationService.authMiddleware.bind(authorizationService), (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello World' });
  });

  return router;
}
