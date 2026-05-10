export default function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-center gap-1 text-sm text-gray-500 dark:text-gray-400">
        <span>Built by</span>
        <a
          href="https://mohossam.netlify.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
        >
          Mohamed Hossam
        </a>
        <span className="hidden sm:inline">&</span>
        <span className="sm:hidden">&amp;</span>
        <a
          href="https://www.linkedin.com/in/mrwan-islam-77ba27380/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary-600 dark:text-primary-400 hover:underline"
        >
          Marwan Islam
        </a>
      </div>
    </footer>
  );
}
