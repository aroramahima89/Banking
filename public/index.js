const u = document.querySelectorAll("ul")[0];

function fun() {
    u.classList.toggle("list");
}

const btn = document.querySelectorAll("button");

btn[0].addEventListener('click',()=>{
    console.log("hi");
    alert("click");
},false);