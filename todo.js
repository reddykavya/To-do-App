showtask();
var addtaskinput = document.getElementById('addtaskinput')
let addtaskbtn = document.getElementById("addtaskbtn");

addtaskbtn.addEventListener("click", function(e){
    addtaskinputval = addtaskinput.value; 
    e.preventDefault();
    const fetchData = async () => {
        await fetch("https://jsonplaceholder.typicode.com/users")
          .then((response) => response.json())
          .then((data) => console.log(data));
      };

var obj = {
    title : document.getElementById('addtaskinput').value
}

fetch('https://jsonplaceholder.typicode.com/users', {
  method: 'POST',
  body: JSON.stringify(obj),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));


  //============================================================

    if(addtaskinputval.length == 0){
        alert("enter task details")
    }

    if(addtaskinputval.trim()!=0){
        taskObj = [];
        let webtask = localStorage.getItem("localtask");
        if(webtask == null){
            taskObj = [];
        }
        else{
            taskObj = JSON.parse(webtask);   
        }

     let found = taskObj.filter(item => item.task_name == addtaskinputval);
     if(found.length == 0){
        taskObj.push({'task_name':addtaskinputval, 'completeStatus':true});
        localStorage.setItem("localtask", JSON.stringify(taskObj));
        addtaskinput.value = '';
     }
     else{   
        addtaskinput.value = '';
     }
        console.log(taskObj)
    }
    showtask();
})

// showtask
function showtask(){
    let addtaskinput = document.getElementById("addtaskinput");
    let webtask = localStorage.getItem("localtask");
     addtaskinputval = addtaskinput.value;
    if(webtask == null){
        taskObj = [];
    }
    else{
        taskObj = JSON.parse(webtask);
    }
    let html = '';
    let addedtasklist = document.getElementById("addedtasklist");

    taskObj.forEach((item, index) => {

        if(item.completeStatus==true){
            taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
            
        }else{
          
            taskCompleteValue = `<td>${item.task_name}</td>`;
        }
        html += `<tr>
                    <th>${index+1}</th>
                    ${taskCompleteValue}
                    <td><button onclick="edittask(${index})" class="edit"><i class="fa fa-edit"></i></button></td>
                    <td><button onclick="deleteitem(${index})" class="delete"><i class="fa fa-trash"></i></button></td>
                </tr>`;
    });
    
    addedtasklist.innerHTML = html;
    
}

// edittask
function edittask(index){
   var obj1 = {
    title : document.getElementById('addtaskinput').value
}
    let saveindex = document.getElementById("saveindex");
    let addtaskbtn = document.getElementById("addtaskbtn");
    let savetaskbtn = document.getElementById("savetaskbtn");
    saveindex.value = index;
    let webtask = localStorage.getItem("localtask");
    var taskObj = JSON.parse(webtask); 
    
    addtaskinput.value = taskObj[index]['task_name'];
    addtaskbtn.style.display="none";
    savetaskbtn.style.display="block";
    
}

// savetask
let savetaskbtn = document.getElementById("savetaskbtn");
savetaskbtn.addEventListener("click", function(){
    let addtaskbtn = document.getElementById("addtaskbtn");
    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask); 
    let saveindex = document.getElementById("saveindex").value;
    
    for (keys in taskObj[saveindex]) {
        if(keys == 'task_name'){
            taskObj[saveindex].task_name = addtaskinput.value;
            fetch('http://localhost:3000/posts/3', {
  method: 'PUT',
  body: JSON.stringify(taskObj[saveindex]),
  headers: {
    'Content-type': 'application/json; charset=UTF-8',
  },
})
  .then((response) => response.json())
  .then((json) => console.log(json));
        }
      }
  
    savetaskbtn.style.display="none";
    addtaskbtn.style.display="block";
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    addtaskinput.value='';
    showtask();
})
// deleteitem
function deleteitem(index){

    let webtask = localStorage.getItem("localtask");
    let taskObj = JSON.parse(webtask);
    taskObj.splice(index, 1);
    localStorage.setItem("localtask", JSON.stringify(taskObj));
    
    let options = {
        method:"DELETE"
    }
    fetch('http://localhost:3000/posts/1',options)
    .then(response =>console.log(response.status));
    showtask();
}








