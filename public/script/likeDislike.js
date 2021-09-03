window.onload = function () {
    let LikeBtn = document.getElementById('likeBtn')
    let DislikeBtn = document.getElementById('dislikeBtn')

    LikeBtn.addEventListener('click', function (e) {
        let postId = LikeBtn.dataset.post
        reqLikeDislike('likes', postId)
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

    DislikeBtn.addEventListener('click', function(e) {
        let postId = DislikeBtn.dataset.post

        reqLikeDislike('dislikes', postId)
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

    function reqLikeDislike(name, postId) {
        let headers = new Headers()
        headers.append('Accept', 'Application/JSON')
        headers.append('Content-Type', 'Application/JSON')

        let req = new Request(`/api/${name}/${postId}`, {
            method: 'GET',
            headers,
            mode: 'cors'
        })

        return fetch(req)
    }
}