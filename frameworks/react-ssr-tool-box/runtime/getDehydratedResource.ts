import { IOCContainer } from "@/frameworks/react-ssr-tool-box/runtime/cores/IOCContainer";
import { DehydrationResourceManagement } from "@/frameworks/react-ssr-tool-box/runtime/services/DehydrationResourceManagement";

import type { DehydrationCompileAssetsListQueryResult } from "@/frameworks/react-ssr-tool-box/runtime/services/DehydrationResourceManagement";


/**
 * 获取脱水物料资源的入口函数
 * **/
export async function getDehydratedResource(alias: string): Promise<DehydrationCompileAssetsListQueryResult> {
  const $DehydrationResourceManagement = IOCContainer.get(DehydrationResourceManagement);
  const compileAssetsInfo = await $DehydrationResourceManagement.getResourceListByAlias(alias);
  if (!compileAssetsInfo) {
    return false;
  }
  return compileAssetsInfo;
};