import { useEffect, useMemo, useReducer, useState } from "react"
import useFetchPhotos from "@/hooks/useFetchPhotos"
import ErrorMessage from "./error-message"
import { Image, ImageSkeleton } from "./image"
import Search from "./search"

const favouritesLocalStoragekey = "favourites"

const favouritesActions = {
  toggle: "toggle"
}

function favourtiesReducer(state, action) {
  switch (action.type) {
    case favouritesActions.toggle: {
      const next = new Set(state)

      if (next.has(action.id)) {
        next.delete(action.id)
      } else {
        next.add(action.id)
      }

      return next
    }

    default: {
      return state
    }
  }
}

function Gallery() {
  const { loading, error, photos } = useFetchPhotos()

  const [search, setSearch] = useState("")
  const [favourites, dispatch] = useReducer(favourtiesReducer, null, () => {
    try {
      const persisted = localStorage.getItem(favouritesLocalStoragekey)
      const value = persisted ? JSON.parse(persisted) : []

      return new Set(value)
    } catch (err) {
      console.error(err)
      return new Set()
    }
  })

  const filteredPhotos = useMemo(() => {
    return search.length > 0
      ? photos.filter((photo) =>
          photo?.author?.toLowerCase()?.includes(search.toLowerCase())
        )
      : photos
  }, [photos, search])

  useEffect(() => {
    const timeout = setTimeout(
      () =>
        localStorage.setItem(
          favouritesLocalStoragekey,
          JSON.stringify([...favourites])
        ),
      200
    )

    return () => {
      clearTimeout(timeout)
    }
  }, [favourites])

  if (error) {
    return <ErrorMessage message={error} />
  }

  console.log(loading)

  return (
    <>
      <Search value={search} onChange={setSearch} disabled={loading} />

      {loading && (
        <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 xl:grid-cols-4">
          {Array.from({ length: 8 }, (_, index) => {
            return <ImageSkeleton key={index} />
          })}
        </div>
      )}

      {!loading && (
        <div className="grid grid-cols-1 justify-center gap-4 md:grid-cols-2 xl:grid-cols-4">
          {filteredPhotos.map((photo) => {
            return (
              <Image
                key={photo.id}
                photo={photo}
                onFavourite={() => {
                  dispatch({
                    type: favouritesActions.toggle,
                    id: photo.id
                  })
                }}
                isFavourited={favourites.has(photo.id)}
              />
            )
          })}
        </div>
      )}

      {!loading &&
        filteredPhotos.length === 0 &&
        (search.length > 0 ? (
          <ErrorMessage
            message={`There are no photos shot by ${search || "this author"}`}
          />
        ) : (
          <ErrorMessage message="No photos were found" />
        ))}
    </>
  )
}

export default Gallery
