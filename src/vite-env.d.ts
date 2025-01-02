/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_AAS: string;
  readonly VITE_APP_SYSTEMREPORTS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
