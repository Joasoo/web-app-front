export class RegistrationModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public dateOfBirth: string,
        public password: string,
        public relationshipStatus?: any /*todo change with model.*/,
        public workplace?: string,
        public residence?: string,
        public hometown?: string
    ) {}
}
