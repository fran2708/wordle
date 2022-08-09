function getElements(){
    user = document.getElementById("txt-user")
    btnNew = document.getElementById("btn-new")
    btnLoad = document.getElementById("btn-load")
    lblErrorEmpty = document.getElementById("error-empty")
    lblErrorNew = document.getElementById("error-new")
    lblErrorLoad = document.getElementById("error-load")
}

window.onload = () => {
    getElements()
    hideLabels()

    btnNew.onclick = (e) => {
        hideLabels()
        let currentUser = user.value
        if (currentUser) {
            if (localStorage.getItem(`saveGame${currentUser}`) === null) {
                sessionStorage.setItem("user", user.value)
                sessionStorage.setItem("isNew", true)
                location.href = 'html/game.html'
            } else {
                lblErrorNew.classList.toggle("hidden",false)
            }
        } else {
            lblErrorEmpty.classList.toggle("hidden",false)
        }
    }

    btnLoad.onclick = (e) => {
        hideLabels()
        let currentUser = user.value
        if (currentUser) {
            if ((`saveGame${currentUser}` in localStorage)) {
                sessionStorage.setItem("user", user.value)
                sessionStorage.setItem("isNew", "false")
                location.href = 'html/game.html'
            } else {
                lblErrorLoad.classList.toggle("hidden",false)
            }
        } else {
            lblErrorEmpty.classList.toggle("hidden",false)
        }
    }
}

function hideLabels () {
    user.onfocus = () => {
        lblErrorEmpty.classList.toggle("hidden", true)
        lblErrorNew.classList.toggle("hidden", true)
        lblErrorLoad.classList.toggle("hidden", true)
    }
}

