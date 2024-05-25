const Pagination = ({ totalPages, currentPage, setCurrentPage }: any) => {  
  return (
    <>
      {
        totalPages > 1 && (
          <div className="pagination justify-content-center">
            <ul className="pagination">
              <li className={`page-item ${(currentPage !== totalPages ? ' disabled' : '')}`}>
                <button
                  className="page-link"
                  onClick={() => {
                    if (currentPage !== 1){
                      setCurrentPage(currentPage - 1);
                    }
                  }}
                >
                  &#8249;
                </button>
              </li>  
              {
                [...Array(totalPages)].map((_, idx) => (
                  <li key={`pagination-page-${idx}`} className={`page-item ${(currentPage === (idx + 1) ? ' active' : '')}`}>
                    <button
                      onClick={() => {
                        setCurrentPage(idx + 1);
                      }}
                      key={idx + 1}
                      className="page-link"
                    >
                      {idx + 1}
                    </button>
                  </li>
                ))
              }
              <li className={`page-item ${(currentPage === totalPages ? ' disabled' : '')}`}>
                <button
                  className="page-link"
                  onClick={() => {
                    if (currentPage !== totalPages){
                      setCurrentPage(currentPage + 1);
                    }
                  }}
                >
                  &#8250;
                </button>
              </li>
            </ul>
          </div>
        )
      }
    </>
  );
};

export default Pagination;