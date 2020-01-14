const firestore = firebase.firestore()
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
        document.getElementById('name').innerText = data['fname']+" "+data['lname']
        document.getElementById('desig').innerText = data['desig']+"@"+data['placeOfWork']
        document.getElementById('image').src = data['profilePic']
        document.getElementById('about').innerText = data['about']
    }
    catch(e)
    {
        console.log(e)
    }
    finally{
        hideModal()
    }
})