async function methodGetUsers() {
    let xhr = new XMLHttpRequest()
    let xhr2 = new XMLHttpRequest()
    xhr.open('GET','https://jsonplaceholder.typicode.com/todos', true)
    xhr2.open('GET','https://jsonplaceholder.typicode.com/users', true)
    xhr.send()
    xhr2.send()

    xhr.onload = function(){
        let response = JSON.parse(xhr.response)
        
        if (response && Array.isArray(response) && response.length > 0) {
            xhr2.onload = function() {
                let usersData = JSON.parse(xhr2.response)
                response.forEach((user, index) => {
                    let userObj = usersData.find((userData) => userData.id === user.userId)
                    let userName = userObj.name || 'N/A'
                    
                    let row = '<tr>'
                    row += '<td>'+user.id+'</td>'
                    row += '<td>'+userName+'</td>'
                    row += '<td>'+user.title+'</td>'
                    if (user.completed == true) {
                        row += '<td> <input type="checkbox" checked /> </td>'
                    } else {
                    row += '<td> <input type="checkbox" /> </td>'
                    }

                    row += '</tr>'
                    
                    $('table tbody').append(row)
                })
            }
        }
    }      
}
