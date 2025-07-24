const fetch_data = async () => {
  const res = await fetch("/api/categories");
  if (!res.ok) {
    console.error("Failed to fetch data");
    return;
  }
  return await res.json()
}


export {fetch_data}