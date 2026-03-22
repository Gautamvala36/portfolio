// active hamburger menu 
let menuIcon = document.querySelector(".menu-icon");
let navlist = document.querySelector(".navlist")
menuIcon.addEventListener("click",()=>{
    menuIcon.classList.toggle("active");
    navlist.classList.toggle("active");
    document.body.classList.toggle("open");
});

// remove navlist
navlist.addEventListener("click",()=>{
    navlist.classList.remove("active");
    menuIcon.classList.remove("active");
    document.body.classList.remove("open");
})

// Tab Switching Logic for About Section
function openTab(evt, tabName) {
    var i, tabcontent, tablinks;
    
    // Hide all tab content
    tabcontent = document.getElementsByClassName("tab-content");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
        tabcontent[i].classList.remove("block"); // Ensure hidden via Tailwind if mixed
    }
    
    // Remove active state from all buttons
    tablinks = document.getElementsByClassName("tab-btn");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].classList.remove("active", "bg-blue-500/20", "border-blue-500/30", "text-white");
        tablinks[i].classList.add("text-slate-400", "border-transparent");
    }
    
    // Show the current tab and add active state
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.classList.add("active", "bg-blue-500/20", "border-blue-500/30", "text-white");
    evt.currentTarget.classList.remove("text-slate-400", "border-transparent");
}

// rotate text js code 
let text = document.querySelector(".text p");
if(text) {
    text.innerHTML = text.innerHTML.split("").map((char,i)=>
        `<b style="transform:rotate(${i * 6.3}deg")>${char}</b>`
    ).join("");
}

// scroll reveal
if(typeof ScrollReveal !== 'undefined') {
    ScrollReveal({ 
        distance:"90px",
        duration:2000,
        delay:200,
    });

    ScrollReveal().reveal('.hero-info,.main-text,.proposal,.heading', { origin: "top" });
    ScrollReveal().reveal('.about-img,.fillter-buttons,.contact-info', { origin: "left" });
    ScrollReveal().reveal('.about-content,.skills', { origin: "right" });
    ScrollReveal().reveal('.allServices,.portfolio-gallery,.blog-box,footer,.img-hero', { origin: "bottom" });
}

// Initialize Lucide Icons if available
if(typeof lucide !== 'undefined') {
    lucide.createIcons();
}
