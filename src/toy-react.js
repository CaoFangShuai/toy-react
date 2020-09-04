class ElementWrapper {
	constructor(type) {
		this.root = document.createElement(type)
	}
	setAttribute(name, value) {
		this.root.setAttribute(name, value)
	}
	appendChild(commponent) {
		this.root.appendChild(commponent.root)
	}
}
class TextNodeWrapper {
	constructor(content) {
		this.root = document.createTextNode(content)
	}
}
export class Commponent {
	constructor() {
		this.props = Object.create(null)
		this.children = []
		this._root = null
	}
	setAttribute(name, value) {
		this.props[name] = value
	}
	appendChild(commponent) {
		this.children.push(commponent)
	}
	get root() {
		if (!this._root) {
			this._root = this.render().root
		}
		return this._root
	}
}
export function ToyReact(type, attributes, ...children) {
	let element
	if (typeof type === 'string') {
		element = new ElementWrapper(type)
	} else {
		element = new type()
	}
	for (let key in attributes) {
		element.setAttribute(key, attributes[key])
	}
	let insertChildren = children => {
		for (let child of children) {
			if (typeof child === 'string') {
				child = new TextNodeWrapper(child)
			}
			if (typeof child === 'object' && child instanceof Array) {
				insertChildren(child)
			} else {
				element.appendChild(child)
			}
		}
	}
	insertChildren(children)

	return element
}
export function render(component, parentElement) {
	parentElement.appendChild(component.root)
}
