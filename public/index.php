<!DOCTYPE html>
<html lang="pl">
    <head>
        <title>Bookshelf - ajax</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./css/style.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <link rel="stylesheet" href="./css/style.css">
        <link href="https://fonts.googleapis.com/css?family=Ubuntu" rel="stylesheet">
    </head>

    <body>
        <nav class="navbar navbar-default navbar-static-top" >
            <div class="container-fluid">
                <div class=" navbar-header">
                    <div class="navbar-brand">Moje książki</div>
                </div>
            </div>
        </nav>

        <div class="container text-center" id="container">

            <div class="row">

                <div class="col-sm-4 ">
                    <form method="post" class="form" action="nowhere.html">
                        <fieldset>
                            <div class="form-group">
                                <input id="isbn" name="isbn" class="form-control"  placeholder="isbn">
                            </div>
                            <div class="form-group">
                                <input id="author" name="author" class="form-control"  placeholder="autor">
                            </div>
                            <div class="form-group">
                                <input id="title" name="title" class="form-control"  placeholder="tytuł">
                            </div>
                            <div class="form-group">
                                <textarea id="description" name="description" class="form-control" placeholder="opis (opcjonalne)"></textarea>
                            </div>

                            <div class="form-group submit-group">
                                <input id="post_submit" type="submit" value="dodaj książkę" class="btn btn-default btn-block">
                                <input type="reset" value="wyczyść formularz" class="btn btn-default btn-block">
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div class="col-sm-4">
                    <ul class="list-group">
                        <li class='text-center list-group-item'><strong>Książki</strong></li>
                        <!--here ajax get books from db-->
                    </ul>
                </div>

                <div class="description-container col-sm-4" style="display:none">
                    <!--here you can see description of book-->
                    <h4></h4>
                    
                    <p></p>
                </div>
                    
                <!--here you can see description of book-->
            </div>
        </div> <!-- end row -->
    </div> <!-- end container -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
    <script src="./js/app.js"></script>

</body>
</html>