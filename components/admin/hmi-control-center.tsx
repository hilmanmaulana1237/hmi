import { DefaultTemplate, type DefaultTemplateProps } from "@payloadcms/next/templates";
import Link from "next/link";
import {
  cmsModules,
  criticalWorkflows,
  roleGuides,
} from "./admin-control-data";

type HmiControlCenterProps = Record<string, unknown> & {
  initPageResult?: {
    visibleEntities?: DefaultTemplateProps["visibleEntities"];
  };
};

const fallbackVisibleEntities = {
  collections: [],
  globals: [],
} as DefaultTemplateProps["visibleEntities"];

export function HmiControlCenter(props: HmiControlCenterProps) {
  const visibleEntities =
    props.initPageResult?.visibleEntities ?? fallbackVisibleEntities;
  const templateProps = props as unknown as Omit<
    DefaultTemplateProps,
    "children" | "visibleEntities"
  >;
  const totalControls = cmsModules.reduce(
    (total, module) => total + module.items.length,
    0,
  );

  return (
    <DefaultTemplate {...templateProps} visibleEntities={visibleEntities}>
      <main className="hmi-control-center">
        <section className="hmi-control-hero">
          <div>
            <p className="hmi-admin-eyebrow">Control Center</p>
            <h1>Panel Kendali CMS Lengkap</h1>
            <p>
              Semua konten dan layanan Rumah Digital HMI Saintek bisa dikelola
              dari sini: tambah, edit, publish, arsip, verifikasi, dan tindak
              lanjut.
            </p>
          </div>
          <div className="hmi-control-stats">
            <strong>{cmsModules.length}</strong>
            <span>Modul</span>
            <strong>{totalControls}</strong>
            <span>Kontrol CMS</span>
          </div>
        </section>

        <section className="hmi-control-grid">
          {cmsModules.map((module) => (
            <article key={module.title} className="hmi-control-module">
              <div className="hmi-control-module-head">
                <div>
                  <p className="hmi-admin-eyebrow">{module.title}</p>
                  <h2>{module.description}</h2>
                </div>
                <span>{module.owner}</span>
              </div>
              <div className="hmi-control-table">
                {module.items.map((item) => (
                  <div key={item.slug} className="hmi-control-row">
                    <div>
                      <strong>{item.label}</strong>
                      <p>{item.action}</p>
                      <small>Terkait: {item.publicPath}</small>
                    </div>
                    <div className="hmi-admin-row-actions">
                      <Link href={`/admin/collections/${item.slug}`}>
                        Kelola
                      </Link>
                      <Link href={`/admin/collections/${item.slug}/create`}>
                        Tambah
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="hmi-control-two-col">
          <article className="hmi-admin-card">
            <p className="hmi-admin-eyebrow">Workflow Kritis</p>
            <h2>Alur kerja yang harus bisa dilakukan admin</h2>
            <div className="hmi-control-workflows">
              {criticalWorkflows.map((workflow) => (
                <div key={workflow.title}>
                  <strong>{workflow.title}</strong>
                  <span>{workflow.steps}</span>
                </div>
              ))}
            </div>
          </article>

          <article className="hmi-admin-card">
            <p className="hmi-admin-eyebrow">Role Matrix</p>
            <h2>Pembagian akses pengurus</h2>
            <ul className="hmi-control-role-list">
              {roleGuides.map((guide) => (
                <li key={guide}>{guide}</li>
              ))}
            </ul>
          </article>
        </section>
      </main>
    </DefaultTemplate>
  );
}
