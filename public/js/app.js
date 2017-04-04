$(function () {

    var books_container = $('ul');
    var api_url = '../api/books.php';

    loadBooks();


    function loadBooks() {
        $.ajax({
            url: api_url,
            method: 'GET',
            dataType: 'json'
        })
                .done(function (books) {
                    $.each(books, function (index, book) {
                        books_container.append("<li id='i" + index +
                                "' class='text-left list-group-item' style='display:none'>" +
                                book.author + ', ' + book.title + '</li>');
                        $('#i' + index).fadeIn(500 + index * 200);

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
        // valid ISBN has 9 or 12 digits
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
                        
                        books_container.append("<li class='text-left list-group-item' style='display:none'>" +
                                author_value + ', ' + title_value + '</li>');
                        $('li:last').fadeIn(666);
                        form.find('.form-control').val('');
                    })

                    .fail(function () {
                        console.log('Failed! :(');
                    });
        }

    });


});