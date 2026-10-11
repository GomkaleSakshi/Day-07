import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="container">
      <div className="error-state">
        <h2>Page not found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link href="/employees" className="primary-btn">
          Back to employees
        </Link>
      </div>
    </main>
  );
}
