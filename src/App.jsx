import Gallery from "@/components/gallery"

function App() {
  return (
    <div className="**:focus:outline-primary/60! mx-auto max-w-7xl p-4 outline-transparent!">
      <header className="border-border bg-background/90 sticky top-4 flex w-full flex-wrap items-center justify-between rounded-md border px-4 py-3 backdrop-blur">
        <div>
          <h1 className="text-lg font-medium">Photo Gallery</h1>
          <p className="text-xs">assignment by Tuhin Das</p>
        </div>
        <a
          href="https://github.com/tuhindas56/celebrare-internship-assignment"
          target="_blank"
          className="text-sm text-blue-500 hover:underline"
        >
          Github
        </a>
      </header>
      <main className="mt-8 flex w-full flex-col gap-8">
        <Gallery />
      </main>
    </div>
  )
}

export default App
