window.onload = function () {
    let commentHolder = document.getElementById('comment-holder')

    commentHolder.addEventListener('keypress', (e) => {
        if (commentHolder.hasChildNodes(e.target)) {
            if (e.key == 'Enter') {
                let commentId = e.target.dataset.comment
                let value = e.target.value
                if (value) {
                    let data = {
                        body: value
                    }
                    generateRequest(`/api/comment/replies/${commentId}`, 'POST', data)
                        .then(res => res.json())
                        .then(data => {
                            let replyElement = createReplyElement(data)
                            let parent = e.target.parentElement
                            parent.previousElementSibling.appendChild(replyElement)
                            e.target.value = ''
                        })
                        .catch(e => {
                            console.log(e)
                            alert(e.message)
                        })
                } else {
                    alert('Enter a valid Reply')
                }
            }
        }
    })

}


function createReplyElement(reply) {
    let innerHTML = `<img src="${reply.profilePic}" class="rounded-circle mx-3 my-3" style="width: 40px;">
    <div class="media-body">
        <p>${reply.body}</p>
    </div>`

    let div = document.createElement('div')
    div.className = 'media mt-3'
    div.innerHTML = innerHTML
    return div
}


function generateRequest(url, method, body) {
    let headers = new Headers()
    headers.append('Accept', 'Application/JSON')
    headers.append('Content-Type', 'Application/JSON')

    let req = new Request(url, {
        method,
        headers,
        mode: 'cors',
        body: JSON.stringify(body)
    })

    return fetch(req)

}