<?php
require '../vendor/autoload.php';

use Bookshelf\src\Book;
use Bookshelf\src\DataBase;

ini_set('display_errors', 1);
error_reporting(E_ALL);


$book = new Book;
$conn = DataBase::connect();
//var_dump($_SERVER);
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        echo json_encode($book->loadFromDB($conn, $_GET['id']));
    } else {
        echo json_encode($book->loadFromDB($conn));
    }
    
} elseif ($_SERVER['REQUEST_METHOD'] === 'POST') {

    $book->setIsbn($_POST['isbn']);
    $book->setAuthor($_POST['author']);
    $book->setTitle($_POST['title']);
    $book->setDescription($_POST['description']);

    $book->create($conn);

} elseif ($_SERVER['REQUEST_METHOD'] == 'PUT') {

    parse_str(file_get_contents("php://input"), $put_vars);


} elseif ($_SERVER['REQUEST_METHOD'] == 'DELETE') {

    parse_str(file_get_contents("php://input"), $del_vars);
    
    if($book->deleteFromDB($conn, $del_vars['isbn'])) {
        echo 'Book is deleted';
    }
}
