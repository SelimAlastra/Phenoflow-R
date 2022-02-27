function deletePost(id)
{
    if(isLoggedIn()){window.location.href = "/phenoflow/forum/remove/" + id;}
    else{console.log("Failed to delete post")}
}