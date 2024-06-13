const Pagination = ({ totalPages, currentPage, setCurrentPage }: any) => {  
  return (
    <>
      {
        totalPages > 1 && (
          <div className="pagination justify-content-center">
            <ul className="pagination">
              <li className={`${((currentPage !== totalPages) ? 'page-item disabled' : 'page-item')}`}>
                <button
                  className={`${((currentPage !== totalPages) ? 'btn btn-outline-light' : 'btn btn-outline-dark')}`}
                  style={{color: 'inherit'}}
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
                      key={idx + 1}
                      className={`${((currentPage === (idx + 1)) ? 'btn btn-dark' : 'btn btn-outline-dark')}`}
                      style={{color: `${((currentPage === (idx + 1)) ? '#fff' : 'inherit')}`}}
                      onClick={() => {
                        setCurrentPage(idx + 1);
                      }}
                    >
                      {idx + 1}
                    </button>
                  </li>
                ))
              }
              <li className={`${((currentPage === totalPages) ? 'page-item disabled' : 'page-item')}`}>
                <button
                  className={`${((currentPage === totalPages) ? 'btn btn-outline-light' : 'btn btn-outline-dark')}`}
                  style={{color: 'inherit'}}
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