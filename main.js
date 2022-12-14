/**
 * Processing when DOM loading is complete
 */
document.addEventListener('DOMContentLoaded', () => {
    // When the download button is clicked,
    // it outputs an HTML file that can import a bookmarklet with favicon set.
    $('form').addEventListener('submit', e => {
        e.preventDefault();
        emoji2PngDataUrl($('#emoji').value.trim())
        .then(pngDataUrl => {
            const script = encodeURIComponent($('#script').value.trim());
            downloadHtmlForImport(pngDataUrl, script);
        });    
    });
});

/**
 * Fake jQuery object interface
 * @param {string} selector 
 * @returns {Element|Array<Element>}
 */
function $(selector) {
    const elems = document.querySelectorAll(selector);
    return elems.length == 1 ? elems[0] : elems;
}

/**
 * Converts pictograms to daraUrl
 * @param {string} emoji 
 * @returns {Promise<string>}
 */
function emoji2PngDataUrl(emoji) {
    return new Promise((resolve, reject) => {
        const canvas = $("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        img.src = `data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>${emoji}</text></svg>`; 
        img.onload = () => {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            resolve(canvas.toDataURL("image/png"));
        };
        img.onerror = reject;
    });
}

/**
 * Create HTML for bookmark import for Chromium compatible browsers and start downloading.
 * @param {string} pngDataUrl 
 * @param {string} script 
 */
function downloadHtmlForImport(pngDataUrl, script) {
    const filename = "import_bookmarklet.html";
    const name = $('#script_name').value;
    const a = document.createElement("a");
    a.href = html2DaraUrl(getOutputHTML(name, pngDataUrl, script));
    a.download = filename;
    a.click();
}

/**
 * Convert html (plain text) to dataurl
 * @param {string} html
 * @returns {string}
 */
function html2DaraUrl(html) {
    return URL.createObjectURL(new Blob([html], { type: "text/html" }));
}

/**
 * Generate HTML for importing favorites for Chromium compatible browsers
 * with bookmark names, favicons and javascript embedded.
 * @param {*} name - Bookmark Title
 * @param {*} pngDataUrl
 * @param {*} script - Minified javascript
 * @returns {string}
 */
function getOutputHTML(name, pngDataUrl, script) {
    return `<!DOCTYPE NETSCAPE-Bookmark-file-1>
<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">
<DL><p>
    <DT><A HREF="javascript:${script}" ICON="${pngDataUrl}">${name}</A>
</DL><p>`;
}
