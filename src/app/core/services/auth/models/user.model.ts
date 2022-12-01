export class User {
  constructor(public token: string,
    private id: number,
    private firstName: string,
    private lastName: string,
    private username: string,
    private roleName: string,
    private hasPermission: boolean,
    private departmentName: string,
    private gender: string,
    public collaboratorsIds: number[],

  ) { }

  get userToken() {
    return this.token;
  }
}
