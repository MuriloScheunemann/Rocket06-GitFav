import { GithubUser } from "./GithubUser.js";


// Classe para logica dos dados
export class FavoritesLogic {
    constructor(){
    }

    async addFavoriteOn(username){

        // Função de validação - usuário existe

        const user = await GithubUser.searchForUser(username)

        // Função de validação - usuário não encontrado

        this.entries = [user, ...this.entries]

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

    updateList(){
        this.entries.forEach(entry => {
            const row = this.createRow()

            row.querySelector('.link').href = `https://github.com/${entry.login}`
            row.querySelector('.avatar').src = `https://github.com/${entry.login}.png`
            row.querySelector('.name').textContent = `${entry.name}`
            row.querySelector('.username').textContent = `${entry.login}`
            row.querySelector('.repositories').textContent = `${entry.public_repos}`
            row.querySelector('.followers').textContent = `${entry.followers}`


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
            <button class="cancelar">Cancelar</button>
        </td>
        </tr>
        `
        return tr;
    }
}


