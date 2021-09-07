window.onload = function () {
    LikeDislike()
    Bookmark()
    Comment()
}

function Comment() {
    let comment = document.getElementById('comment')
    let commentHolder = document.getElementById('comment-holder')


    comment.addEventListener('keypress', function (e) {

        if (e.key == 'Enter') {
            if (e.target.value) {
                let postId = comment.dataset.post
                let data = {
                    body: e.target.value
                }

                generateRequest(`/api/comment/${postId}`, 'POST', JSON.stringify(data))
                    .then(res => res.json())
                    .then(data => {
                        let commentElement = createComment(data)
                        commentHolder.insertBefore(commentElement, commentHolder.children[0])
                        e.target.value = ''
                    })
                    .catch((e) => {
                        console.log(e.message)
                        alert(e.message)
                    })

            } else {
                alert('Enter a Valid Comment')
            }
        }

    })

    commentHolder.addEventListener('keypress', (e) => {
        if (commentHolder.hasChildNodes(e.target)) {
            if (e.key == 'Enter') {
                let commentId = e.target.dataset.comment
                let value = e.target.value
                if (value) {
                    let data = {
                        body: value
                    }
                    generateRequest(`/api/comment/replies/${commentId}`, 'POST', JSON.stringify(data))
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

function LikeDislike() {
    let LikeBtn = document.getElementById('likeBtn')
    let DislikeBtn = document.getElementById('dislikeBtn')

    LikeBtn.addEventListener('click', function (e) {
        let postId = LikeBtn.dataset.post
        generateRequest(`/api/likes/${postId}`, 'GET')
            .then(res => res.json())
            .then(data => {
                let likeText = data.liked ? 'Liked' : 'Like'
                likeText += ` (${data.totalLikes})`
                let DislikeText = `Dislike (${data.totalDislikes})`

                LikeBtn.innerHTML = likeText
                DislikeBtn.innerHTML = DislikeText
            })
            .catch((e) => {
                console.log(e)
                alert(e.message)
            })
    })

    DislikeBtn.addEventListener('click', function (e) {
        let postId = DislikeBtn.dataset.post

        generateRequest(`/api/dislikes/${postId}`, 'GET')
            .then(res => res.json())
            .then(data => {

                let dislikeText = data.disliked ? 'Disliked' : 'Dislike'
                dislikeText += ` (${data.totalDislikes})`
                let likeText = `Like (${data.totalLikes})`

                LikeBtn.innerHTML = likeText
                DislikeBtn.innerHTML = dislikeText

            })
            .catch((e) => {
                console.log(e.message)
                alert(e.message)
            })
    })
}

function Bookmark() {
    const bookmarks = document.getElementsByClassName('bookmark');
    [...bookmarks].forEach(bookmark => {
        bookmark.style.cursor = 'pointer'
        bookmark.addEventListener('click', function (e) {
            let target = e.target.parentElement

            // let headers = new Headers()
            // headers.append('Accept', 'Application/JSON')

            // let req = new Request(`/api/bookmarks/${target.dataset.post}`,{
            //     method: 'GET',
            //     headers,
            //     mode: 'cors'
            // })
            // fetch(req)
            generateRequest(`/api/bookmarks/${target.dataset.post}`, 'GET', '')
                .then(res => res.json())
                .then(data => {
                    if (data.bookmark) {
                        target.innerHTML = '<i class="bi bi-bookmark-check-fill"></i>';
                    } else {
                        target.innerHTML = '<i class="bi bi-bookmark-plus"></i>';
                    }
                })
                .catch(e => {
                    console.error(e.response.data.error)
                    alert(e.response.data.error)
                })

        })
    });
}

function createComment(comment) {
    let innerHTML = `<img src="${comment.user.profilePic}" class="rounded-circle mx-3 my-3" style="width: 40px;">
    <div class="media-body my-3">
        <p>${comment.body}</p>
        <div class="my-3">
            <input type="text" class="form-control" placeholder="Press Enter to Reply" name="reply"
                data-comment="${comment._id}">
        </div>
    </div>`

    let div = document.createElement('div')
    div.className = 'Media border'
    div.innerHTML = innerHTML

    return div
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
    body = body || null
    let headers = new Headers()
    headers.append('Accept', 'Application/JSON')
    headers.append('Content-Type', 'Application/JSON')

    let req = new Request(url, {
        method,
        headers,
        mode: 'cors',
        body
    })

    return fetch(req)

}