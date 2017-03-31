<?php

namespace Bookshelf\src;

class Book
{
    private $id          = -1;
    private $isbn        = null;
    private $author      = '';
    private $title       = '';
    private $description = '';

    public function __construct()
    {
        
    }

    //return array: all books (or one book when id != null)
    public function loadFromDB($conn, $id = null)
    {

        $booksFromDB = [];
        if ($id === null) {
            $sql = "SELECT * FROM book";
        } else {
            $sql = "SELECT * FROM book WHERE id = $id";
        }

        $result = $conn->query($sql);
        while ($row = $result->fetch_assoc()) {
            $booksFromDB[] = $row;
        }
        $conn->close();

        return $booksFromDB;
    }
}