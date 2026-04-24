import fs from "fs";
import path from "path";
import { promisify } from "util";

import { computedPublicPathWithRuntime } from "@/frameworks/react-ssr-tool-box/compilation/utils/computedPublicPathWithRuntime";

import type { MaterielCompilationInfoType } from "@/frameworks/react-ssr-tool-box/compilation/commons/CompilationConfigManager";

export async function dehydrationEntryFilePreset(materielPairs: [alias: string, detail: MaterielCompilationInfoType][]) {
  const hydrationTemplateFileContent = await promisify(fs.readFile)(path.resolve(__dirname, "../templates/dehydration.entry.template"), "utf-8");
  /** 基于alias生成新的入口文件内容 **/
  const virtualFileVolumePairs = await Promise.all(materielPairs.map(async ([alias, materielDetailInfo]) => {
    const virtualEntryModuleName = `./${alias}.entry.tsx`;
    const virtualEntryModuleContent = hydrationTemplateFileContent
      .replace("$$sourceCodeFilePath$$", materielDetailInfo.source)
      .replace("$$webpackPublicPathWithRuntime$$", computedPublicPathWithRuntime(materielDetailInfo));
    return [virtualEntryModuleName, virtualEntryModuleContent];
  }));
  return virtualFileVolumePairs;
};