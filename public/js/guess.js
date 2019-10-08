function language(KEY){
    // Remember this function needs to do something.
}

const nameInput = document.getElementById("userName");
function processName() {
    if(nameInput){
        const name = nameInput.value;
        if(name.length > 0){
            fetch(`/start/${name}`).then(resp =>{
                if(resp.ok){
                    return resp.json();
                }
            }).then(json => {
                document.getElementById("numMin").textContent = json.min;
                document.getElementById("numMax").textContent = json.max;

                // Make Number input Visible
                let numberElement = document.getElementsByClassName("number");
                for(let i = 0; i !== numberElement.length; ++i)
                {
                    numberElement[i].style.visibility = "visible";
                }
            });
        }
    }
}
function processGuess() {
    const name = nameInput.value;
    let number = Number(document.getElementById("guess").value);
    fetch(`/guess/${name}/${number}`, {
        method: 'post'
    }).then(resp => {
        if (resp.ok) {
            return resp.json();
        }
    }).then(json => {
        document.getElementById("msg").textContent = json.msg;
        //console.log(json.msg);
    });
}

const subUser = document.getElementById("subUser");
subUser.addEventListener('click', processName);
const subGuess = document.getElementById("subGuess");
subGuess.addEventListener('click', processGuess);