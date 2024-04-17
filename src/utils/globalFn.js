export async function downloadFile(event, data) {
    const banner = await (await fetch(event)).blob(),
        aTag = document.createElement("a"),
        bannerUrl = URL.createObjectURL(banner);
    aTag.href = bannerUrl, aTag.download = data, document.body.appendChild(aTag), aTag.click(), setTimeout((function() {
        document.body.removeChild(aTag), window.URL.revokeObjectURL(bannerUrl)
    }), 0)
}
// data.defineProperty(exports, "__esModule", {
//     value: !0
// }), exports.downloadFile = void 0, exports.downloadFile = downloadFile;