import { StatusCodeModel } from './status-code.model'

export class RegistrationModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public dateOfBirth: string,
        public password: string,
        public relationshipStatus?: StatusCodeModel /*todo change with model.*/,
        public workplace?: string,
        public residence?: string,
        public hometown?: string
    ) {}
}
