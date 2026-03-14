function ErrorMessage({ message }) {
  return (
    <div className="inline-grid h-80 place-content-center">
      <p className="overflow-hidden text-center text-ellipsis">{message}</p>
    </div>
  )
}

export default ErrorMessage
