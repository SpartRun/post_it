

function newPostIt($refs, $event){
  if(
    $refs.state.checked
    && ($event.target.id != 'postitState')
    && !$event.target.offsetParent.classList.contains('post-it')
    && !$event.target.offsetParent.classList.contains('wrapper')){
    $event.preventDefault()

    let target = ($event.target.nodeName == 'IMG') || ($event.target.nodeName == 'A') ? $event.target.parentElement : $event.target

    console.log(target)
    let rect = target.getBoundingClientRect();


    let leftPercent = (($event.clientX - rect.left) / rect.width * 100).toFixed(3)
    let topPercent = (($event.clientY - rect.top) / rect.height * 100).toFixed(3)

    target.style.position = 'relative'
    let newComment = document.createElement('div')
        newComment.setAttribute('x-data', '{ open: false, postItClass: "post-it basic" }')
        newComment.setAttribute(':class', 'postItClass')
        newComment.style.top = topPercent + '%'
        newComment.style.left = leftPercent + '%'
        newComment.innerHTML = `
        <div @click="open = true" class="close"></div>
        <div class="wrapper" x-show="open" @click.away="open = false" >
          <select
            @change="postItClass = 'post-it ' + $el.querySelector('select').value">
            <option class="basic" value="basic">Basic</option>
            <option class="important"  value="important">Important</option>
            <option class="essentiel"  value="essentiel">Essentiel</option>
          </select>
          <div contenteditable="true"></div>
        </div>
                                `
    target.appendChild(newComment)
  }else{

  }
}
