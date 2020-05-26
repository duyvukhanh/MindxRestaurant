let count = 1
let menuTable = document.getElementById("menu-table-body");

DB.collection("menu").get().then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
        let tr = `
            <tr>
                <th scope="row">${count}</th>
                <td>
                    <div class="admin-menu-image">
                        <img src="${doc.data().imageURL}" alt="">
                    </div>
                </td>
                <td>${doc.data().name}</td>
                <td>${doc.data().description}</td>
                <td>
                    <button type="button" class="btn btn-light" id="${"deleteMenu-" + doc.id}" onclick="deleteMenu('${doc.id}')">Delete</button>
                    <button type="button" class="btn btn-light" id="${"updateMenu-" + doc.id}" onclick="updateMenu('${doc.id}')">Update</button>
                </td>
            </tr>
        `
        menuTable.innerHTML += tr;
        count += 1;
    });
});


document.getElementById("addBtn").addEventListener("click", function (event) {
    event.preventDefault();
    window.location.href = "menu-add.html"
})




function deleteMenu(id) {
    $("#deleteMenuModal").modal()
    document.getElementById("deleteMenuConfirm").addEventListener("click", async function() {
        await DB.collection("menu").doc(id).delete() 
        $('#deleteMenuModal').modal('hide');
        window.location.href = "menu.html"
    })
}


async function updateMenu(id) {
    $("#updateMenuModal").modal()
    let dish = DB.collection("menu").doc(id);
    let checkboxes = document.getElementsByClassName("form-check-input")

    await dish.get().then(function (doc) {
        document.getElementById("name").value = doc.data().name
        document.getElementById("price").value = doc.data().price
        document.getElementById("imageURL").value = doc.data().imageURL
        document.getElementById("description").value = doc.data().description
        for (let category of doc.data().category) {
            for (let checkbox of checkboxes) {
                if (checkbox.value === category) {
                    checkbox.checked = true
                }
            }
        }
    });
    document.getElementById("updateMenuConfirm").addEventListener("click", async function() {
        let newName = document.getElementById("name").value
        let newPrice = document.getElementById("price").value
        let newImageURL = document.getElementById("imageURL").value
        let newDescription = document.getElementById("description").value
        let newCategory = []
        for (checkbox of checkboxes) {
            if (checkbox.checked) {
                newCategory.push(checkbox.value)
            }
        }
        await dish.set({
            name: newName,
            description: newDescription,
            imageURL: newImageURL,
            price: Number(newPrice),
            category: newCategory
        });
        $('#updateMenuModal').modal('hide');
    })
}

