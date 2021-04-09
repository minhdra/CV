

var navItem = Array.from(document.querySelectorAll('.nav-item'));
var navLink = Array.from(document.querySelectorAll('.nav-link'));

navItem.forEach(function(element, index){
    element.classList.remove('active');
    navLink[index].addEventListener('click', function(){
        removeAllClassActive();

        element.classList.add('active');
    })
})

navItem[0].classList.add('active');

window.addEventListener('scroll', function(){
    var nav = document.getElementsByTagName('nav')[0];
    var y = scrollY;
    if(y > 0 ){
        nav.classList.add('sticky')
    }
})

// Edit content
var edit = Array.from(document.getElementsByClassName('edit'));
var save = Array.from(document.getElementsByClassName('save'));

edit.forEach(function(element, index){
    element.addEventListener('click', function(){
        var item = Array.from(document.querySelectorAll('#group' + (index + 1) + ' .list-group-item'));
        var icon = $('#group' + (index + 1) + ' .icon')
        // var wraps = document.querySelectorAll('#group' + (index + 1) + ' .wrap-item');
        // wraps.forEach(el => {
        //     el.innerHTML += "<button class='btn btn-danger remove'><i class=\"fa fa-trash\"></i></button>";
        // })
        
        item.forEach((el, ind) => {
            //console.log(el)
            el.innerHTML += "<button class='btn btn-danger remove'><i class=\"fa fa-trash\"></i></button>";
            const remove = $('#group' + (index + 1) + ' .remove');
            el.setAttribute('contentEditable', 'true');
            $(remove[ind]).click(function(){
                $(item[ind]).remove();
                if(index === 0){
                    $(icon[ind]).remove();
                }
            })
            
            $(el).click(function() {
                $(remove[ind]).remove();
                
                CKEDITOR.disableAutoInline = true;
                CKEDITOR.dtd.$removeEmpty['i'] = false;
                CKEDITOR.inline(item[ind], {
                    format_tags : 'p;h1;h2;h3;h4;h5;h6;pre;address;div',
                    removeButtons: 'Cut,Copy,Paste,Undo,Redo,Anchor',
                    extraPlugins: 'colorbutton,justify,liststyle,exportpdf,sourcedialog',
                    removePlugins: 'scayt,sourcearea,removeformat,magicline',
                    allowedContent: true
                });
                
            })
        })
        save[index].classList.add('show');
        element.style.display = 'none';
        save[index].addEventListener('click', function(){
            $('#group' + (index + 1) + ' .list-group-item').attr('contentEditable', 'false');
            $('#group' + (index + 1) + ' .remove').remove();
            
            element.style.display = 'inline-block';
            save[index].classList.remove('show');
        })
        
    })
})

// Scroll active menu
const sections = document.querySelectorAll('section');

onscroll = function(){
    var scrollPosition = document.documentElement.scrollTop;

    sections.forEach(section => {
        if(scrollPosition >= section.offsetTop - section.offsetHeight*0.25 &&
            scrollPosition < section.offsetTop + section.offsetHeight - section.offsetHeight*0.25){
            var currentId = section.attributes.id.value;
            removeAllClassActive();
            addClassActive(currentId);
        }
    })
}

removeAllClassActive = function(){
    document.querySelectorAll('.navbar-nav .nav-item').forEach(el => {
        el.classList.remove('active');
    })
}

addClassActive = function(current){
    var id = `[data-page='${current}']`;
    document.querySelector(id).classList.add('active');
}

// Drag and Drop Items
// const container_drags = document.querySelectorAll('.container-drag');
// const draggables = document.querySelectorAll('.draggable');

// draggables.forEach((element) => {
//     element.addEventListener('dragstart', () => {
//         element.classList.add('dragging');
//     })

//     element.addEventListener('dragend', () => {
//         element.classList.remove('dragging');
//     })
// })

// container_drags.forEach(container_drag => {
//     container_drag.addEventListener('dragover', e => {
//         e.preventDefault();
//         const dragAfter = getDragAfterElement(container_drag, e.clientY);
//         console.log(dragAfter)
//         const draggable = document.querySelector('.dragging');
    
//         if(dragAfter == null){
//             container_drag.appendChild(draggable);
//         }
//         else{
//             container_drag.insertBefore(draggable, dragAfter);
//         }
//     })

// })

// function getDragAfterElement(container, y){
//     const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];
//     return draggableElements.reduce((closest, child) => {
//         const box = child.getBoundingClientRect();
//         const offset = y - box.top - box.height / 2;

//         if(offset < 0 && offset > closest.offset)
//             return {offset: offset, element: child }
//         else
//             return closest
//     }, {offset: Number.NEGATIVE_INFINITY}).element
// }



$('.list-group:not(#group5, #group6)').sortable({
    animation: 150
});

$('#group5, #group6').sortable({
    group: 'list',
    animation: 150
})

/* Set Image */
const img = document.querySelector('#avatar');
const btnFile = document.querySelector('#file');

btnFile.addEventListener('change', function() {
    const file = this.files[0];
    if(file){
        const reader = new FileReader();
        reader.onload = function(){
            const result = reader.result;
            img.setAttribute('src', result);
        }
        reader.readAsDataURL(file);
    }
})
