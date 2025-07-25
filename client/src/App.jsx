import { useEffect, useState } from "react";
import Category from "./components/Category"
import CreateCategory from "./components/CreateCategory";
import './styles/styles.css'
import {fetch_data} from './data/data'

function App() {
  const [categories, set_categories] = useState([])
  const [refresh_categories, set_refresh_categories] = useState(false);
  useEffect(() => {
    const fn = async () => {
    set_categories(await fetch_data())
    set_refresh_categories(false)
    }
    fn()
  },
    [refresh_categories])

  return (
    <>
      <h1>Home page</h1>
      <ul>
        {categories.map(category => <Category key={category.id} category={category} set_refresh_categories={set_refresh_categories} />)}
      </ul>
      <CreateCategory set_refresh_categories={set_refresh_categories}/>
    </>
  )
}

export default App
