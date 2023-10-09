export class ErrorModel {
    constructor(
        public path: string,
        public timestamp: string,
        public cause: string
    ) {}
}
