const p_des_post = document.querySelectorAll(".post .content .text p");
p_des_post.forEach(el => {
    el.innerHTML = el.substring(0 , 120) + "...";
});
