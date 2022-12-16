import { Pool } from 'mysql2/promise';
import User from '../types/user';

class UserModel {
  private db: Pool;

  constructor(db: Pool) {
    this.db = db;
  }

  public async add(user: User) {
    const { username, vocation, level, password } = user;
    const query = `INSERT INTO Trybesmith.users(username, vocation, level, password)
    VALUES(?, ?, ?, ?)`;
    await this.db.execute(query, [username, vocation, level, password]);
  }
}

export default UserModel;
