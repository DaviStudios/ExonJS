const exon = new exonjs

let counter = exon.exonVar(0, (oldValue, newValue) => {
    console.log(`Counter changed from ${oldValue} to ${newValue}!`);
});

exon.Style('head', `{"font.size":35,"font.family":"\'Segoe UI\'","pos.top":${exon.percentToPixelsHeight(40)},"pos.left":${exon.percentToPixelsWidth(43.5)}}`)
exon.Style('show', `{"font.size":35,"font.family":"\'Segoe UI\'","pos.top":${exon.percentToPixelsHeight(60)},"pos.left":${exon.percentToPixelsWidth(51)}}`)
const header = exon.Text('Click down below!', { 'style': 'head' })
const show = exon.Text('0', { 'style': 'show', 'id': 'show' })
exon.Style('test', '{"font.size":35,"back.color":"#ff0000","size.width":"50","size.height":"50","pos.set":"center"}')
const btn = exon.Button('+', function () {
    counter.set(counter.get() +1)
    exon.getElementById('show').textContent = counter.get();
}, { 'style': 'test' })
exon.render(header)
exon.nline()
exon.render(btn)
exon.nline()
exon.render(show)