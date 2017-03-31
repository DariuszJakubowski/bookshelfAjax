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
    if(isset($_GET['id'])) {
        echo json_encode($book->loadFromDB($conn, $_GET['id']));
    } else {
        echo json_encode($book->loadFromDB($conn));
    }
  
}