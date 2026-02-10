const fs = require('fs');
const path = require('path');

const rootDir = path.resolve('shader-button');

function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);

    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            if (file.endsWith('.ts') || file.endsWith('.tsx')) {
                arrayOfFiles.push(path.join(dirPath, "/", file));
            }
        }
    });

    return arrayOfFiles;
}

const files = getAllFiles(rootDir);

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    const originalContent = content;

    // Regex to find imports starting with @/
    // Matches: from "@/..." or import "@/..."
    // We capture the part after @/
    const regex = /from\s+['"]@\/(.*?)['"]/g;

    content = content.replace(regex, (match, p1) => {
        // p1 is the path after @/
        // specific fix for some files that might use @/ to refer to src/ (the main project)
        // BUT we know from analysis that shader-button likely sees itself as root.
        // So @/lib/utils -> shader-button/lib/utils

        const targetAbs = path.join(rootDir, p1);
        const fileDir = path.dirname(file);
        let relativePath = path.relative(fileDir, targetAbs);

        if (!relativePath.startsWith('.')) {
            relativePath = './' + relativePath;
        }

        // Check if it's a window path (backslashes) and convert to forward slashes
        relativePath = relativePath.split(path.sep).join('/');

        return `from "${relativePath}"`;
    });

    // Also handle dynamic imports or require if any (unlikely in this nextjs setup but good to be safe)
    // or import "..." for side effects
    const sideEffectRegex = /import\s+['"]@\/(.*?)['"]/g;
    content = content.replace(sideEffectRegex, (match, p1) => {
        const targetAbs = path.join(rootDir, p1);
        const fileDir = path.dirname(file);
        let relativePath = path.relative(fileDir, targetAbs);
        if (!relativePath.startsWith('.')) {
            relativePath = './' + relativePath;
        }
        relativePath = relativePath.split(path.sep).join('/');
        return `import "${relativePath}"`;
    });

    if (content !== originalContent) {
        console.log(`Fixing ${file}`);
        fs.writeFileSync(file, content, 'utf8');
    }
});

console.log('Finished fixing imports.');
