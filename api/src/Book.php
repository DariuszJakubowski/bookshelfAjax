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

        public function create($conn, int $isbn, string $author, string $title, string $description)
    {
        $stmt = $conn->prepare('INSERT INTO book (isbn, author, title, description) 
            VALUES(?, ?, ?, ?)');

        $stmt->bind_param('isss',
            $this->validISBN($isbn),
            $this->sanitizeString($author),
            $this->sanitizeString($title),
            $this->sanitizeString($description));
        $stmt->execute();

        $createIsDone = true; //!$stmt->errno;
        $stmt->close();

        return $createIsDone;
    }

    public function update($conn, int $isbn, string $author, string $title, string $description)
    {
        $stmt = $conn->prepare("UPDATE book SET isbn=?, author=?, title=?, description=? WHERE id=$this->id");
        $stmt->bind_param('isss',
            $this->validISBN($isbn),
            $this->sanitizeString($author),
            $this->sanitizeString($title),
            $this->sanitizeString($description));
        $stmt->execute();

        $updateDone = !$stmt->errno;
        $conn->close();
        return $updateDone;
    }

    public function deleteFromDB($conn, int $id)
    {

        return ($conn->query("DELETE FROM book WHERE id = $id") === TRUE) ? TRUE
                : FALSE;
    }

    private function validIsbn($isbn)
    {

        if (!preg_match('/^(\d){13}|(\d){9}$/', $isbn)) {
            $isbn = FALSE;
        }
        return $isbn;
    }

    private function sanitizeString($str)
    {
        return trim(htmlspecialchars($str, ENT_QUOTES, 'UTF-8'));
    }
}
