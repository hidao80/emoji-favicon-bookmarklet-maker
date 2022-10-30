/**
 * Lesser javascript minifiler
 * @param {string} script - Pure javascript
 * @returns {string} - Minified javascript for bookmarklet
 */
function minify(script) {
    // Record the literal string before mifify.
    const originalStrings = script
    .replace(/\/\*.*\*\//sg)
    .replace(/\/\/.*\n/g)
    .match(/('.*?'|".*?"|\`.*?\`)/sg);
    let index = 0;

    // javascript minifiler (simplified version)
    const minified = script
    .replace(/\/\*.*\*\//sg)
    .replace(/\/\/.*\n/g)
    .replace(/(?:var|let|const)\s+/g, 'var ')
    .replace(/\s+$;/g, ';')
    .replace(/^\s+/g)
    .replace(/\n\s+/g, '\n')
    .replace(/\s*\n/g, ',')
    .replace(/;{2,}/g, ';')
    .replace(/,{2,}/g, ',')
    .replace(/\s*:\s*/g, ':')
    .replace(/;,/g, ';')
    .replace(/\{,/g, '{')
    .replace(/,\}/g, '}')
    .replace(/\{;/g, '{')
    .replace(/;\}/g, '}')
    .replace(/,\s+/g, ',')
    .replace(/\s+\{/g, '{')
    .replace(/\}\s+/g, '}')
    .replace(/\s+/g, ' ')
    .replace(/(\w)\s+\(/g, '$1(')
    .replace(/(\w)\s+\[/g, '$1[')
    .replace(/((?:function|=>|for|while|do|if|else|switch).*?\}),/g, '$1;')
    .replace(/\s*!?=+\s*/g, (match) => match.trim())

    // Repair minified literal strings with a prerecorded string array.
    .replace(/('.*?'|".*?"|\`.*?\`)/sg, () => {
        return originalStrings[index++];
    })
    .replace(/;$/);

    return minified;
}