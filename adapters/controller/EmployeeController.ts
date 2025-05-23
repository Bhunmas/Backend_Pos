import { Router, Request, Response } from 'express';
import { EmployeeService } from '../../core/services/DbAws/EmployeeService';
import { Employee } from '../../core/entites/DbAws/Employee';
import { LoginEmployee } from '../../core/entites/DbAws/LoginEmployee';

export function createEmployeeController(postgresEmployee: EmployeeService) {
  const router = Router();
  router.get('/employees', async (_req: Request, res: Response) => {
    const result = await postgresEmployee
      .readAll()
      .then((result) => {
        return { message: 'Success', statuscode: 200, result: result };
      })
      .catch((err) => {
        return { message: 'Data not found', statuscode: 404 };
      });
    res.status(200).send(result);
  });
  // per employee id
  router.get(`/employees/:id`, async (_req: Request, res: Response) => {
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
    const a = {
      Employee_name: _req.body.Employee_name,
      Employee_lastname: _req.body.Employee_lastname,
      Employee_email: _req.body.email,
      Employee_phone: _req.body.phone,
      Employee_region: _req.body.region,
      Employee_position: _req.body.position,
      salary: _req.body.salary,
      active: true,
    };
    const request: Employee = new Employee(
      1,
      _req.body.employee_name,
      _req.body.employee_lastname,
      _req.body.email,
      _req.body.phone,
      _req.body.region,
      _req.body.position,
      _req.body.salary,
      null,
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
  router.post(`/login`, async (_req: Request, res: Response) => {
   console.log('_req',_req.body);
    const request: LoginEmployee = new LoginEmployee(
      _req.body.email,
      _req.body.password,
 
    );
   

    const result = await postgresEmployee
      .login(request)
      .then((res) => {
        return { message: 'Success', statuscode: 200 ,result:res};
      })
      .catch((err) => {
       
        if(err.errorcode == 10 ) return { message:`${err.message}`,status:404}
        if(err.errorcode == 23505) return { message: 'Email already exists', statuscode: 400 };
        return { message: 'Data not found', statusCode: 404 };
      });
    res.status(200).send(result);
  });
  // update employee
  router.patch(`/update`, async(_req: Request, res: Response) => {
    const request: Employee = new Employee(
      _req.body.employee_id,
      _req.body.employee_name,
      _req.body.employee_lastname,
      _req.body.email,
      _req.body.phone,
      _req.body.region,
      _req.body.position,
      _req.body.salary,
      null,
      _req.body.active
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
  router.patch(`/active`, (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello World' });
  });

  router.patch(`/inactive`, (_req: Request, res: Response) => {
    res.status(200).send({ message: 'Hello World' });
  });

  return router;
}
