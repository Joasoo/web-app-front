import { StatusCodeModel } from './status-code.model'

export class EditDataModel {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string,
        public dateOfBirth: string,
        public email: string,
        public residence: string,
        public hometown: string,
        public workplace: string,
        public relationshipStatus: StatusCodeModel | undefined,
        public profileBio: string
    ) {}
}
