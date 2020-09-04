import { ToyReact, render, Commponent } from './toy-react'
class MyComponent extends Commponent {
	render() {
		return (
			<div>
				<h1>hello React</h1>
        {this.children}
			</div>
		)
	}
}
let element = (
	<MyComponent id="myId" class="myClass" style="color:red">
		<div>111</div>
		<div></div>
		<div></div>
	</MyComponent>
)

render(element, document.body)
