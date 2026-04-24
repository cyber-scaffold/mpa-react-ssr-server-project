import fs from "fs";
import path from "path";
import { promisify } from "util";

import { computedPublicPathWithRuntime } from "@/frameworks/react-ssr-tool-box/compilation/utils/computedPublicPathWithRuntime";

import type { MaterielPairsType, PresetPairsType } from "../public/types.d";

export async function hydrationEntryFilePreset(materielPairs: MaterielPairsType): Promise<PresetPairsType> {
  const hydrationTemplateFileContent = await promisify(fs.readFile)(path.resolve(__dirname, "../templates/hydration.entry.template"), "utf-8");;
  /** 基于alias生成新的入口文件内容 **/
  const virtualFileVolumePairs: PresetPairsType = await Promise.all(materielPairs.map(async ([alias, materielDetailInfo]) => {
    const virtualEntryModuleName = `./${alias}.entry.tsx`;
    const virtualEntryModuleContent = hydrationTemplateFileContent
      .replace("$$sourceCodeFilePath$$", materielDetailInfo.source)
      .replace("$$webpackPublicPathWithRuntime$$", computedPublicPathWithRuntime(materielDetailInfo));
    return [virtualEntryModuleName, virtualEntryModuleContent];
  }));
  return virtualFileVolumePairs;
};