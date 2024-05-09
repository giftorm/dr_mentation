import Link from 'next/link';

const Header = () => {
  return (
    <header className="bg-gray-800 text-white flex justify-between items-center p-4">
      <h1 className="text-xl font-semibold">
        <Link href="/" className="hover:text-gray-300">
          MyApp
        </Link>
      </h1>
      <nav>
        <ul className="flex items-center space-x-4">
          <li>
            <Link href="/documents" className="hover:text-gray-300">
              Documents
            </Link>
          </li>
          {/* Additional nav items can be added here */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

