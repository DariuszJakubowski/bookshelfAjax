$(function () {

    var books_container = $('ul');


    loadBooks();

    function loadBooks() {
        $.ajax({
            url: '../api/books.php',
            method: 'GET',
            dataType: 'json',
            success: function (books) {
                $.each(books, function (index, book) {
                    books_container.append("<li class='text-left list-group-item'>" +
                            book.author + ', ' + book.title + '</li>');
                });
            },
            error: function () {
                console.log('Error: can\'t display books');
            }
        });
    }

});