import './EditMesaPage.css'
import { createHeader } from '../../shared/Header.js'
import { logout } from '../../shared/util.js';

const pageName = 'Editar Mesa';

class EditMesaPage extends HTMLElement {
    connectedCallback() {
        this.classList.add('ion-page');
        const cabecalho = createHeader(pageName);
        
        // Pegar o ID da mesa da URL
        const pathParts = window.location.pathname.split('/');
        const mesaId = parseInt(pathParts[pathParts.length - 1]) || 0;
        
        // Buscar os dados da mesa
        const mesa = this.fetchMesaById(mesaId);
        
        this.innerHTML = `
            ${cabecalho}
            <ion-content class="ion-padding">
                <form id="form-mesa">
                    <ion-list>
                        <ion-item>
                            <ion-input type="number" name="qtd_cadeiras"
                            label="Quantidade de Cadeiras" label-placement="floating" value="${mesa ? mesa.qtd_cadeiras : ''}" required>
                            </ion-input>
                        </ion-item>
                    </ion-list>
                    <div class="ion-padding">
                        <ion-button expand="block" type="submit" class="ion-margin-top">
                        Salvar Mesa
                        </ion-button>
                        <ion-button expand="block" color="danger" id="btn-cancelar">
                        Cancelar
                        </ion-button>
                    </div>
                </form>
            </ion-content>
        `;
        this.querySelector('#logout-btn')
        .addEventListener('click', logout);
        this.querySelector('#btn-cancelar').addEventListener('click', () => window.history.back());
    }

    fetchMesaById(id) {
        const mesas = [
            { "id": 1, "qtd_cadeiras": 4 },
            { "id": 2, "qtd_cadeiras": 6 },
            { "id": 3, "qtd_cadeiras": 2 }
        ];
        return mesas.find(m => m.id === id);
    }
}

customElements.define('edit-mesa-page', EditMesaPage);