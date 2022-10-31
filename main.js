"use strict";

// Importing a json file will delay drawing, so use assign.
const dict = {
    "label_emoji": {
        "en": "Emoji's you want to use as favicons",
        "ja": "faviconとして使いたい絵文字"
    },
    "label_script": {
        "en": "Minifed javascript to bookmarklet",
        "ja": "ブックマークレットにするminifyされたjavascript"
    },
    "label_script_name": {
        "en": "Bookmarklet Name",
        "ja": "ブックマークレット名"
    },
    "text_default_bookmarklet_name": {
        "en": "New bookmarklet",
        "ja": "新しいブックマークレット"
    },
    "btn_donwload": {
        "en": "Download",
        "ja": "ダウンロード"
    },
    "header_title": {
        "en": "Emoji favicon bookmarklet maker",
        "ja": "Emoji favicon bookmarklet maker"
    },
    "label_usage": {
        "en": "<p>Enter the emoji you want to make into favicons and the JavaScript you want to make into bookmarklets, then click the download button.</p><p>An HTML file for bookmark import will be downloaded, so please import it with your browser.</p>",
        "ja": "<p>faviconにする絵文字とブックマークレットにしたいJavaScriptを入力してからダウンロードボタンをクリックしてください。</p><p>ブックマークインポート用のHTMLファイルがダウンロードされるので、お使いのブラウザでインポートしてください。</p>"
    }    
};

// Replacing Strings with i18n Libraries
const glot = new Glottologist();
for (const key in dict) {
    glot.assign(key, dict[key]);
}

/**
 * Processing when DOM loading is complete
 */
document.addEventListener('DOMContentLoaded', () => {
    glot.render();

    // // Default values for text boxes do not seem to be supported with attributes
    $('#script_name').value = glot.get("text_default_bookmarklet_name");

    // When the download button is clicked,
    // it outputs an HTML file that can import a bookmarklet with favicon set.
    $('form').addEventListener('submit', e => {
        e.preventDefault();
        emoji2PngDataUrl($('#emoji').value.trim())
        .then(pngDataUrl => {
            console.log(pngDataUrl);
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
