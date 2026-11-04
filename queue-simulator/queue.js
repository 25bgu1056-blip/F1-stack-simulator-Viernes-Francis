class Queue {
    constructor() {
        this.items = []
    }

    // Add element to the rear of the queue
    enqueue(element) {
        this.items.push(element)
    }

    // Remove and return the front element (undefined if empty)
    dequeue() {
        if (this.isEmpty()) return undefined
        return this.items.shift()
    }

    // Look at the front element without removing it
    peek() {
        return this.items[0]
    }

    isEmpty() {
        return this.items.length === 0
    }

    size() {
        return this.items.length
    }

    clear() {
        this.items = []
    }
}

const myQueue = new Queue()

$(document).ready(function () {

    // Redraw the whole queue. Front is at the top, rear is at the bottom.
    function render(highlightFront = false) {
        $("#queue").empty()
        const last = myQueue.items.length - 1
        myQueue.items.forEach(function (value, i) {
            let tags = ""
            if (i === 0) tags += ' <span class="badge bg-light text-dark">FRONT</span>'
            if (i === last) tags += ' <span class="badge bg-secondary">REAR</span>'
            const color = (highlightFront && i === 0) ? "bg-warning text-dark" : "bg-primary"
            $("#queue").append(`<div class="row ${color} push">${value}${tags}</div>`)
        })
    }

    function showMessage(text) {
        $("#message").text(text)
    }

    // Enqueue: add the input value to the rear
    $("#enqueue").click(function () {
        const value = $("#data").val().trim()
        if (value === "") {
            showMessage("Please type a value first.")
            return
        }
        myQueue.enqueue(value)
        showMessage("")
        $("#data").val("").focus()
        render()
    })

    // Dequeue: remove the front value and show it in the deleted area
    $("#dequeue").click(function () {
        const removed = myQueue.dequeue()
        if (removed === undefined) {
            showMessage("The queue is empty. Nothing to dequeue.")
            return
        }
        showMessage("")
        $(".removed").html(
            `<div class="row pop text-bg-danger border border-light">${removed}</div>`
        )
        render()
    })

    // Peek: highlight the front value without removing it
    $("#peek").click(function () {
        if (myQueue.isEmpty()) {
            showMessage("The queue is empty. Nothing to peek.")
            return
        }
        showMessage("")
        render(true)
        setTimeout(() => render(false), 1500)
    })

    // Clear: reset the queue and the displays
    $("#clear").click(function () {
        myQueue.clear()
        showMessage("")
        $("#queue").empty()
        $(".removed").empty()
    })
})