let count = 1
let usersTable = document.getElementById("users-table-body");

DB.collection("users").get().then((querySnapshot) => {
   
    querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data().username}`);
        let tr = `
            <tr>
                <th scope="row">${count}</th>
                <td>${doc.data().email}</td>
                <td>${doc.data().displayName}</td>
                <td>
                    <button type="button" class="btn btn-light" id="${"deleteUser-"+doc.id}" onclick="deleteUser('${doc.id}')">Delete</button>
                    <button type="button" class="btn btn-light" id="${"updateUser-"+doc.id}" onclick="updateUser('${doc.id}')">Update</button>
                </td>
            </tr>
        `;
        usersTable.innerHTML += tr;
        count += 1;
    });
});

function deleteUser(id) {
    $("#deleteUserModal").modal()
    document.getElementById("deleteUserConfirm").addEventListener("click", async function() {
        await DB.collection("users").doc(id).delete() 
        $('#deleteUserModal').modal('hide');
        window.location.href = "users.html"
    })
}


async function updateUser(id) {
    $("#updateUserModal").modal()
    let user = DB.collection("users").doc(id);
    

    await user.get().then(function (doc) {
        document.getElementById("email").value = doc.data().email
        document.getElementById("password").value = doc.data().password
        document.getElementById("displayName").value = doc.data().displayName
    });
    document.getElementById("updateUserConfirm").addEventListener("click", async function() {
        let newEmail = document.getElementById("email").value
        let newPassword = document.getElementById("password").value
        let newDisplayName = document.getElementById("displayName").value
        await user.set({
            email: newEmail,
            password: newPassword,
            displayName: newDisplayName,
            isAdmin : false
        });
        $('#updateUserModal').modal('hide');
        location.reload()
    })
}


