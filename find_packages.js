const fs = require('fs');
const path = require('path');

function walk(dir) {
    const results = [];
    for (const entry of fs.readdirSync(dir)) {
        const full = path.join(dir, entry);
        if (fs.statSync(full).isDirectory()) {
            results.push(...walk(full));
        } else if (full.endsWith('.ts') || full.endsWith('.tsx')) {
            results.push(full);
        }
    }
    return results;
}

const pkgs = new Set();
const files = walk(path.resolve('shader-button'));

for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const lines = content.split('\n');
    for (const line of lines) {
        // Match: from 'package' or from "package"
        const m = line.match(/from\s+['"]([^.\/][^'"]+)['"]/);
        if (m) {
            const pkg = m[1];
            // Skip react/next builtins
            if (pkg.startsWith('react') || pkg.startsWith('next')) continue;
            // Get package name (handle scoped packages)
            const name = pkg.startsWith('@') ? pkg.split('/').slice(0, 2).join('/') : pkg.split('/')[0];
            pkgs.add(name);
        }
    }
}

console.log([...pkgs].sort().join('\n'));
