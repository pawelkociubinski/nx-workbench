import { PromiseExecutor } from '@nx/devkit';
import { ServerlessExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<ServerlessExecutorSchema> = async (
  options,
) => {
  console.log('Executor ran for Serverless', options);
  return {
    success: true,
  };
};

export default runExecutor;
