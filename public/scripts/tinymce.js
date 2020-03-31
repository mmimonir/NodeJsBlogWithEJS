window.onload = function() {
  tinymce.init({
    selector: '#tiny-mce-post-body',
    plugins: [
      'link a11ychecker advcode casechange formatpainter linkchecker autolink lists checklist media mediaembed pageembed permanentpen powerpaste table advtable tinycomments tinymcespellchecker',
      'preview',
      'searchreplace',
      'wordcount',
      'emotions image imagetools'
    ],
    toolbar: [
      'bold italic underline | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image media | forecolor backcolor emotions | code preview'
    ],
    toolbar_mode: 'floating',
    tinycomments_mode: 'embedded',
    tinycomments_author: 'Author name',
    height: 300,
    automatic_upload_url: true,
    images_upload_url: 'uploads/postimage',
    images_upload_handler: function(blobInfo, success, failure) {
      let headers = new Headers()
      headers.append('Accept', 'Application/JSON')

      let formData = new FormData()
      formData.append('post-image', blobInfo.blob(), blobInfo.filename())

      let req = new Request('/uploads/postimage', {
        method: 'POST',
        headers,
        mode: 'cors',
        body: formData
      })

      fetch(req)
        .then((res) => res.json())
        .then((data) => success(data.imgUrl))
        .catch(() => failure('HTTP Error'))
    }
  })
}
