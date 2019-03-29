window.PhoneBook = {
    apiUrl: "http://localhost:8083/phone-address",

    addItem: function () {
        // cr8 variables for every input from user
        var firstname = $("input[title='FirstName']").val();
        var lastname = $("input[title='LastName']").val();
        var number = $("input[title='Number']").val();
        var email = $("input[title='Email']").val();

        // Serializing variable for JSON format
        var data = {
            'firstname': firstname,
            'lastname': lastname,
            'number': number,
            'email': email
        };

        $.ajax({
            url: PhoneBook.apiUrl,
            method: "POST",
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(data)
        }).done(function (response) {
            console.log(response);
            // reload items table
            PhoneBook.getItems();
        });
    },

    // displayItems
    getItemRow: function (item) {
        return `<tr>
    <td>${item.id}</td>
    <td>${item.firstname}</td>
    <td class="lastname">${item.lastname}</td>
    <td class="number">${item.number}</td>
    <td class="email">${item.email}</td>
    <td><a href="#" class="fa fa-trash fa-lg text-danger delete" data-id="${item.id}"></a></td>
    <td><a href="#" class="fa fa-edit fa-lg text-info edit" data-id="${item.id}"></a></td>
    </tr>`;
    },

    displayItems: function (items) {
        console.log('Displaying items.');
        var rows = '';


        let content = items.content;

        console.log('items: ', items);
        console.log('content: ', content);

        content.forEach(item => rows += PhoneBook.getItemRow(item));
        $('#phone-address tbody').html(rows);
    },

    getItems: function () {
        $.ajax({
            url: PhoneBook.apiUrl,
            method: "GET",
        }).done(function (response) {
            console.log(response);
            // reload items table
            PhoneBook.displayItems(response)
        });
    },

    deleteItem: function (id) {
        $.ajax({
            url: PhoneBook.apiUrl + '?id=' + id,
            method: "DELETE"
        }).done(function (response) {
            console.log(response);
            // reload items table
            PhoneBook.getItems();
        });
    },

    bindEvents: function () {
        $("#create-item-form").submit(function (event) {
            event.preventDefault();

            console.log('Submitting form');

            PhoneBook.addItem();

            return false;
        });

        $('#phone-address tbody').delegate('.delete', 'click', function () {
            var id = $(this).data('id');
            PhoneBook.deleteItem(id);
        });
    }
};
PhoneBook.getItems();
PhoneBook.bindEvents();



// lebenite
// fbi