export interface IAuthResponse {
  token: string,
  userDto: {
    personId: number,
    firstName: string,
    lastName: string,
    username: string,
    roleName: string,
    hasPermission: boolean,
    departmentName: string,
    gender: string,
    collaboratorsIds: number[];
  };
}
