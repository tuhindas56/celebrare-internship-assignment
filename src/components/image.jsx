import { useState } from "react"

export function ImageSkeleton() {
  return (
    <div className="border-border h-max animate-pulse overflow-hidden rounded-sm border transition duration-100">
      <div className="bg-placeholder grid h-50 animate-pulse place-content-center select-none" />

      <div className="flex items-center justify-between gap-2 px-4 py-2">
        <div className="bg-placeholder h-4 w-1/2" />
        <div className="bg-placeholder h-8 w-8 rounded-full" />
      </div>
    </div>
  )
}

export function Image({
  photo = {},
  onFavourite = () => {},
  isFavourited = false
}) {
  const [loadingFailure, setLoadingFailure] = useState(false)

  return (
    <div className="border-border h-max overflow-hidden rounded-sm border transition duration-100">
      {!loadingFailure && (
        <img
          src={`${photo.url}/download?force=true&w=800`}
          className="bg-placeholder h-50 w-full object-cover"
          loading="lazy"
          alt={`a photo shot by ${photo.author}`}
          onError={() => setLoadingFailure(true)}
        />
      )}

      {loadingFailure && (
        <div className="bg-placeholder grid h-50 place-content-center select-none">
          <p className="text-sm">Failed to load image</p>
        </div>
      )}

      <div className="flex items-center justify-between gap-2 px-4 py-2">
        <h2 className="text-sm font-medium">{photo.author}</h2>
        <button
          onClick={onFavourite}
          className={`hover:bg-primary/5 hover:text-primary/80 bg-placeholder/30 text-foreground/30 grid h-8 w-8 cursor-pointer place-content-center rounded-full text-xl transition duration-100 ${isFavourited ? "bg-primary/10! text-primary! " : ""}`}
          aria-label={
            isFavourited ? "unmark as favourite" : "mark as favourite"
          }
        >
          &hearts;
        </button>
      </div>
    </div>
  )
}
