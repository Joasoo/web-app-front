import { PersonFullNameModel } from './PersonFullNameModel'

export class FriendshipModel {
    constructor(
        public id: string,
        public from: PersonFullNameModel,
        public to: PersonFullNameModel,
        public confirmed: boolean,
    ) {}
}
