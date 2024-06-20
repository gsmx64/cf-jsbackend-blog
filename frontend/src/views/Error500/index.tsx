import { Link } from "react-router-dom";


const Error500View = () => {

  return (
    <>
      <section className="py-3 py-md-5 min-vh-99 d-flex justify-content-center align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h2 className="d-flex justify-content-center align-items-center gap-2 mb-4">
                  <span className="display-1 fw-bold">ERROR 500</span>
                </h2>
                <h3 className="h2 mb-2">Internal server error!</h3>
                <p>The server encountered an unexpected condition that prevented it from fulfilling the request.</p>
                <p className="mb-5">This error is usually returned by the server when no other error code is suitable.</p>
                <Link to={"/"} className="btn bsb-btn-5xl btn-dark rounded-pill px-5 fs-6 m-0">
                  <span className="ms-2">Try back to Home</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Error500View;