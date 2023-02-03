export function createMessage(
    content: string, 
    userId: string, 
    section: string, 
    parentId: string | undefined,
    replyingTo: string | undefined
) {
    content = trimReplyingTo(content, replyingTo)
    return {
        user: userId,
        content,
        createdOn: new Date().toISOString(),
        section,
        parentId,
        replyingTo,
    }
}



function trimReplyingTo(text: string, replyingTo:string | undefined) {
    if(!replyingTo) return text
    const regex = new RegExp(`@${replyingTo}`,'i')
    if(!regex.test(text)) return text
    return text.replace(regex,'')
}