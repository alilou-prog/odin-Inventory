import { useEffect, useState } from "react";
import Category from "./components/Category"
import './styles/styles.css'

function App() {
  const [categories, set_categories] = useState([]);
  useEffect(() => {
    const feth_data = async () => {
      const res = await fetch("/api/categories");
      if(!res.ok) {
        console.error("Failed to fetch data");
        return;
      }
      set_categories(await res.json())
    }
    feth_data()
  },
  [])

return (
  <>
    <h1>Home page</h1>
    <ul>
      {categories.map(category => <Category key={category.id}  category={category} set_categories={set_categories}/>)}
    </ul>
  </>
)
}

export default App
