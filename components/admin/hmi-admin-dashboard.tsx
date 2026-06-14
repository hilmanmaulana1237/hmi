import Link from "next/link";
import { cmsModules, roleGuides } from "./admin-control-data";

export function HmiAdminDashboard() {
  return (
    <section className="hmi-admin-dashboard">
      <div className="hmi-admin-hero">
        <div>
          <p className="hmi-admin-eyebrow">Rumah Digital HMI Saintek</p>
          <h1>Dashboard Pengurus</h1>
          <p>
            Kelola konten website, pendaftaran LK-I, database kader, dokumen,
            advokasi, galeri, user, dan role dari satu admin panel.
          </p>
        </div>
        <div className="hmi-admin-hero-actions">
          <Link href="/admin/control-center">Control Center</Link>
          <Link href="/admin/collections/news/create">Tambah Berita</Link>
          <Link href="/admin/collections/lk1-registrations">Cek LK-I</Link>
        </div>
      </div>

      <div className="hmi-admin-modules">
        {cmsModules.map((module) => (
          <article key={module.title} className="hmi-admin-card">
            <div className="hmi-admin-card-head">
              <div>
                <p className="hmi-admin-eyebrow">{module.title}</p>
                <h2>{module.description}</h2>
              </div>
            </div>
            <div className="hmi-admin-links">
              {module.items.map((item) => (
                <div key={item.slug} className="hmi-admin-link-row">
                  <div>
                    <strong>{item.label}</strong>
                    <span>{item.action}</span>
                  </div>
                  <div className="hmi-admin-row-actions">
                    <Link href={`/admin/collections/${item.slug}`}>Kelola</Link>
                    <Link href={`/admin/collections/${item.slug}/create`}>
                      Tambah
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="hmi-admin-guide">
        <div>
          <p className="hmi-admin-eyebrow">Role Admin</p>
          <h2>Pembagian akses pengurus</h2>
        </div>
        <ul>
          {roleGuides.map((guide) => (
            <li key={guide}>{guide}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
