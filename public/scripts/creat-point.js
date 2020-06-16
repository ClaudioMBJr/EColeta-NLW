
// console.log("Hello") <- Escreve no console da página
// a função fetch vai até o endereço e retorna, a função then trabalha com o que foi retornado
// fetch("https://servicodados.ibge.gov.br/api/v1/localidades/distritos").then(function(reposta) {console.log(resposta)})
// () => {} função anônima 


function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")
    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then( states => {
        for(const state of states ){
            ufSelect.innerHTML += `<option value ="${state.id}">${state.nome}</option>`
        }
    })
}

populateUFs()



function getCities(event){
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    const ufValue = event.target.value //pega o value da caixa de seleção de estados
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios `
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true
    fetch(url)
    .then(res => res.json())
    .then( cities => {
        for(const city of cities ){
            citySelect.innerHTML += `<option value ="${city.nome}">${city.nome}</option>`
        }
        citySelect.disabled = false
    })
}

document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)



//itens de coleta


const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect){
     item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items]")

let selectedItems = []

function handleSelectedItem(click){
    const itemLi = event.target
    //adicionar ou remover um classe com javascript
    itemLi.classList.toggle("selected")
    const itemId = itemLi.dataset.id
    
    //verificar se existem itens selecionados
    //se sim, pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex( function (item){
        return item == itemId
    })

    //se já estiver selecionado

    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }else {
        //se não estiver selecionado, adicionar à seleção
        selectedItems.push(itemId)
    }

    //atualizar o campo escondido com os itens selecionado
    collectedItems.value = selectedItems
}
