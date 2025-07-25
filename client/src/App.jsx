import { useEffect, useState } from "react";
import Category from "./components/Category"
import CreateCategory from "./components/CreateCategory";
import './styles/styles.css'
import {fetch_data} from './data/data'

function App() {
  const [categories, set_categories] = useState([]);
  useEffect(() => {
    const fn = async () => {
    set_categories(await fetch_data())
    }
    fn()
  },
    [])

  return (
    <>
      <h1>Home page</h1>
      <ul>
        {categories.map(category => <Category key={category.id} category={category} set_categories={set_categories} />)}
      </ul>
      <CreateCategory />
    </>
  )
}

export default App
