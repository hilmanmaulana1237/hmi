import type { ReactNode } from "react";
import config from "@payload-config";
import { RootLayout } from "@payloadcms/next/layouts";
import { hydrationAttributeCleanupScript } from "@/lib/hydration-cleanup";
import { importMap } from "./admin/importMap.js";
import { serverFunction } from "./serverAction";
import "@payloadcms/next/css";
import "./custom.scss";

type Args = {
  children: ReactNode;
};

export { metadata } from "@payloadcms/next/layouts";

const Layout = ({ children }: Args) => (
  <RootLayout config={config} importMap={importMap} serverFunction={serverFunction}>
    <script
      id="payload-hydration-attribute-cleanup"
      dangerouslySetInnerHTML={{ __html: hydrationAttributeCleanupScript }}
    />
    {children}
  </RootLayout>
)

export default Layout;
