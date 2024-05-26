import { execSync } from 'child_process';
import { join, dirname } from 'path';
import { mkdirSync, rmSync } from 'fs';

const projectName = 'test-project';
const projectDirectory = join(process.cwd(), 'tmp', projectName);

describe('serverless', () => {
  beforeAll(() => {
    createTestProject();
  });

  afterAll(() => {
    rmSync(projectDirectory, {
      recursive: true,
      force: true,
    });
  });

  it('should create a proper serverless application scaffold', () => {
    expect(true);
  });

  it('should create a proper lambda function scaffold for a given project', () => {
    expect(true);
  });
});

function createTestProject(): void {
  console.debug(`Ensure projectDirectory is empty`);
  console.debug(`Removing directory: ${projectDirectory}`);
  rmSync(projectDirectory, {
    recursive: true,
    force: true,
  });
  console.debug(`Removed directory: ${projectDirectory}`);

  console.debug(`Creating a directory: ${projectDirectory}`);
  mkdirSync(dirname(projectDirectory), {
    recursive: true,
  });
  console.debug(`Created a directory: ${projectDirectory}`);

  console.debug(`Creating a test project in: ${projectDirectory}`);
  execSync(
    `npx --yes create-nx-workspace@latest ${projectName} --preset apps --nxCloud=skip --no-interactive`,
    {
      cwd: dirname(projectDirectory),
      stdio: 'inherit',
      env: process.env,
    }
  );
  console.debug(`Created test project in "${projectDirectory}"`);
}
