const exon = new ExonJS

exon.Style('opt', JSON.stringify({
    'size.height': 20,
}))

exon.Style('button', JSON.stringify({
    'size.height': 52,
    'size.width': 52,
    'pos.top': 8
}))

let min = exon.Input('Min...', {'id': 'min', 'style': 'opt'})
let max = exon.Input('Max...', {'id': 'max', 'style': 'opt'})

let txt = exon.Text('Generated: None yet', {'id': 'gen'})

let gen = exon.Button('+', () => {
    exon.getElementById('gen').textContent = 'Generated: ' + exon.randMinMax(Number(exon.getInputValue('min')), exon.getInputValue('max'))
}, {'style': 'button'})

exon.render(min)
exon.render(gen)
exon.br()
exon.render(max)
exon.br()
exon.render(txt)