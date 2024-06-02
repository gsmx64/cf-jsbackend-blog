import { useRef, useState } from "react";
import MyRoutes from "./routes";

import "./App.css";


function App() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const containerRef = useRef();

  const handleNavbarSearch = (term: any) => {
    setSearchTerm(term.toLowerCase());
  }

  return (
    <>
      {MyRoutes(searchTerm, setSearchTerm, handleNavbarSearch, containerRef)}
    </>
  )
}

export default App