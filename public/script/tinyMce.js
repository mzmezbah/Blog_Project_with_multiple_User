window.onload = function () {

  tinymce.init({
    selector: 'textarea#tiny-mce-post-body',
    height: 300,
    plugins: [
      'advlist autolink lists link image charmap print preview anchor',
      'searchreplace visualblocks code fullscreen',
      'insertdatetime media table paste imagetools wordcount'
    ],
    toolbar: 'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emoticons | code preview',
  
    automatic_uploads: true,
    images_upload_url: '/uploads/postImage',
    images_upload_handler: function (blobInfo, success, failure) {
      let headers = new Headers()
      headers.append('Accept', 'Application/JSON')


      let formData = new FormData()
      formData.append('post-image', blobInfo.blob(), blobInfo.filename())

      let req = new Request('/uploads/postImage', {
        method: 'POST',
        headers,
        mode: 'cors',
        body: formData
      })
     fetch(req)
        .then(res => res.json())
        .then(data => success(data.imageUrl))
        .catch(() => failure('HTTP Error'))
    }
})
}