const storage = firebase.storage();
const firestore = firebase.firestore();
var cont = document.getElementById('container')
var link = document.getElementById('lnk')
var header = document.getElementById('header')
showModal('upload-modal')
function showModal(id)
{
    //e.preventDefault();
    $('#'+id).modal('show')
}
function hideModal(id)
{
    //e.preventDefault();
    $('#'+id).modal('hide')
}
$(document).ready(()=>{
    
    firestore.collection("Users").doc("Data").get().then((doc)=>{
        if(doc.exists){
            const data = doc.data()
            const url = data['CV']
            cont.setAttribute('data',url)
            link.setAttribute('href',url)
            link.setAttribute('target','_blank')
            header.setAttribute('href',url)
            header.setAttribute('target','_blank')
            hideModal('upload-modal')
        }
    }).catch(function(err){
        hideModal('upload-modal')
        console.log(err)
    })
})

