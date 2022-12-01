import { Department } from "./department.model";
import { Role } from "./role.model";

export class PostedBy {
  constructor(
    public personId: number,
    public username: string,
    public firstName: string,
    public lastName: string,
    public fullName: string,
    public gender: string,
    public hasPermission: boolean,
    public role: Role,
    public department: Department
  ) { }
}
