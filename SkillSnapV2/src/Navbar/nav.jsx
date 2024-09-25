import logo from "../assets/logo.png"

function Nav() {
    return (
        <div className="flex justify-end items-center sticky top-0 mt-5 z-50 bg-gray-800 bg-opacity-60 backdrop-blur-md border border-gray-700 p-4 shadow-lg">
            <div id="top" className="src\assets\logo.png">
                <div className="">
                    <img src={logo} alt="logo goes here" className="h-12" />
                </div>
                <nav className="navbar">
                    <ul className="nav-links flex space-x-8 text-lg">
                        <li><a href="./homePage.html" className="text-white hover:text-blue-500">Home</a></li>
                        <li><a href="./allUsers.html" className="text-white hover:text-blue-500">See All Users</a></li> 
                        {/* <li><a href="/form.html" className="text-white hover:text-blue-500">Edit Profile</a></li> */}
                        {/* <li><a href="./contact.html" className="text-white hover:text-blue-500">Contact Us</a></li> */}
                        <li> </li>
                    <div className="relative" >
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="px-4 py-2 rounded-full text-gray-800"
                        />
                        <button className="absolute right-0 top-0 mt-2 mr-4">
                            <svg
                                className="h-4 w-4 fill-current text-gray-800"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path d="M10 2a8 8 0 105.293 14.707l4.707 4.707 1.414-1.414-4.707-4.707A8 8 0 0010 2zm0 2a6 6 0 110 12 6 6 0 010-12z" />
                            </svg>
                        </button>
                    </div>
                    </ul>
                </nav>
            </div>
        </div>

    )
}
export default Nav;