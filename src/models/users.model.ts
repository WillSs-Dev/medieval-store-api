import { Pool, RowDataPacket } from 'mysql2/promise';
import LoginInfo from '../types/loginInfo';
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

  public async login(loginInfo: LoginInfo) {
    const { username, password } = loginInfo;
    const query = `SELECT * FROM Trybesmith.users
    WHERE username = ? AND password = ?`;
    const [[user]] = await this.db.execute<RowDataPacket[] & User>(query, [username, password]);
    console.log(user);
    return user as User;
  }
}

export default UserModel;
