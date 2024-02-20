import DB from "../config/DB";
import * as mysql from "mysql2";

export class UserModel {
  //ユーザ取得
  static findUser(id) {
    return new Promise((resolve, reject) => {
      DB.query(
        "SELECT*FROM user_table WHERE user_id=?",
        [id],
        (error, results) => {
          //該当データがない
          if (results.length === 0) return resolve(null);

          if (error) return reject(error);

          //該当データがある
          const user = results[0];
          return resolve(user);
        }
      );
    });
  }
}
