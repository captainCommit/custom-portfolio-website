var dataObject = {}
const uploadObject = {}
const storage = firebase.storage()
const firestore = firebase.firestore()
window.uploadWork = false
window.uploadCV = false
window.uploadProfile = false
window.uploadbit = false
$(document).ready(function() {
    populate()
    $("#about").on('keydown', function() {
        var words = this.value.length;
        if (words > 500) {
            // Split the string on first 200 words and rejoin on spaces
            this.value = this.value.substring(0, 500);
            // Add a space at the end to keep new typing making new words
            $(this).val(trimmed + " ");
        }
        else {
            $('#chars_left').text(500-words);
        }
    });
 });
$("#image").click(function() {
    $("input[id='profile']").click()
});
function valid_res(arr)
{
    if(arr)
        return true;
    else    
        return false;
}
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
async function populate()
{
    console.log('e')
    showModal('load-modal')
    firestore.collection('Users').doc("Data").get().then((doc)=> {
        if (doc.exists) {
            const data = doc.data()
            for(var o in document.getElementById('salutation').options)
            {
                if(data["salutaion"] === document.getElementById('salutation').options[o].value)
                {
                    document.getElementById('salutation').selectedIndex = o
                }
            }
            document.getElementById('fname').value = data['fname']
            document.getElementById('lname').value = data['lname']
            document.getElementById('desig').value = data['desig']
            document.getElementById('placeofwork').value = data['placeOfWork']
            document.getElementById('about').value = data['about']
            document.getElementById('image').src = data["profilePic"]
            window.picUrl = data["profilePic"]
            populateTable(data['works'])
            populateCV(data['CV'])

        } else {
            
            console.log("New Form")
        }
    }).catch(function(error) {
        console.log("Error getting document:", error);
    }).finally(()=>{
        hideModal('load-modal')
    })
}
function populateTable(table_data)
{
    $('#works').find("tr:gt(1)").remove();
    for(var i in table_data)
    {
        var row = document.createElement('tr')
        var col1 = document.createElement('td')
        var col2 = document.createElement('td')
        var col3 = document.createElement('td')
        var col4 = document.createElement('td')

        const btn = document.createElement('button')
        btn.className += "btn btn-warning"
        btn.type = "button"
        btn.id = "remove"
        btn.setAttribute('onclick','removeRow(this)')
        btn.innerHTML = '<i class="fa fa-minus"></i>'


        var input1 = document.createElement('input')
        input1.type = "text"
        input1.classList.add("form-control")
        input1.required = true
        input1.id = 'title'
        input1.value = table_data[i]["title"]
        
        var input2 = document.createElement('textarea')
        input2.cols = 40
        input2.rows = 1
        input2.required = true
        input2.classList.add("form-control")
        input2.id = "abstract"
        input2.value = table_data[i]["abstract"]


        const link = document.createElement('a')
        link.href = table_data[i]["url"]
        link.innerText = "Link To File"
        link.target = "_blank"
        link.id = 'anchor'


        col1.appendChild(input1)
        col2.appendChild(input2)
        col3.appendChild(link)
        col4.appendChild(btn)

        row.appendChild(col1)
        row.appendChild(col2)
        row.appendChild(col3)
        row.appendChild(col4)

        document.getElementById('works').appendChild(row)
    }
}
function populateCV(data)
{
    document.getElementById('previousCVs').style.visibility = "visible"
    document.getElementById('currentCV').href=data
    document.getElementById('currentCV').innerText = "Link to CV"
}
function submitTable()
{
    const works = document.getElementById('works')
    var arr = []
    for(var x = 2; x < works.rows.length ; x++)
    {
        var object = {}
        for(var y = 0; y < works.rows[x].cells.length-1; y++)
        {
            var element = works.rows.item(x).cells[y];
            if( y == 2)
            {
                if(element.childNodes[0].tagName == 'A')
                {
                    object["url"] = element.childNodes[0].href
                }
                else if(element.childNodes[0].files.length == 0)
                {
                    console.log("break")
                    break
                }
                else{
                    object["workFile"] = element.childNodes[0].files[0]
                    if(window.uploadWork == false)
                        window.uploadWork = true
                }
            }
            else if(y==1){
                object["abstract"] = element.childNodes[0].value
            }
            else if(y==0){
                object["title"] = element.childNodes[0].value
            }
        }
        arr.push(object)
    }
    return arr
}
const addWorks = document.getElementById('addWorks')
const profile = document.getElementById('profile')
const image = document.getElementById('image')
const submit = document.getElementById('submit')
const list = document.getElementById('list')
submit.addEventListener('click',submitForm)
addWorks.addEventListener('click',addRowWorks)
function change(e)
{
    if (e.files && e.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function(ev) {
          $('#image').attr('src', ev.target.result);
        }
        reader.readAsDataURL(e.files[0]);
      }
}
function addRowWorks()
{
    const table = document.getElementById('works')
    const row = document.createElement('tr')
    const col1 = document.createElement('td')
    const col2 = document.createElement('td')
    const col3 = document.createElement('td')
    const col4 = document.createElement('td')
    const input1 = document.createElement('input')
    const input2 = document.createElement('textarea')
    const input3 = document.createElement('select')
    const btn = document.createElement('button')
    //Title input
    input1.type = "text"
    input1.placeholder = "Title"
    input1.classList.add("form-control")
    //input1.required = true
    input1.id = 'title'

    // Abstract input
    input2.cols = 40
    input2.rows = 1
    input2.placeholder = "Abstract"
    input2.classList.add("form-control")
    input2.id = "abstract"
    //input2.required = true
    
    const fileInput = document.createElement('input')
    fileInput.type = "file"
    fileInput.classList.add("form-control")
    //fileInput.required = true
    fileInput.accept="application/pdf"
    fileInput.id = 'file'
    
    btn.className += "btn btn-warning"
    btn.type = "button"
    btn.id = "remove"
    btn.setAttribute('onclick','removeRow(this)')
    btn.innerHTML = '<i class="fa fa-minus"></i>'
    col1.appendChild(input1)
    col2.appendChild(input2)
    col3.appendChild(fileInput)
    col4.appendChild(btn)
    row.appendChild(col1)
    row.appendChild(col2)
    row.appendChild(col3)
    row.appendChild(col4)
    table.appendChild(row)
}
function removeRow(ele)
{
    var e = ele.parentNode.parentNode
    e.remove()
}
async function submitForm()
{
    try
    {
        document.getElementById('submit').classList.add('running');
        const sal = document.getElementById('salutation').options[document.getElementById('salutation').selectedIndex].value
        const fName = document.getElementById('fname').value
        const lName = document.getElementById('lname').value
        const desig = document.getElementById('desig').value
        const placeOfWork = document.getElementById('placeofwork').value
        const about = document.getElementById('about').value
        const profilePic = document.getElementById('profile')
        const CV = document.getElementById('resume')
        const result = submitTable()
        dataObject["salutaion"] = sal
        dataObject["fname"] = fName
        dataObject["lname"] = lName
        dataObject["about"] = about
        dataObject["desig"] = desig
        dataObject["placeOfWork"] = placeOfWork
        if(!CV.files && !document.getElementById('currentCV').href)
        {
            Swal.fire('Error','CV field cannot be empty','error')
        }
        if(!profilePic.files && !document.getElementById('profilePic').src)
        {
            Swal.fire('Error','CV field cannot be empty','error')
        }
        if(CV.files && CV.files.length == 1)
        {
            uploadObject["CV"] = CV.files[0]
            window.uploadCV = true;
        }
        else
        {
            dataObject['CV'] = document.getElementById('currentCV').href
            window.uploadCV = false
        }
        if(profilePic.files && profilePic.files.length == 1)
        {
            uploadObject["profilePic"] = profilePic.files[0]
            window.uploadProfile = true;
        }
        else
        {
            dataObject['profilePic'] = window.picUrl
            window.uploadProfile = false
        }
        dataObject = await upload(result,uploadObject,dataObject)
        console.log(dataObject)
        var res = await firestore.collection("Users").doc("Data").set(dataObject)
        document.getElementById('submit').classList.remove('running');
        Swal.fire('Success','The Portfolio Has Been Updated Successfully','success')
    }
    catch(e)
    {
        hideModal('uploadModal')
        console.log(e)
        document.getElementById('submit').classList.remove('running');
        Swal.fire('Error','Please try again','error')
    }
    
}
function uploadBitCalc()
{
    if(window.uploadWork == true || window.uploadCV ==true || window.uploadProfile ==true)
        window.uploadbit = true
    else
    window.uploadbit = false
}
async function upload(result,uploadObject,dataObject)
{
    try
    {
        uploadBitCalc()
        console.log(window.uploadbit)
        if(window.uploadbit == true)
            showModal('uploadModal')
        var works = []
        if(uploadObject["profilePic"])
        {
            var sRef_profile = storage.ref('profilePic/'+uploadObject["profilePic"].name)
            var x = await sRef_profile.put(uploadObject["profilePic"])
            var url_pic = await getUrl(x)
            list.innerHTML += uploadObject["profilePic"].name+" has been uploaded successfully<br>"
            dataObject["profilePic"] = url_pic
        }
        if(uploadObject["CV"])
        {
            var sRef_CV = storage.ref('resume/'+uploadObject["CV"].name)
            var y = await sRef_CV.put(uploadObject["CV"])
            var url_CV = await getUrl(y)
            list.innerHTML  += uploadObject["CV"].name+" has been uploaded successfully<br>"
            dataObject["CV"] = url_CV
        }
        if(result)
        {
            var z;
            for(var x in result)
            {
                var url;
                res = {}
                res["abstract"] = result[x]["abstract"]
                res["title"] = result[x]["title"]
                if(result[x]['url'])
                {
                    res["url"] = result[x]['url']
                    works.push(res)
                    continue
                }
                var file = result[x]['workFile']
                var sRef_works = storage.ref('works/'+file.name)
                z = await sRef_works.put(file)
                url = await getUrl(z)
                res["url"] = url
                list.innerHTML += file.name+" has been uploaded successfully<br>"
                works.push(res)
            }
        }
        dataObject["works"] = works
        hideModal('uploadModal')
        return dataObject
    }catch(e)
    {
        hideModal('uploadModal')
        console.log(e)
        Swal.fire('Error','Please try again','error')
    }
}
async function getUrl(reference)
{
    return await reference.ref.getDownloadURL()
}