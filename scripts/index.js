function getElements(){
    user = document.getElementById("txt-user")
    btnNew = document.getElementById("btn-new")
    btnLoad = document.getElementById("btn-load")
    lblErrorNew = document.getElementById("error-new")
    lblErrorLoad = document.getElementById("error-load")
}

window.onload = () => {
    getElements()
    hideLabels()

    btnNew.onclick = (e) => {
        let currentUser = user.value
        if (localStorage.getItem(`saveGame${currentUser}`) === null) {
            sessionStorage.setItem("user", user.value)
            sessionStorage.setItem("isNew", true)
            location.href = '/html/game.html'
        } else {
            lblErrorNew.classList.toggle("hidden", false)
        }
    }

    btnLoad.onclick = (e) => {
        let currentUser = user.value
        if (!localStorage.getItem(`saveGame${currentUser}`) === null) {
            
        }
    }
}

function hideLabels () {
    user.onfocus = () => {
        lblErrorNew.classList.toggle("hidden", true)
        lblErrorLoad.classList.toggle("hidden", true)
    }
}

