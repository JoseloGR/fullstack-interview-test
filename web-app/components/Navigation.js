import { useState } from "react";
import { useRouter } from 'next/router';

export default function Navigation() {
  const [activeMenu, setActiveMenu] = useState(false);
  const router = useRouter();

  const handleMenuClick = () => {
    setActiveMenu(!activeMenu);
  }

  return (
    <nav className="bg-white-800 shadow">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button onClick={handleMenuClick} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-900 hover:text-gray-600 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className={`${!activeMenu ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="gray">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg className={`${activeMenu ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="gray">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
            <div onClick={() => router.push('/')} className="flex-shrink-0 flex items-center">
              <span className="text-blueGray-700 text-xl brand-name">Git Flat</span>
            </div>
            <div className="flex-grow hidden sm:block sm:ml-6">
              <div className="flex justify-start">
              </div>
            </div>
          </div>
          <div className="absolute hidden sm:block inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            <button onClick={() => router.push('/pull-requests')} className="bg-transparent hover:bg-blueGray-800 text-blueGray font-semibold hover:text-white py-2 px-4 border border-blueGray-800 hover:border-transparent rounded-sm">
              Pull Requests
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      <div className={`${activeMenu ? '': 'hidden'} sm:hidden`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a onClick={() => router.push('/pull-requests')} href="#" className="text-gray-600 hover:bg-gray-100 block px-3 py-2 rounded-md font-medium">Pull Requests</a>
        </div>
      </div>
      <style jsx>{`
          .brand-name {
              font-family: 'Rajdhani', sans-serif;
          }
      `}
      </style>
    </nav>
  );
}