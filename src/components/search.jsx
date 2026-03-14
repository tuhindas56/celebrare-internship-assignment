import { useCallback, useEffect, useState } from "react"

function Search({ value, onChange, disabled }) {
  const [search, setSearch] = useState("")

  const onSearchChange = useCallback((e) => {
    setSearch(e.target.value)
  }, [])

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (search !== value) {
        onChange(search)
      }
    }, 300)

    return () => {
      clearTimeout(timeout)
    }
  }, [search, value, onChange])

  return (
    <input
      value={search}
      onChange={onSearchChange}
      className="border-border w-full border px-4 py-3 text-sm disabled:bg-zinc-50"
      placeholder="Search by author"
      disabled={disabled}
    />
  )
}

export default Search
