export class PostModel {
    constructor(
        public id: string,
        public content: string,
        public author: AuthorModel,
        public createdAt: string
    ) {}
}

export class AuthorModel {
    constructor(
        public id: string,
        public firstName: string,
        public lastName: string
    ) {}
}
