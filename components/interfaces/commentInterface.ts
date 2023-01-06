
export interface UserInterface {
    _id: string,
    login: string,
    avatar: string | null,
}

export interface ratingInterface {
    ratingUserId: string,
    rate: 'upvote' | 'downvote'
}

export interface commentInterface {
    user: UserInterface | null,
    _id: string,
    createdOn: string,
    content: string,
    rated: ratingInterface[],
    parentId: string | null,
    replyingTo: string | null,
}