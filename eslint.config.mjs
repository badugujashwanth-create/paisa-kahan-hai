import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "node:path";
import { fileURLToPath } from "node:url";

const currentFilename = fileURLToPath(import.meta.url);
const currentDirectory = dirname(currentFilename);
const compatibilityConfig = new FlatCompat({ baseDirectory: currentDirectory });

const eslintConfig = [
  ...compatibilityConfig.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [".next/**", "next-env.d.ts", "node_modules/**", "out/**"],
  },
];

export default eslintConfig;
