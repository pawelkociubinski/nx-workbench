import type { Config } from '@jest/types';
import {
  CreateNodesContext,
  createNodesFromFiles,
  CreateNodesV2,
  getPackageManagerCommand,
  joinPathFragments,
  normalizePath,
  NxJsonConfiguration,
  ProjectConfiguration,
  readJsonFile,
  TargetConfiguration,
  writeJsonFile,
} from '@nx/devkit';
import { calculateHashForCreateNodes } from '@nx/devkit/src/utils/calculate-hash-for-create-nodes';
import {
  clearRequireCache,
  loadConfigFile,
} from '@nx/devkit/src/utils/config-utils';
import { getNamedInputs } from '@nx/devkit/src/utils/get-named-inputs';
import { existsSync, readdirSync, readFileSync } from 'fs';
import { minimatch } from 'minimatch';
import { hashObject } from 'nx/src/devkit-internals';
import { getGlobPatternsFromPackageManagerWorkspaces } from 'nx/src/plugins/package-json';
import { workspaceDataDirectory } from 'nx/src/utils/cache-directory';
import { combineGlobPatterns } from 'nx/src/utils/globs';
import { dirname, isAbsolute, join, relative, resolve } from 'path';

export interface ServerlessPluginOptions {
  targetName?: string;
  ciTargetName?: string;
}

type ServerlessTargets = Pick<ProjectConfiguration, 'targets' | 'metadata'>;

function readTargetsCache(
  cachePath: string,
): Record<string, ServerlessTargets> {
  return existsSync(cachePath) ? readJsonFile(cachePath) : {};
}

function writeTargetsToCache(
  cachePath: string,
  results: Record<string, ServerlessTargets>,
) {
  writeJsonFile(cachePath, results);
}

export const createNodesV2: CreateNodesV2<ServerlessPluginOptions> = [
  '**/project.json',
  async (projectConfigurationFile, options, context) => {
    const optionsHash = hashObject(options);
    const cachePath = join(
      workspaceDataDirectory,
      `serverless-${optionsHash}.hash`,
    );
    const targetsCache = readTargetsCache(cachePath);

    try {
      return await createNodesFromFiles(
        (configFile, options, context) => {
          return createNodesInternal(
            configFile,
            options,
            context,
            targetsCache,
          );
        },
        projectConfigurationFile,
        options,
        context,
      );
    } finally {
      writeTargetsToCache(cachePath, targetsCache);
    }
  },
];

async function createNodesInternal(
  configFilePath: string,
  options: ServerlessPluginOptions,
  context: CreateNodesContext,
  targetsCache: Record<string, PlaywrightTargets>,
) {
  const projectRoot = dirname(configFilePath);
  const normalizedOptions = normalizeOptions(options);

  const hash = await calculateHashForCreateNodes(
    projectRoot,
    options,
    context,
    [getLockFileName(detectPackageManager(context.workspaceRoot))],
  );

  targetsCache[hash] ??= await buildPlaywrightTargets(
    configFilePath,
    projectRoot,
    normalizedOptions,
    context,
  );
  const { targets, metadata } = targetsCache[hash];

  return {
    projects: {
      [projectRoot]: {
        root: projectRoot,
        targets,
        metadata,
      },
    },
  };
}
