export class ErrorModel {
    constructor(
        public cause: string,
        public path?: string,
        public timestamp?: string
    ) {}
}
