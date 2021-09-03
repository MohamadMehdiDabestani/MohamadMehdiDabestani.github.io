const p_des_post = document.querySelectorAll(".post .content .text");
p_des_post.forEach(el => {
    var title = el.querySelector("h2");
    var img = el.querySelector("img");
    var link = el.querySelector("a");
    el.innerHTML = "";
    el.append(img);
    el.append(title);
    el.append(link);
});
