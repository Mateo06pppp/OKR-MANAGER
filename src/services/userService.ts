import promisePool from "../config/config-db.js";
import type { CreateUserDto, UpdateUserDto } from "../dto/userDto.js";
import generateHash from "../helpers/generateHash.js";

class UserService {
  async register(dto: CreateUserDto) {
    const hashedPassword = await generateHash(dto.password);

    const [result] = await promisePool.query(
      `INSERT INTO users (name, email, password_hash, rol) VALUES (?, ?, ?, ?)`,
      [dto.name, dto.email, hashedPassword, dto.rol]
    );

    return { id: (result as any).insertId, ...dto, password: undefined };
  }

  async findByEmail(email: string) {
    const [rows] = await promisePool.query(
      `SELECT * FROM users WHERE email = ?`,
      [email]
    );
    return (rows as any)[0];
  }

  async findAll() {
    const [rows] = await promisePool.query(`SELECT * FROM users`);
    return rows;
  }

  async findById(id: number) {
    const [rows] = await promisePool.query(
      `SELECT * FROM users WHERE id = ?`,
      [id]
    );
    return (rows as any)[0];
  }

  async update(id: number, dto: UpdateUserDto) {
    if (dto.password) {
      dto.password = await generateHash(dto.password);
    }

    await promisePool.query(
      `UPDATE users SET 
        name = COALESCE(?, name),
        email = COALESCE(?, email),
        password_hash = COALESCE(?, password_hash),
        rol = COALESCE(?, rol)
      WHERE id = ?`,
      [dto.name, dto.email, dto.password, dto.rol, id]
    );

    return { id, ...dto };
  }

  async delete(id: number) {
    await promisePool.query(`DELETE FROM users WHERE id = ?`, [id]);
    return { message: "Usuario eliminado correctamente" };
  }
}

export default new UserService();
