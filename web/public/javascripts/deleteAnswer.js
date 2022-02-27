function deleteAnswer(id,postId)
{
    console.log(id, postId)
    if(isLoggedIn()){window.location.href = "/phenoflow/forum/post/removeAnswer/" + id + "/" + postId }
    else{console.log("Failed to delete post")}
}