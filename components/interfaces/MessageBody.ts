export interface MessageBody {
    user: string | undefined;
    content: string | undefined;
    createdOn: string;
    section: string | string[] | undefined;
    parentId: string | null;
    replyingTo: string | undefined;
}