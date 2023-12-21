import React from "react";

const Navbar: React.FC<{}> = ()=> {
    return (
        <div>
            <p>Mi Blog</p>
            <input placeholder="Buscar en el blog" />
        </div>
    );
};

export default Navbar;