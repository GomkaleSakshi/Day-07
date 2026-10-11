import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="container">
      <div className="card detail-card" style={{ textAlign: 'center', padding: '40px 24px' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Employee Management Dashboard</h1>
        <p style={{ maxWidth: '700px', margin: '0 auto 28px', color: '#475569', lineHeight: 1.6 }}>
          Track your team, review employee performance, and manage updates with a simple dashboard built for internship practice.
        </p>
        <div className="header-actions" style={{ justifyContent: 'center' }}>
          <Link href="/employees" className="primary-btn">
            Open Employee List
          </Link>
          <Link href="/employees/create" className="secondary-btn">
            Add Employee
          </Link>
        </div>
      </div>
    </main>
  );
}
