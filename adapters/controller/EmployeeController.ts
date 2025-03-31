import { Router, Request, Response } from 'express';
import { EmployeeService } from '../../core/services/DbAws/EmployeeService';
import { Employee } from '../../core/entites/DbAws/Employee';
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
      null,
      _req.body.Employee_name,
      _req.body.Employee_lastname,
      _req.body.Employee_email,
      _req.body.Employee_phone,
      _req.body.Employee_region,
      _req.body.Employee_position,
      _req.body.salary,
      true
    );

    const result = await postgresEmployee
      .create(request)
      .then(() => {
        return { message: 'Success', statuscode: 200 };
      })
      .catch((err) => {
        if(err.errorcode == 23505) return { message: 'Email already exists', statuscode: 400 };
        return { message: 'Data not found', statusCode: 404 };
      });
    res.status(200).send(result);
  });
  // update employee
  router.patch(`/update`, async(_req: Request, res: Response) => {
    const request: Employee = new Employee(
        _req.body.Employee_id,
        _req.body.Employee_name,
        _req.body.Employee_lastname,
        _req.body.Employee_email,
        _req.body.Employee_phone,
        _req.body.Employee_region,
        _req.body.Employee_position,
        _req.body.salary,
        true
      );
    const result = await postgresEmployee.update(request).then((res) => {
      return { message: 'Success', statuscode: 200 };
    }).catch((err) => {
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
