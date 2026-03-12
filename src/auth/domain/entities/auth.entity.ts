// 👉 This is an interface
// 👉 Defined in domain
// 👉 No Mongo import here


export class Auth {
  constructor(
    public userId: string,
    public username: string,
    public password: string,
  ) {}

  updateUsername(username: string) {
    if (!username) {
      throw new Error('Username cannot be empty');
    }
    this.username = username;
  }
}