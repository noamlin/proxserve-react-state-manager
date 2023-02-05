import typescript from '@rollup/plugin-typescript';

export default {
	input: 'src/index.ts',
	output: {
		file: 'dist/index.js',
        name: 'proxserve-react',
		format: 'es'
	},
    plugins: [typescript()]
};