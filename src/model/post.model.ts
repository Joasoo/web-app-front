import { PersonFullNameModel } from './person-full-name-model'

export class PostModel {
    constructor(
        public id: string,
        public content: string,
        public author: PersonFullNameModel,
        public createdAt: string
    ) {}
}
