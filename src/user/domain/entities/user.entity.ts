export class User {
    constructor(
        public userId: string,
        public firstName: string,
        public lastName: string,
        public gender?: string,
    ) {}

    static fromPrimitives(data: { userId: string; firstName: string; lastName: string; gender: string }): User {
        return new User(data.userId, data.firstName, data.lastName, data.gender);
    }

    updateUser(userInfo: { firstName?: string; lastName?: string; gender?: string }) {
        if (userInfo.firstName !== undefined) {
            this.firstName = userInfo.firstName;
        }
        if (userInfo.lastName !== undefined) {
            this.lastName = userInfo.lastName;
        }
        if (userInfo.gender !== undefined) {
            this.gender = userInfo.gender;
        }
    }
}