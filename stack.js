class Stack {
    constructor() {
        this.items = []
        this.count = 0
    }

    // Add element to top of stack
    push(element) {
        this.items[this.count] = element
        let push_res = `${element}`
        this.count += 1
        let count = this.count - 1
        return [push_res, count]
    }

    // Return and remove top element in stack
    // Return undefined if stack is empty
    pop() {
        if (this.count == 0) return undefined
        let deleteItem = this.items[this.count - 1]
        this.count -= 1
        console.log(`${deleteItem} removed`)
        return deleteItem
    }

    // Check top element in stack
    peek() {
        console.log(`Top element is ${this.items[this.count - 1]}`)
        return this.items[this.count - 1]
    }

    // Check if stack is empty
    isEmpty() {
        return this.count == 0
    }

    // Check size of stack
    size() {
        return this.count
    }

    // Print elements in stack
    print() {
        let str = ''
        for (let i = 0; i < this.count; i++) {
            str += this.items[i] + ' '
        }
        return str
    }

    // Clear stack
    clear() {
        this.items = []
        this.count = 0
        console.log('Stack cleared..')
        return this.items
    }
}

const myStack = new Stack()

$(document).ready(function () {

    // Draw one block on top of the stack display
    function addBlock(value, index) {
        const color = index % 2 === 0 ? "bg-primary" : "bg-success"
        $("#stack").prepend(`<div class="row ${color} push">${value}</div>`)
    }

    // Push: add the input value to the top
    $("#push").click(function () {
        const value = $("#data").val().trim()
        if (value === "") return
        const [pushed, index] = myStack.push(value)
        addBlock(pushed, index)
        $("#data").val("").focus()
    })

    // Pop: remove the top value and show it in the deleted area
    $("#pop").click(function () {
        const removed = myStack.pop()
        if (removed === undefined) return
        $("#stack .push").first().remove()
        $(".popped").html(
            `<div class="row pop text-bg-danger border border-light">${removed}</div>`
        )
    })

    // Peek: highlight the top value without removing it
    $("#peek").click(function () {
        if (myStack.isEmpty()) return
        const top = $("#stack .push").first()
        top.css("outline", "4px solid #ffc107")
        setTimeout(() => top.css("outline", ""), 1500)
    })

    // Clear: reset the stack and the displayed blocks
    $("#clear").click(function () {
        myStack.clear()
        $("#stack").empty()
        $(".popped").empty()
    })
})