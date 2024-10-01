import { PromiseExecutor } from '@nx/devkit';
import { EventExecutorSchema } from './schema';

const runExecutor: PromiseExecutor<EventExecutorSchema> = async (options) => {
  console.log('Executor ran for Event', options);
  return {
    success: true,
  };
};

export default runExecutor;
