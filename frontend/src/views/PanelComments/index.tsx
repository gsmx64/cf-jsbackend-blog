import { useState, useEffect, useRef } from "react";

import { AxiosResponse } from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "../../components/Navbar";
import PanelComments from "../../components/PanelComments";
import Footer from "../../components/Footer";
import AuthService from "../../services/auth.service";
import CommentsService from "../../services/comments.service";
import { AuthResponse } from "../../interfaces/auth.interface";
import { ICommentArray, initICommentArray } from "../../interfaces/comment.interface";


/*
// Implementation of Zustand with Axios
import useCommentsStore from "../../state/comments.store";

interface Error {
  err: unknown;
  isError: boolean;
  error?: Error;
  stack?: Error;
  message: string;
  toString(): string;
}

interface IUseCommentsStore {
  commentsData: IComment;
  commentsIsLoading: boolean;
  commentsError: Error | null | unknown;
  fetchComments: (query: string | null) => void;
}
*/
const PanelCommentsView = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [comments, setComments] = useState<ICommentArray>(initICommentArray);
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());
  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();
  
  useEffect(() => {
    fetchComments(currentPage, itemsPerPage);
    setCurrentUser(AuthService.getCurrentUser());
  }, [currentPage, itemsPerPage]);

  const fetchComments = (currentPage: number, itemsPerPage: number) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return CommentsService
    .getAll(currentPage, itemsPerPage)
    .then((response: AxiosResponse) => {
      setComments(response.data.data);
      setTotalPages(response.data.meta.totalPages);
      setTotalItems(response.data.meta.totalItems);
      setItemsPerPage(15);
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleDeleteComment = (id: string) => {
    setAlertMessage('');
    setErrorMessage('');
    setLoading(true);

    return CommentsService
    .remove(id)
    .then((response: AxiosResponse) => {
      if (response.data.affected === 1) {
        setAlertMessage(`Deleted comment with id: ${id}.`);
      } else {  
        setErrorMessage(`Error deleting comment with id: ${id}. Comment not found.`);
      }
    })
    .catch((error: any) => {
      setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
    })
    .finally(() => {
      setLoading(false);
    });
  }

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term.toLowerCase());
  }

  return (
    <>
      <Navbar
        onSearch={handleNavbarSearch}
        ref={containerRef}
      />
      <div className="container">
        <PanelComments
          data={comments}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalItems={totalItems}
          itemsPerPage={itemsPerPage}
          alertMessage={alertMessage}
          errorMessage={errorMessage}
          loading={loading}
          searchTerm={searchTerm}
          onDeleteComment={handleDeleteComment}
          userRole={
            (currentUser?.user?.role != null) &&
            (currentUser.user.role)}
        />
      </div>
      <Footer />
    </>
  );
};

export default PanelCommentsView;