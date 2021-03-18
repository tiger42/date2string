const fs = require('fs');

fs.readFile(__dirname + '/../package.json', 'utf8', (error, contents) => {
    const pkg = JSON.parse(contents);
    const json = {
        compress: {
            typeofs: false,
            passes: 2,

        },
        mangle: true,
        output: {
            beautify: false,
            preamble: `// ${pkg.name} ${pkg.version}\n// License: ${pkg.license}\n// Copyright ${new Date().getFullYear()} ${pkg.author}`,
        },
    };
    fs.writeFile(__dirname + '/../uglify.json', JSON.stringify(json, null, 2), 'utf8', () => {});
});
