
$(function(){

$('.btn-success').click(function(){
    validateForm();   
});

function validateForm(){

    var isbnReg =  /^((\d){9}|(\d){13})$/;
  
    var isbn = $('#isbn').val();
    var author = $('#author').val();
    var title = $('#title').val();
    var description = $('#description').val();

    var inputVal = [isbn, author, title, description];

     $('.error').hide();

        if(isbn == ""){
            $('#isbn').after('<span class="error"> Wpisz proszę ISBN</span>');
        } 
        else if(!isbnReg.test(isbn)){
            $('#isbn').after('<span class="error"> ISBN musi mieć 9 lub 13 cyfr</span>');
        }

        if(author == ""){
            $('#author').after('<span class="error"> Wpisz proszę autora</span>');
        } else if(author.length > 100){
            $('#author').after('<span class="error">Max 100 znaków</span>');
        }

        if(title == ""){
            $('#title').after('<span class="error"> Wpisz proszę tytuł</span>');
        }  else if(title.length > 255){
            $('#title').after('<span class="error">Max 255 znaków</span>');
        }

        if(description.length > 1000){
            $('#description').after('<span class="error"> Opis nie dłuższy niż 1000 znaków</span>');
        } 
 
}   

});