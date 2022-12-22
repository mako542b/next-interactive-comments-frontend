export interface commentInterface {
    id: string,
    img: string,
    author: string,
    updated: string,
    content: string,
    score: number,
    parentId: string | null,
    responses: commentInterface[] | null,
}