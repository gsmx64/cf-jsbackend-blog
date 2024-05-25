const SocialMediaLinksItem = ({ facebook, instagram,
  twitterx, linkedin, youtube, tiktok }: any) => {
  return (
    <>
      <div className="navbar-nav me-auto">
        <div className="card-body">
        {
            (facebook) && (
              <a
                href={facebook}
                target="_blank"
                className="d-inline-block bg-dark link-light lh-1 p-2 rounded"
              >
                <i className="bi bi-facebook"></i>
              </a>
            )
          }
          {
            (instagram) && (
              <a
                href={instagram}
                target="_blank"
                className="d-inline-block bg-dark link-light lh-1 p-2 rounded"
              >
                <i className="bi bi-instagram"></i>
              </a>
            )
          }
          {
            (twitterx) && (
              <a
                href={twitterx}
                target="_blank"
                className="d-inline-block bg-dark link-light lh-1 p-2 rounded"
              >
                <i className="bi bi-twitter-x"></i>
              </a>
            )
          }
          {
            (linkedin) && (
              <a
                href={linkedin}
                target="_blank"
                className="d-inline-block bg-dark link-light lh-1 p-2 rounded"
              >
                <i className="bi bi-linkedin"></i>
              </a>
            )
          }
          {
            (youtube) && (
              <a
                href={youtube}
                target="_blank"
                className="d-inline-block bg-dark link-light lh-1 p-2 rounded"
              >
                <i className="bi bi-youtube"></i>
              </a>
            )
          }
          {
            (tiktok) && (
              <a
                href={tiktok}
                target="_blank"
                className="d-inline-block bg-dark link-light lh-1 p-2 rounded"
              >
                <i className="bi bi-tiktok"></i>
              </a>
            )
          }
        </div>
      </div>
    </>
  );
};

export default SocialMediaLinksItem;