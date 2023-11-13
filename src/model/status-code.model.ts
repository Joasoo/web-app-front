import { FriendshipStatus } from '../util/enum/FriendshipStatus'

export class StatusCodeModel {
    constructor(
        public code: keyof typeof FriendshipStatus,
        public codeClass: string,
        public value: string
    ) {}
}
