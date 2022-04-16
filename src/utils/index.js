export function parseStringAsHtml(txt) {
    let span = document.createElement('div');
    span.innerHTML = txt;
    // const parser = new DOMParser();
    // const htmlDoc = parser.parseFromString(txt, 'text/html');
    return (
        span
    );
}