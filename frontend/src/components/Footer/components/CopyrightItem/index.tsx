import { memo } from "react";

const CopyrightItem = ({ year, brand }: any) => {  
  return (
    <>
      <div className="navbar-nav ms-auto text-light">
        © {year} {brand}
      </div>
    </>
  );
};

export default memo(CopyrightItem);