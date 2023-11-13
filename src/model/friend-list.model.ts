import { FullNameModel } from './full-name.model'
import { StatusCodeModel } from './status-code.model'

export class FriendListModel {
    constructor(
        public id: number,
        public name: FullNameModel,
        public status: StatusCodeModel
    ) {}
}
