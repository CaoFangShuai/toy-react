const RANGE_TO_DOM = Symbol('range to dom')
// 包装dom产生react对象
class ElementWrapper {
  constructor(type) {
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(commponent) {
    let range = document.createRange()
    range.setStart(this.root, this.root.childNodes.length)
    range.setEnd(this.root, this.root.childNodes.length)
    range.deleteContents()
    commponent[RANGE_TO_DOM](range)
    // this.root.appendChild(commponent.root)
  }
  [RANGE_TO_DOM](range) {
    range.deleteContents()
    range.insertNode(this.root)
  }
}
class TextNodeWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
  [RANGE_TO_DOM](range) {
    range.deleteContents()
    range.insertNode(this.root)
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
  [RANGE_TO_DOM](range) {
    this.render()[RANGE_TO_DOM](range)
  }
  // 在render时候获取根节点
  get root() {
    // 获取root的过程就是真是渲染的过程 一层一层往下渲染
    if (!this._root) {
      // 如果是当前的元素是Component子类也就是自定义组件
      // 还没有render的时候，就执行render方法，
      // 处理自定义组件转变为真实dom也就有root了
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
      // 如果当前传进来是数字或字符串 就创建文本节点
      if (typeof child === 'string' || typeof child === 'number') {
        child = new TextNodeWrapper(child)
      }
      // 如果是数组就递归调用插入childre中
      if (typeof child === 'object' && child instanceof Array) {
        insertChildren(child)
      } else {
        // 如果是对象就添加到当前元素的children中
        element.appendChild(child)
      }
    }
  }
  // 处理传入的第三个参数
  insertChildren(children)

  return element
}
export function render(component, parentElement) {
  let range = document.createRange()
  range.setStart(parentElement, 0)
  range.setEnd(parentElement, parentElement.childNodes.length)
  range.deleteContents()
  component[RANGE_TO_DOM](range)
  // parentElement.appendChild(component.root)
}
