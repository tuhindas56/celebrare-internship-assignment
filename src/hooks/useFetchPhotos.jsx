import { useEffect, useState } from "react"

function useFetchPhotos() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [photos, setPhotos] = useState([])

  useEffect(() => {
    const aborter = new AbortController()

    async function fetchPhotos() {
      try {
        const response = await fetch(
          "https://picsum.photos/v2/list/?limit=30",
          {
            signal: aborter.signal
          }
        )

        if (!response.ok) {
          throw new Error("Failed to fetch photos.")
        }

        const data = await response.json()
        setPhotos(data)
      } catch (error) {
        if (!aborter.signal.aborted) {
          setError(
            "We're having trouble displaying the photos. Please try refreshing the page."
          )
          console.error(error)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPhotos()

    return () => {
      aborter.abort("Effect cleanup")
    }
  }, [])

  return {
    loading,
    error,
    photos
  }
}

export default useFetchPhotos
