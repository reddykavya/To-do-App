let arr = [];

function addItem(value){

    fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: value,
      completed:false
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => {
        arr.push(json);
        renderList(arr);
    });

}

function updateItem(item){
    fetch(`https://jsonplaceholder.typicode.com/posts/${item.id}`, {
  method: 'PUT',
  body: JSON.stringify(item),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
}

fetch('https://jsonplaceholder.typicode.com/posts')
  .then((response) => response.json())
  .then((json) =>{
      arr = json;
      renderList(arr);
      console.log(arr)
  });

let addBtn= document.getElementById('add');
addBtn.addEventListener('click', add);


function add(){
    const inputElement =  document.getElementById('todoInputname')
    let inputVal = inputElement.value;
    const isDuplicate = arr.filter((item)=>{
      if(item.title === inputVal){
          return item
      }
    });
    if(isDuplicate.length > 0){
      alert("duplicate item is trying to add")
    }else{
        addItem(inputVal);
    }
    
    inputElement.value = ""
    renderList(arr);
}
function renderList(taskarr){
    let list = ``;
   
    taskarr.forEach((arr)=>{
        list = list+`<tr>
        <td data-id="${arr.id}" class="${arr.completed ? "marked":"notmarked"}">${arr.title}</td> 
        <td> <button type="button" data-id="${arr.id}"  class="edit">Edit</button></td>
        <td> <button type="button" data-id="${arr.id}" id="add" class="delete">Delete</button></td>
        </tr>`
    })
     
    document.getElementById('todolist').innerHTML = list
}
renderList(arr);

document.body.addEventListener('click',(e)=>{
    if(e.target.tagName === "TD"){
        const id = e.target.getAttribute("data-id");

        arr = arr.map((item)=>{
            if(item.id == id){
                item.completed = true;
                return item
            }else{
                return item
            }

        });
        renderList(arr);

    }else if(e.target.tagName === "BUTTON"){
        const id = e.target.getAttribute("data-id");
        let currentUpdateItem = {} 
        if(e.target.innerHTML === "Edit"){
            const editItem = arr.filter((item)=>{
                if(item.id == id){
                    currentUpdateItem = item;
                    return item;
                } 
            });
            const editVal = editItem[0].title;
             
            const inputContainer =  document.getElementById("inputContainer")

            inputContainer.innerHTML=`
            <input type="text" class="todo-user-input" value="${editVal}" placeholder="What needs to be add?" id="todoUpdatename" />
                <button type="button" id="update"  class="list-button">
                   Save Task
                </button>
            `;

    const todoUpdatename = document.getElementById("todoUpdatename");
    const updateBtn = document.getElementById('update');
    
    updateBtn.addEventListener('click',function(){
        currentUpdateItem.title = todoUpdatename.value;
        updateItem(currentUpdateItem);
      
        inputContainer.innerHTML=`<input type="text" class="todo-user-input" placeholder="What needs to be add?" id="todoInputname" />
        <button type="button" id="add"  class="list-button">
           Add Task
        </button>`;
        addBtn= document.getElementById('add');
        addBtn.addEventListener('click', add);
    });

          }
        else if(e.target.innerHTML === "Delete"){
            fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
                    method: 'DELETE'});
            arr = arr.filter((item) => {
                
                if (item.id == id){
                  
                }else{
                    return item
                }
            });
        }

        renderList(arr)
    }
    else{
        console.log("not clicked on td")
    }
})








 






