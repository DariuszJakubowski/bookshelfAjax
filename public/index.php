<!DOCTYPE html>
<html lang="pl">
    <head>
        <title>Bookshelf - ajax</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="./css/style.css">
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
        <script src="./js/app.js"></script>
        <script src="./js/formValidation.js"></script>

    </head>

    <body>

        <nav class="navbar navbar-inverse navbar-static-top" >
            <div class="container-fluid">
                <div class=" navbar-header">
                    <div class="navbar-brand">My books</div>
                </div>
            </div>
        </nav>

        <div class="container text-center" id="container">

            <div class="row">

                <div class="col-sm-4 col-sm-offset-2 ">
                    <form method="post" class="form">
                        <fieldset>
                            <div class="form-group">
                                <input id="isbn" name="isbn" class="form-control"  placeholder="isbn">
                            </div>
                            <div class="form-group">
                                <input id="author" name="author" class="form-control"  placeholder="author" required>
                            </div>
                            <div class="form-group">
                                <input id="title" name="title" class="form-control"  placeholder="title" required>
                            </div>
                            <div class="form-group">
                                <textarea id="description" name="description" class="form-control"></textarea>
                            </div>

                            <div class="form-group">
                                <input type="submit" value="add book" class="btn btn-success btn-block">
                                <input type="reset" value="clear all" class="btn btn-danger btn-block">
                            </div>
                        </fieldset>
                    </form>
                </div>

                <div class="col-sm-4">
                    tu będą wypisane książki
                </div>
            </div> <!-- end row -->
        </div> <!-- end container -->

    </body>
</html>