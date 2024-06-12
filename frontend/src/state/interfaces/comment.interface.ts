import Error from "../../interfaces/error.interface";
import IComment, { ICommentCreate, initIComment } from "../../interfaces/comment.interface";


export interface IUseCommentStore {
  comment: IComment;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  fetchComment: (commentId: string | undefined) => void;
  handleEditCommentSaveClick: (id: string | undefined, data: any) => void;
  handleNewCommentSaveClick: (id: string, data: ICommentCreate) => void;
}

export const initialCommentStoreState = {
  comment: initIComment,
  loading: false,
  alertMessage: '',
  errorMessage: '',
}