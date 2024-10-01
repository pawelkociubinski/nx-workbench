import { ExecutorContext } from '@nx/devkit';

import { EventExecutorSchema } from './schema';
import executor from './executor';

const options: EventExecutorSchema = {};
const context: ExecutorContext = {
  root: '',
  cwd: process.cwd(),
  isVerbose: false,
};

describe('Event Executor', () => {
  it('can run', async () => {
    const output = await executor(options, context);
    expect(output.success).toBe(true);
  });
});
