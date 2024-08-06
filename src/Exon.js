function parseExonStyle(obj) {
    let style = ''
    if (obj['back.color']) style += `background-color: ${obj['back.color']}; `;
    if (obj['size.width']) style += `width: ${obj['size.width']}px ; `;
    if (obj['size.height']) style += `height: ${obj['size.height']}px ; `;
    if (obj['font.size']) style += `font-size: ${obj['font.size']}px ; `;
    if (obj['padding.left']) style += `padding-left: ${obj['padding.left']}px ; `;
    if (obj['padding.right']) style += `padding-right: ${obj['padding.right']}px ; `;
    if (obj['padding.top']) style += `padding-top: ${obj['padding.top']}px ; `;
    if (obj['padding.bottom']) style += `padding-bottom: ${obj['padding.bottom']}px ; `;
    if (obj['padding']) style += `padding: ${obj['padding.bottom']}px ; `;
    if (obj['font.family']) style += `font-family: ${obj['font.family']} ; `;
    if (obj['pos.left']) {
        if (!style.includes('position: absolute;')) {
            style += `position: absolute; `;
        }
        style += `left: ${obj['pos.left']}px ; `;
    }
    if (obj['pos.right']) {
        if (!style.includes('position: absolute;')) {
            style += `position: absolute; `;
        }
        style += `right: ${obj['pos.right']}px ; `;
    }
    if (obj['pos.top']) {
        if (!style.includes('position: absolute;')) {
            style += `position: absolute; `;
        }
        style += `top: ${obj['pos.top']}px ; `;
    }
    if (obj['pos.bottom']) {
        if (!style.includes('position: absolute;')) {
            style += `position: absolute; `;
        }
        style += `bottom: ${obj['pos.bottom']}px ; `;
    }
    if (obj['pos.set']) {
        if (!style.includes('position: absolute;')) {
            style += `position: absolute; `;
        }
        if (obj['pos.set'] == 'center') {
            style += `left: 50%; top: 50%; `;
        }
    }
    return style.trim();
}

class ExonJS {
    constructor() {
        this.style = {}
        this.elements = {}
        this.elemCount = 1;
    }

    Style(name, json) {
        this.style[name] = JSON.parse(json)
    }

    Button(txt, func, props = {}) {
        let btn = document.createElement('button')
        btn.textContent = txt
        btn.onclick = func
        btn.exon = props
        return btn
    }

    Input(placeholder, props = {}) {
        let btn = document.createElement('input')
        btn.placeholder = placeholder
        btn.exon = props
        return btn
    }

    Text(txt, props = {}) {
        let btn = document.createElement('a')
        btn.textContent = txt
        btn.exon = props
        return btn
    }

    getElementById(id) {
        if (this.elements[id]) {
            return document.getElementById(this.elements[id])
        }
    }

    getInputValue(id) {
        if (this.elements[id]) {
            if (document.getElementById(this.elements[id]).tagName == 'INPUT') {
                return document.getElementById(this.elements[id]).value
            } else {
                return '0'
            }
        }
    }

    br() {
        document.body.appendChild(document.createElement('br'))
    }

    percentToPixelsWidth(p) {
        return document.documentElement.clientWidth * (p / 100)
    }

    percentToPixelsHeight(p) {
        return document.documentElement.clientHeight * (p / 100)
    }

    render(elem) {
        let style = ''
        if (elem.exon['style']) {
            style += parseExonStyle(this.style[elem.exon['style']])
        }
        if (elem.exon['id']) {
            this.elements[elem.exon['id']] = 'exonNode' + this.elemCount
        } else {
            this.elements['default' + this.elemCount] = 'exonNode' + this.elemCount
        }
        if (style !== '') {
            elem.style = style
        }

        elem.id = 'exonNode' + this.elemCount

        document.body.appendChild(elem)
        this.elemCount++;
    }

    randMax(max) {
        return Math.floor(Math.random() * (max + 1))
    }

    randMaxMin(max) {
        return Math.floor(Math.random() * max)
    }

    randMinMax(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min
    }

    randChoice(array) {
        return array[this.randMaxMin(array.length)]
    }

    randChoiceDict(dict) {
        const array = Object.keys(dict)
        return array[this.randMaxMin(array.length)]
    }

    exonVar(initv, func) {
        let val = initv;

        return {
            get: () => val,
            set: (nval) => {
                const oval = val;
                if (oval !== nval) {
                    val = nval;
                    func(oval, nval);
                }
            }
        };
    }
}
