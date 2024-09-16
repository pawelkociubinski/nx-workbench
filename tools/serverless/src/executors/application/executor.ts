import { PromiseExecutor } from '@nx/devkit';
import { ApplicationExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<ApplicationExecutorSchema> = async (
  options
) => {
  console.log('Executor ran for Application', options);
  return {
    success: true,
  };
};

export default runExecutor;
