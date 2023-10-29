
const Navbar = () => {
  return (
    <header className="bg-blue-500 shadow p-4">
      <nav className="mx-auto max-w-6xl">
        <h1 className="font-bold text-white tracking-wider">Contact Manager</h1>
        <p className="max-w-6xl mx-auto text-xs mt-2 font-medium text-gray-600 bg-white rounded p-2">
        <b className="text-red-500">Note:</b> My backend API is hosted on a
        shared server that automatically enters a sleep mode after 15 minutes of
        inactivity. When the server is in this sleep mode, it may take a few
        moments to restart when it receives a new request. If you experience a
        delay in response, please allow 2-3 minutes for the server to fully
        restart. We appreciate your patience and understanding. Thank you.
      </p>
      </nav>
    </header>
  )
}

export default Navbar