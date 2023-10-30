import { PersonFullNameModel } from './person-full-name-model'

export class FriendshipModel {
    constructor(
        public id: string,
        public person: PersonFullNameModel,
        public friend: PersonFullNameModel,
        public confirmed: boolean,
    ) {}
}
