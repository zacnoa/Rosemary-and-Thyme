import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeEditor  from "./RecipeEditor";




function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ovo je ruta za tvoju glavnu stranicu za pisanje recepata */}
        <Route path="/" element={<RecipeEditor />} />
        {/* Ovo je ruta za prikaz liste recepata */}
        <Route path="/recipes/:id/" element={<RecipeEditor />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;