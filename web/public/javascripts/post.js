function deleteAnswer(id,postId)
{
    console.log(id, postId)
    if(isLoggedIn()){window.location.href = "/phenoflow/forum/post/removeAnswer/" + id + "/" + postId }
    else{console.log("Failed to delete post")}
}

function deletePost(id)
{
    if(isLoggedIn()){window.location.href = "/phenoflow/forum/remove/" + id;}
    else{console.log("Failed to delete post")}
}

$('#submitAnswer').on('click',function(){

    var user = localStorage.getItem("user");
    var form = $('#answerForm')[0]; // You need to use standard javascript object here
    var formData = new FormData(form);
    console.log(user)
    if (user){
        formData.append("verifiedAuthor", true)
    }
    else{
        formData.append("verifiedAuthor", false)
    }
    let paramId = window.location.href.split("/").pop()


    $.ajax({
        url: "/phenoflow/forum/post/" + paramId,
        type: 'POST',
        data: formData,
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        async: false,
        })


});