import { createRollupConfig } from './createRollupConfig';
import pkg from '../../package.json';

const name = 'index';
const options = [
  {
    preventAssignmen:true,
    name,
    format: 'cjs',
    env: 'development',
    input: pkg.source,
  },
  {
    preventAssignmen:true,
    name,
    format: 'cjs',
    env: 'production',
    input: pkg.source,
  },
  {preventAssignmen:true, name, format: 'esm', input: pkg.source },
  {
    preventAssignmen:true,
    name,
    format: 'umd',
    env: 'development',
    input: pkg.source,
  },
  {
    preventAssignmen:true,
    name,
    format: 'umd',
    env: 'production',
    input: pkg.source,
  },
];

export default options.map((option) => createRollupConfig(option));
