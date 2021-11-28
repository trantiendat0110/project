const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document)
// lấy element 
const ElementBody = $('#body')
const ELementScorse = $('.menu_header')
const ELementMenuScorse = $('.menu-container')
const ElementSubMenus = $$('.sub_menu')
const ElementLiMenus = $$('.menu-container li')

// console.log(ElementLiMenus)
// hàm open menu 
function openMenu() {
    ELementMenuScorse.classList.add('open')
    ElementBody.classList.add('shadow')
}

function closeMenu() {        
    ELementMenuScorse.classList.remove('open')
    ElementBody.classList.remove('shadow')
}
// lắng nghe hành động
ELementScorse.addEventListener('click', openMenu)
ElementBody.addEventListener('click', closeMenu)
ElementLiMenus.forEach((ElementLi, index) => {
    const subMenu = ElementSubMenus[index]
    ElementLi.onclick = () => {
        console.log(subMenu)
        $('li.active_list').classList.remove('active_list')
        $('.sub_menu.active').classList.remove('active')
        ElementLi.classList.add('active_list')
        subMenu.classList.add('active')
    }
})