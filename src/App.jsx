import Gallery from "@/components/gallery"

function App() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-8 p-4">
      <header className="border-border flex w-full flex-wrap items-center justify-between rounded-md border px-4 py-3">
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
    </div>
  )
}

export default App
