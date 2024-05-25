const CopyrightItem = ({ year, brand }: any) => {  
  return (
    <>
      <div className="navbar-nav ms-auto text-light">
        © {year} {brand}
      </div>
    </>
  );
};

export default CopyrightItem;