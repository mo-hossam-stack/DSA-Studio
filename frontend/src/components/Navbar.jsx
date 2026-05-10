import { Link, useLocation } from 'react-router-dom';
import { algorithmList } from '../data/algorithmsMetadata';

export default function Navbar({ darkMode, toggleDarkMode }) {
  const location = useLocation();
  const currentSlug = location.pathname.replace('/', '');

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <span className="text-lg font-bold text-gray-900 dark:text-white hidden sm:block">
              DSA Visualizer
            </span>
          </Link>

          {/* Algorithm Selector (mobile dropdown, desktop tabs) */}
          <nav className="flex-1 flex items-center justify-center px-4">
            <div className="hidden md:flex items-center gap-1 overflow-x-auto">
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 mr-2 uppercase tracking-wider">
                Sort:
              </span>
              {algorithmList.filter(a => a.type === 'sorting').map((algo) => (
                <Link
                  key={algo.slug}
                  to={`/${algo.slug}`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                    ${currentSlug === algo.slug
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  {algo.name}
                </Link>
              ))}
              <span className="text-xs font-medium text-gray-400 dark:text-gray-500 mx-2 uppercase tracking-wider">
                Search:
              </span>
              {algorithmList.filter(a => a.type === 'searching').map((algo) => (
                <Link
                  key={algo.slug}
                  to={`/${algo.slug}`}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all whitespace-nowrap
                    ${currentSlug === algo.slug
                      ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300'
                      : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  {algo.name}
                </Link>
              ))}
            </div>
          </nav>

          {/* Right section */}
          <div className="flex items-center gap-2">
            {/* Mobile algo selector */}
            <label htmlFor="mobile-algo-select" className="sr-only">Select algorithm</label>
            <select
              id="mobile-algo-select"
              className="md:hidden select-field text-sm py-1.5 px-2 max-w-[140px]"
              value={currentSlug}
              onChange={(e) => {
                window.location.href = `/${e.target.value}`;
              }}
              aria-label="Select algorithm"
            >
              <option value="selection-sort">Selection Sort</option>
              <option value="insertion-sort">Insertion Sort</option>
              <option value="merge-sort">Merge Sort</option>
              <option value="quick-sort">Quick Sort</option>
              <option value="linear-search">Linear Search</option>
              <option value="binary-search">Binary Search</option>
            </select>

            {/* Dark mode toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
              aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {darkMode ? (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
