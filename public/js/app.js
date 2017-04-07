$(function () {

    var books_container = $('ul');
    var api_url = '../api/books.php';

    loadAllBooks();

    function loadBook(Book, isbn) {
//        var description_container = $('.description-container');

        $.ajax({
            url: api_url + "?isbn=" + isbn,
            method: 'GET',
            dataType: 'json'
        })
                .done(function (book) {
                   Book = {
                        isbn: book[0].isbn,
                        author: book[0].author,
                        title: book[0].title,
                        description: book[0].description

                    };

//                    description_container.find('h4').text(book[0].author + ' "' + book[0].title + '"');
//                    description_container.find('p').text(book[0].description);
//                    description_container.fadeIn();

                })
                .fail(function () {
                    console.log('fail!');
                });
        return Book;
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
                    console.log('Error: can\'t display books');
                });
    }

    // validate book then send it 
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
                //dodanie atrybut dataType: 'json' uruchamia metodę fail() mimo, że dane zostały
                //poprawnie dodane do bd. Trzeba będzie poprawić api tak by ten dodany 
                //obiekt book został zwrócony
                //            dataType: 'json'
            })
                    .done(function () {

                        loadAllBooks();
                        // clear all inputs in form
                        form.find('.form-control').val('');
                    })
                    .fail(function () {
                        console.log('Failed! :(');
                    });
        }

    });

// delete book
    $(books_container).on('click', '.glyphicon-remove-circle', function (event) {
        //stopPropagation() prevent to display desription  of book
        event.stopPropagation();
        var isbn_to_delete = parseInt($(this).attr('id'));

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
                    console.log('del failed! :(');
                });

    });

    //event click on element <li>: show description of book
    $(books_container).on('click', '.li_book', function () {
        //get isbn
        var isbn = $(this).attr('id');
        var Book = loadBook(null, isbn);
        console.log(Book);
    });


// update book
    $(books_container).on('click', '.glyphicon-edit', function (event) {
        //stopPropagation() prevent to display description  of book
        event.stopPropagation();
//       event.preventDefault();
        var isbn = parseInt($(this).attr('id'));
        $('div#post_submit').css('background', 'red');
//                '<input id="updade_submit" type="submit" value="edytuj książkę" class="btn btn-default">'
//                );
//        $.ajax({
//            method: 'PUT',
//            url: api_url,
//            data:
//                    {
//                        isbn: isbn_to_delete
//                    }
//        })
//                .done(function (txt) {
//                    $('li#' + isbn_to_delete).text(txt)
//                            .hide(2000);
//                })
//                .fail(function () {
//                    console.log('del failed! :(');
//                });

    });





});