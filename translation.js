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

document.addEventListener('DOMContentLoaded', () => {
    glot.render();

    // // Default values for text boxes do not seem to be supported with attributes
    document.querySelector('#script_name').value = glot.get("text_default_bookmarklet_name");
});
