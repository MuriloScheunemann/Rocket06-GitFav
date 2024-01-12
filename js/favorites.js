import { GithubUser } from "./GithubUser.js";

// Classe para logica dos dados
export class FavoritesLogic {
    constructor(){
    }

    async addFavoriteOn(username){

        if(this.ifUserAlreadyIn(username)){
            alert("Usuário já adicionado!")
            return
        }
        
        const user = await GithubUser.searchForUser(username)

        if(this.ifUserExists(user)){
            alert("Usuário não existe!")
            return
        }

        this.entries = [user, ...this.entries]

        this.updateList()
        
    }

    ifUserAlreadyIn(username){
        return this.entries.find( user => user.login === username)
    }

    ifUserExists(user){
        return user.name === undefined
    }

    removeUser(user){
        this.entries = this.entries.filter(entry => entry.login !== user.login)

        this.updateList()
    }
    
}

// Classe para renderizar o HTML
export class FavoritesHTML extends FavoritesLogic {
    constructor(){
        super()
        this.entries = []
        this.addEvent()
    }

    addEvent(){
        const addButton = document.querySelector('.addButton')
       
        addButton.onclick = () => {
            const { value } = document.querySelector('.favoriteInput')
            console.log('oi');

            this.addFavoriteOn(value)
        }
    }

    removeEvent(row, user){
        row.querySelector('.removeButton').onclick = () => {
            this.removeUser(user)
        }
    }

    updateList(){
        document.querySelector('tbody').innerHTML = ''

        this.entries.forEach(user => {
            const row = this.createRow()

            row.querySelector('.link').href = `https://github.com/${user.login}`
            row.querySelector('.avatar').src = `https://github.com/${user.login}.png`
            row.querySelector('.name').textContent = `${user.name}`
            row.querySelector('.username').textContent = `${user.login}`
            row.querySelector('.repositories').textContent = `${user.public_repos}`
            row.querySelector('.followers').textContent = `${user.followers}`

            this.removeEvent(row, user)

            document.querySelector('tbody').append(row)
        })

    }

    createRow() {
        const tr = document.createElement('tr')
        tr.innerHTML = `
        <tr>
        <td class="user">
        <img src="" alt="" class="avatar">
            <a href="" class="link">
                <p class="name"></p>
                <span class="username"></span>
            </a>
        </td>
        <td class="repositories"></td>
        <td class="followers"></td>
        <td>
            <button class="removeButton">Cancelar</button>
        </td>
        </tr>
        `
        return tr;
    }

}


