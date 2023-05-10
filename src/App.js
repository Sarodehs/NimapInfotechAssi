import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import CategoryMaster from "./compoents/CategoryMaster";
import ProductMaster from "./compoents/ProductMaster";
import ProductMasters from "./compoents/ProductMasters";
import Navigation from "./compoents/Navigation"


function App() {
  return (
    <>
<Navigation/>
       <Router>
    <Routes>
    <Route path="/categories" element={<CategoryMaster/>} />
      <Route path="/" element={<ProductMaster/>} />
      <Route path="/productmasters" element={<ProductMasters/>} />
      
    </Routes>
  </Router>
    
    
    </>
  );
}

export default App;
