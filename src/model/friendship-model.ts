import { PersonFullNameModel } from './PersonFullNameModel'

export class FriendshipModel {
    constructor(
        public id: string,
        public person: PersonFullNameModel,
        public friend: PersonFullNameModel,
        public confirmed: boolean,
    ) {}
}
