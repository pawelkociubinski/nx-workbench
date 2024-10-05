import { ExecutorContext } from '@nx/devkit';

import { ServerlessExecutorSchema } from './schema';
import executor from './executor';

const options: ServerlessExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('Serverless Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
