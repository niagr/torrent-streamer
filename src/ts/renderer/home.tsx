import * as React from "react"
import * as ReactDOM from "react-dom"

import HelloWorld from "./components/App"

function main () {
    const appContainer = document.getElementById("app")
    ReactDOM.render(<div>Hello React!<HelloWorld/></div>, appContainer)
}

main()