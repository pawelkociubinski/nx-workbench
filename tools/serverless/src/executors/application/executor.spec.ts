import { ExecutorContext } from '@nx/devkit';

import { ApplicationExecutorSchema } from './schema';
import executor from './executor';

const options: ApplicationExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('Application Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
