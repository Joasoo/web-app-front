import { PersonFullNameModel } from './PersonFullNameModel'

export class PostModel {
    constructor(
        public id: string,
        public content: string,
        public author: PersonFullNameModel,
        public createdAt: string
    ) {}
}

