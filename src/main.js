import { ToyReact, render, Commponent } from './toy-react'
class MyComponent extends Commponent {
  constructor() {
    super()
    this.state = {
      a: 1,
      b: 2
    }
  }
  render() {
    return (
      <div>
        <h1>MyComponent</h1>
        <div>{this.state.a}</div>
        <div>{this.state.b.toString()}</div>
      </div>
    )
  }
}

let element = (
  <MyComponent id="myId" class="myClass" style="color:red"></MyComponent>
)
render(element, document.body)
