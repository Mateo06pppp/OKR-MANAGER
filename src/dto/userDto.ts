export interface CreateUserDto {
  name: string;
  email: string;
  password: string;
  rol: number;
}

export interface UpdateUserDto {
  name?: string;
  email?: string;
  password?: string;
  rol?: number;
}
