const firestore = firebase.firestore()
const cardContainer = document.getElementById('content-cards')
function showModal()
{
    $('#modal').modal('show')
}
function hideModal()
{
    $('#modal').modal('hide')
}
$(document).ready(async ()=>{
    showModal()
	var colRef = firestore.collection("Users").doc("Data")
	try{
        var ref = await colRef.get()
        const data = ref.data()
        cards = data["works"]
        cards.forEach(element => {
            createWorkCard(element)
        });
    }
    catch(e)
    {
        console.log(e)
    }
    finally{
        hideModal()
    }
})
let createWorkCard = (work)=> 
{
    let card = document.createElement('div');
    card.className = 'card shadow cursor-pointer my-3';

    let cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    let title = document.createElement('h4');
    title.innerText = work.title;
    title.className = 'card-title subheading';

    let subtitle = document.createElement('h5');
    subtitle.innerText = work.abstract;
    subtitle.className = 'card-subtitle mt-2 mb-4 text-muted'

    let br = document.createElement('br')

    let footer  = document.createElement('div')
    footer.className = 'd-flex'
    let lnk = document.createElement('a');
    lnk.href = work.url
    lnk.target = "_blank"
    lnk.innerText = 'Read More'
    lnk.className = 'card-subtitle mb-2 text-muted text-right link';
    footer.appendChild(lnk)

    cardBody.appendChild(title);
    cardBody.appendChild(subtitle);

    cardBody.appendChild(footer);
    card.appendChild(cardBody);
    cardContainer.appendChild(card);
}

