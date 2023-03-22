/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_REQUEST_TIMEOUT: number
  readonly VITE_REQUEST_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
