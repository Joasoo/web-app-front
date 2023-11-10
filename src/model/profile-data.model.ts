import { StatusCodeModel } from './status-code.model'

export class ProfileDataModel {
    constructor(
        public firstName: string,
        public lastName: string,
        public dateOfBirth: string,
        public relationshipStatus: StatusCodeModel,
        public workplace: string,
        public residence: string,
        public hometown: string,
        public bio: string
    ) {}
}
