$(function () {

    var books_container = $('ul');
    var description_container = $('.description-container');
    var api_url = '../api/books.php';

    loadAllBooks();

    function loadBook(isbn) {

        $.ajax({
            url: api_url + "?isbn=" + isbn,
            method: 'GET',
            dataType: 'json'
        })
                .done(function (book) {
                    description_container.find('span.edit-field-author').text(book[0].author);
                    description_container.find('span.edit-field-title').text(book[0].title);
                    description_container.find('span.edit-field-description').text(book[0].description);
                    description_container.fadeIn();
                })
                .fail(function () {
                    console.log('Failed!');
                });
    }


    function loadAllBooks() {
        $.ajax({
            url: api_url,
            method: 'GET',
            dataType: 'json'
        })
                .done(function (books) {
                    $.each(books, function (index, book) {
                        //every element <li> has id='isbn'
                        books_container.append("<li id='" + book.isbn +
                                "' class='li_book text-left list-group-item' style='display:none'>" +
                                "<span class='author_of_book'>" + book.author + "</span>, " +
                                "<span class='title_of_book'>" + book.title + "</span>" +
                                "<span class='glyphicon glyphicon-remove-circle pull-right' id='" +
                                book.isbn + "_delete'></span>" +
                                "<span class='pull-right'>&nbsp;</span>" +
                                "<span class='glyphicon glyphicon-edit pull-right' id='" +
                                book.isbn + "_edit'></span></li>");
                        $('#' + book.isbn).fadeIn(500 + index * 300);

                    });
                })
                .fail(function () {
                    console.log('Failed! (GET: loadAllBooks())');
                });
    }

    // validate (on client side) book 
    // then save it in database
    $('#post_submit').on('click', function (event) {
        event.preventDefault();

        var form = $('form');
        var form_isbn = form.find('#isbn');
        var isbn_value = form_isbn.val();
        var form_author = form.find('#author');
        var author_value = form_author.val();
        var form_title = form.find('#title');
        var title_value = form_title.val();
        var form_description = form.find('#description');
        var description_value = form_description.val();
        // valid ISBN has 9 or 13 digits
        var isbnReg = /^[1-9]((\d){8}|(\d){12})$/;
        var is_valid = true;

        //validation:
        //default .error is hide always after click action
        $('.error').hide();

        if (isbn_value === "") {
            form_isbn.after('<span class="error"> Wpisz proszę ISBN</span>');
            is_valid = false;
        } else if (!isbnReg.test(isbn_value)) {
            form_isbn.after('<span class="error"> ISBN musi być liczbą 9-cio lub 13-to cyfrową</span>');
            is_valid = false;
        }
        if (author_value.length < 2) {
            form_author.after('<span class="error"> Wpisz proszę autora</span>');
            is_valid = false;
        } else if (author_value.length > 100) {
            form_author.after('<span class="error">Max 100 znaków</span>');
            is_valid = false;
        }
        if (title_value.length < 2) {
            form_title.after('<span class="error"> Wpisz proszę tytuł</span>');
            is_valid = false;
        } else if (title_value.length > 255) {
            form_title.after('<span class="error">Max 255 znaków</span>');
            is_valid = false;
        }
        if (description_value.length > 1000) {
            form_description.after('<span class="error"> Opis nie dłuższy niż 1000 znaków</span>');
            is_valid = false;
        }

        if (is_valid) {

            $.ajax({
                url: api_url,
                method: 'POST',
                data:
                        {
                            isbn: isbn_value,
                            author: author_value,
                            title: title_value,
                            description: description_value
                        }
            })
                    .done(function () {

                        loadAllBooks();
                        // clear all inputs in form
                        form.find('.form-control').val('');
                    })
                    .fail(function () {
                        console.log('Failed! (POST)');
                    });
        }

    });

// delete book
    $(books_container).on('click', '.glyphicon-remove-circle', function (event) {
        //stopPropagation() prevent to display desription  of book
        event.stopPropagation();

        var isbn_to_delete = parseInt($(this).attr('id'));
        var conf = confirm('Jesteś pewien, że chcesz usunąć książkę isbn: ' + isbn_to_delete + '?');

        if (conf) {

            $.ajax({
                method: 'DELETE',
                url: api_url,
                data:
                        {
                            isbn: isbn_to_delete
                        }
            })
                    .done(function (txt) {
                        $('li#' + isbn_to_delete).text(txt)
                                .hide(2000);
                    })
                    .fail(function () {
                        console.log('Failed! (DELETE)');
                    });
        }
    });


    //show description of book (event 'click' on book)
    $(books_container).on('click', '.li_book', function () {
        //get isbn
        var isbn = $(this).attr('id');
        loadBook(isbn);
    });


// update book
    $(books_container).on('click', '.glyphicon-edit', function () {

        var isbn = parseInt($(this).attr('id'));
        // fields are editable now
        $('.edit-field').attr("contenteditable", "true")
                .css('background-color', 'white');
        //appear edit-btn
        $('p').after('<button type="button" class="btn btn-warning btn-edit">Edytuj</button>');

        $(document).on('click', '.btn-edit', function () {
            var author = $('.edit-field-author').text();
            var title = $('.edit-field-title').text();
            var description = $('.edit-field-description').text();

            $.ajax({
                method: 'PUT',
                url: api_url,
                data:
                        {
                            isbn: isbn,
                            author: author,
                            title: title,
                            description: description
                        }
            })
                    .done(function () {

                        loadBook(isbn);
                    })
                    .fail(function () {
                        console.log('Failed! (PUT)');
                    }).always(function () {
                        $('.edit-field').attr("contenteditable", "false")
                            .css('background-image', 'url(./img/paper.png)');
                        $('.btn-edit').remove();
                        loadAllBooks();
                    });
        });
    });

});
