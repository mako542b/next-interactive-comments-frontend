export interface MessageBody {
    user: string | undefined;
    content: string | undefined;
    createdOn: string;
    section: string | string[] | undefined;
    parentId: string | undefined;
    replyingTo: string | undefined;
}