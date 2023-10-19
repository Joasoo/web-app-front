import { FriendshipModel } from '../model/friendship-model'
import { StorageUtil } from './BrowerStorageUtil'

export const REQUEST_PENDING_FROM_PERSON = 'REQUEST_PENDING_FROM_PERSON'
export const REQUEST_PENDING_FROM_FRIEND = 'REQUEST_PENDING_FROM_FRIEND'
export const ALREADY_FRIENDS = 'ALREADY_FRIENDS'
export const NO_FRIEND_RELATION = 'NO_FRIEND_RELATION'

export function ParseFriendshipStatus(dto: FriendshipModel) {
    const personId = StorageUtil.get('SESSION', 'personId')

    if (dto.confirmed) {
        return ALREADY_FRIENDS
    }

    if (dto.person.id == personId) {
        return REQUEST_PENDING_FROM_PERSON
    }

    if (dto.friend.id == personId) {
        return REQUEST_PENDING_FROM_FRIEND
    }

    return NO_FRIEND_RELATION
}
