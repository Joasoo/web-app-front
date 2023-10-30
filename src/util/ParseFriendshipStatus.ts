import { FriendshipModel } from '../model/friendship-model'
import { StorageUtil } from './BrowerStorageUtil'

export enum ParsedFriendship {
    REQUEST_PENDING_FROM_PERSON = 'REQUEST_PENDING_FROM_PERSON',
    REQUEST_PENDING_FROM_FRIEND = 'REQUEST_PENDING_FROM_FRIEND',
    ALREADY_FRIENDS = 'ALREADY_FRIENDS',
    NO_FRIEND_RELATION = 'NO_FRIEND_RELATION'
}

export function parseFriendshipStatus(dto: FriendshipModel) {
    const personId = StorageUtil.get('SESSION', 'personId')

    if (dto.person === null && dto.friend === null) {
        return ParsedFriendship.NO_FRIEND_RELATION
    }
    if (dto.confirmed) {
        return ParsedFriendship.ALREADY_FRIENDS
    }

    if (dto.person.id == personId) {
        return ParsedFriendship.REQUEST_PENDING_FROM_PERSON
    }

    if (dto.friend.id == personId) {
        return ParsedFriendship.REQUEST_PENDING_FROM_FRIEND
    }

}
