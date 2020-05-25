package main

import (
	"syscall/js"

	"github.com/tidwall/pretty"
)

func prettifyJSON(this js.Value, i []js.Value) interface{} {
	input := pretty.Pretty([]byte(i[0].String()))

	return string(input)
}

func registerCallbacks() {
	emptyWASMObject := make(map[string]interface{})
	js.Global().Set("WASMGo", js.ValueOf(emptyWASMObject))
	js.Global().Get("WASMGo").Set("prettifyJSON", js.FuncOf(prettifyJSON))
}

func main() {
	c := make(chan struct{}, 0)

	registerCallbacks()
	<-c
}
