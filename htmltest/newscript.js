
$(".filter a").click(function (e) {
    e.preventDefault();
    var a = $(this).attr("href");
    a = a.substr(1);
    $(".sets a").each(function () {
        if (!$(this).hasClass(a) && a != "") $(this).addClass("hide");
        else $(this).removeClass("hide");
    });



    // Add active class to the current button (highlight it)
    var btnContainer = document.getElementById("btncontainer");
    var btns = btnContainer.getElementsByClassName("btn");
    for (var i = 0; i < btns.length; i++) {
        var current = document.getElementsByClassName("btn-active");
        current[0].className = current[0].className.replace(" btn-active", "");
        this.className += " btn-active";

    }
});


let imgs = document.querySelectorAll("img");
let count;
// imgs.forEach((img, index) => {
//     img.addEventListener("click", function (e) {
//         if (e.target == this) {
//             count = index;
//             let openDiv = document.createElement("div");
//             let imgPreview = document.createElement("img");
//             let butonsSection = document.createElement("div");
//             butonsSection.classList.add("butonsSection");
//             let closeBtn = document.createElement("button");
//             let nextBtn = document.createElement("button");
//             let prevButton = document.createElement("button");
//             prevButton.innerText = "Previous";
//             nextBtn.innerText = "Next";

//             nextBtn.classList.add("nextButton");
//             prevButton.classList.add("prevButton");
//             nextBtn.addEventListener("click", function () {
//                 if (count >= imgs.length - 1) {
//                     count = 0;
//                 } else {
//                     count++;
//                 }

//                 imgPreview.src = imgs[count].src;
//             });

//             prevButton.addEventListener("click", function () {
//                 if (count === 0) {
//                     count = imgs.length - 1;
//                 } else {
//                     count--;
//                 }

//                 imgPreview.src = imgs[count].src;
//             });

//             closeBtn.classList.add("closeBtn");
//             closeBtn.innerText = "Close";
//             closeBtn.addEventListener("click", function () {
//                 openDiv.remove();
//             });

//             imgPreview.classList.add("imgPreview");
//             imgPreview.src = this.src;

//             butonsSection.append(prevButton, nextBtn);
//             openDiv.append(imgPreview, butonsSection, closeBtn);

//             openDiv.classList.add("openDiv");

//             document.querySelector("body").append(openDiv);
//         }
//     });
// });

// Element references
const arrowRight = document.getElementById("arrowRight");
const arrowLeft = document.getElementById("arrowLeft");
const list = document.getElementById("list");
const valueItemNumber = document.getElementById("itemNumber");
const valueItemNumberMax = valueItemNumber.ariaValueMax;
const defaultItemNumber = 3;
const initialNumberItems = list.children.length;
const itemNumberMess = document.getElementById("itemNumberMess");
const wrapper = document.querySelector(".slider__wrapper");
const wrapperWidth = wrapper.offsetWidth;
const numVisibleItems = 3;
let centralItem = 2;
let itemNumberValue = parseInt(valueItemNumber.value);

// Initialize item number and set width of items
const initialItemNumberValue = itemNumberValue || defaultItemNumber;
let itemNumber = calculatePercentItemNumber(initialItemNumberValue);
resetItems(itemNumber);

// Utility functions
function calculatePercentItemNumber(num) {
    return num ? 100 / num : 100 / defaultItemNumber;
}

function listNumber(inputNumber) {
    const message =
        // inputNumber >= 6
        //   ? "You reached the maximum number of items"
        //   : `Changed to ${inputNumber}`;
        itemNumberMess.textContent = message;
}

function resetItems(number) {
    const sliderItems = document.querySelectorAll(".slider__item");
    sliderItems.forEach((item) => (item.style.width = `${number}%`));
    itemNumber = number;
}

function calculateCentralItem(numVisibleItems) {
    const centralItem = Math.ceil(numVisibleItems / 2);
    return centralItem;
}

function addActiveElement(centralItem, totalVisibleItems) {
    // Clear active class
    const sliderItems = document.querySelectorAll(".slider__item");
    sliderItems.forEach((item) =>
        item.querySelector(".slider__content").classList.remove("active")
    );

    // Set active class to central element(s)
    const central = sliderItems[Math.floor(centralItem)];
    central.querySelector(".slider__content").classList.add("active");

    if (totalVisibleItems % 2 === 0) {
        const central2 = sliderItems[Math.floor(centralItem) + 1];
        central2.querySelector(".slider__content").classList.add("active");

        if (totalVisibleItems == 2) {
            const central3 = sliderItems[Math.floor(centralItem) - 1];
            central3.querySelector(".slider__content").classList.add("active");
        }
    }
}

// Event listeners
valueItemNumber.addEventListener("input", function () {
    itemNumberValue = parseInt(valueItemNumber.value);
    listNumber(itemNumberValue);
    const newPercentage = calculatePercentItemNumber(itemNumberValue);
    resetItems(newPercentage);
    centralItem = calculateCentralItem(itemNumberValue);
    addActiveElement(centralItem - 1, itemNumberValue);
});

arrowRight.addEventListener("click", moveFirstToEnd);
arrowLeft.addEventListener("click", moveLastToStart);

function moveFirstToEnd() {
    const firstItem = list.firstElementChild;
    firstItem.style.marginLeft = `calc(-${itemNumber}%)`;

    if (firstItem) {
        setTimeout(() => {
            firstItem.style.marginLeft = "";
            list.appendChild(firstItem);
        }, 300);
    }
    addActiveElement(centralItem, itemNumberValue);
}

function moveLastToStart() {
    const lastItem = list.lastElementChild;
    list.removeChild(lastItem);
    list.insertBefore(lastItem, list.firstElementChild);
    const newFirstItem = list.firstElementChild;

    if (newFirstItem) {
        newFirstItem.style.marginLeft = `calc(-${itemNumber}%)`;
        setTimeout(() => {
            newFirstItem.style.marginLeft = "";
        }, 1);
    }

    addActiveElement(centralItem - 1, itemNumberValue);
}

let isDown = false;
let startX;
let scrollLeft;
const slider = document.querySelector('.items');

const end = () => {
    isDown = false;
    slider.classList.remove('active');
}

const start = (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    scrollLeft = slider.scrollLeft;
}

const move = (e) => {
    if (!isDown) return;

    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - slider.offsetLeft;
    const dist = (x - startX);
    slider.scrollLeft = scrollLeft - dist;
}

(() => {
    slider.addEventListener('mousedown', start);
    slider.addEventListener('touchstart', start);

    slider.addEventListener('mousemove', move);
    slider.addEventListener('touchmove', move);

    slider.addEventListener('mouseleave', end);
    slider.addEventListener('mouseup', end);
    slider.addEventListener('touchend', end);
})();

