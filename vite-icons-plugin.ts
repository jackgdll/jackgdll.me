import path from 'path';
import fs from 'fs';
import type { Plugin, ViteDevServer } from 'vite';

export function generateIconsPlugin({
	dir = 'src/lib/assets/icons'
}: { dir?: string } = {}): Plugin {
	const iconsDir = path.resolve(__dirname, dir);
	const outputFile = path.resolve(__dirname, iconsDir, 'index.ts');

	function generateFile() {
		const files = fs.readdirSync(iconsDir).filter((file) => file.endsWith('.svg'));
		const icons = files.map((file) => path.basename(file, '.svg'));

		const arrayLiteral = `export const icons = ${JSON.stringify(icons)} as const;\n`;
		const typeLiteral = `export type Icon = ${icons.map((icon) => `'${icon}'`).join(' | ')};\n`;

		fs.writeFileSync(outputFile, arrayLiteral + typeLiteral);
		console.log(`✅ icons.ts generated with ${files.length} icons`);
	}

	function bustCache(server: ViteDevServer) {
		const module = server.moduleGraph.getModuleById(outputFile);
		if (module) {
			server.reloadModule(module);
		}
	}

	return {
		name: 'generate-icons',
		buildStart() {
			generateFile();
		},
		configureServer(server) {
			server.watcher.add(iconsDir);
			server.watcher.on('add', (filePath) => {
				if (filePath.startsWith(iconsDir) && filePath.endsWith('.svg')) {
					generateFile();
					bustCache(server);
				}
			});
			server.watcher.on('unlink', (filePath) => {
				if (filePath.startsWith(iconsDir) && filePath.endsWith('.svg')) {
					generateFile();
					bustCache(server);
				}
			});
		}
	};
}
