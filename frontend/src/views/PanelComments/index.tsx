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
import useCommentsStore from "../../state/stores/comments";
import { isZustandEnabled } from "../../constants/defaultConstants";


const PanelCommentsViewDefault = () => {
  const [comments, setComments] = useState<ICommentArray>(initICommentArray);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(10);  
  const [loading, setLoading] = useState(false);
  const [alertMessage, setAlertMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

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

  return { comments, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, currentUser, setCurrentPage,
    handleDeleteComment }
}

const PanelCommentsViewZustand = () => {
  const comments = useCommentsStore((state) => state.comments);
  const currentPage = useCommentsStore((state) => state.currentPage);
  const totalPages = useCommentsStore((state) => state.totalPages);
  const totalItems = useCommentsStore((state) => state.totalItems);
  const itemsPerPage = useCommentsStore((state) => state.itemsPerPage);
  const loading = useCommentsStore((state) => state.loading);
  const alertMessage = useCommentsStore((state) => state.alertMessage);
  const errorMessage = useCommentsStore((state) => state.errorMessage);
  const setCurrentPage = useCommentsStore((state) => state.setCurrentPage);
  const fetchComments = useCommentsStore((state) => state.fetchComments);
  const handleDeleteComment = useCommentsStore((state) => state.handleDeleteComment);
  const [currentUser, setCurrentUser] = useState<AuthResponse>(AuthService.getCurrentUser());

  useEffect(() => {
    setCurrentUser(AuthService.getCurrentUser());
    fetchComments(currentPage, itemsPerPage);
  }, [currentPage, itemsPerPage]);

  return { comments, currentPage, totalPages, totalItems, itemsPerPage, loading,
    alertMessage, errorMessage, currentUser, setCurrentPage,
    handleDeleteComment }
}

const PanelCommentsView = () => {
  const { comments, currentPage, totalPages, totalItems, itemsPerPage,
    loading, alertMessage, errorMessage, currentUser, setCurrentPage,
    handleDeleteComment
  } = (isZustandEnabled) ? PanelCommentsViewZustand() : PanelCommentsViewDefault();

  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();

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