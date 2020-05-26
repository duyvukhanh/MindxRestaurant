


document.getElementById("addMenuForm").addEventListener("submit",async function(event){
    event.preventDefault();
    let addMenuForm = document.getElementById("addMenuForm");
    let category = []
    let name = addMenuForm.name.value
    let description = addMenuForm.description.value
    let imageURL = addMenuForm.imageURL.value
    let price = addMenuForm.price.value
    let checkboxes = document.getElementsByClassName("form-check-input")
    for (checkbox of checkboxes) {
        if (checkbox.checked) {
            category.push(checkbox.value)
        }
    }
    let dish = {
        name : name,
        description : description,
        imageURL : imageURL,
        price : Number(price),
        category : category
    }
    await DB.collection("menu").add(dish)
    window.location.href = "menu.html"
})
