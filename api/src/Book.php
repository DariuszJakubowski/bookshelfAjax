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
    
    function setIsbn($isbn)
    {
        $this->isbn = $isbn;
    }

    function setAuthor($author)
    {
        $this->author = $author;
    }

    function setTitle($title)
    {
        $this->title = $title;
    }

    function setDescription($description)
    {
        $this->description = $description;
    }

        //return array: all books (or one book when $isbn != null)
    public function loadFromDB($conn, $isbn = null)
    {

        $booksFromDB = [];
        if ($isbn === null) {
            $sql = "SELECT * FROM book";
        } else {
            $sql = "SELECT * FROM book WHERE isbn = $isbn";
        }

        $result = $conn->query($sql);
        while ($row = $result->fetch_assoc()) {
            $booksFromDB[] = $row;
        }
        $conn->close();

        return $booksFromDB;
    }

        public function create($conn)
    {
        $stmt = $conn->prepare('INSERT INTO book (isbn, author, title, description) 
            VALUES(?, ?, ?, ?)');

        $stmt->bind_param('isss',
            $this->validIsbn($this->isbn),
            $this->sanitizeString($this->author),
            $this->sanitizeString($this->title),
            $this->sanitizeString($this->description));
        $stmt->execute();

        $createIsDone = !$stmt->errno;
        $stmt->close();
        $conn->close();

        return $createIsDone;
    }

    public function update($conn)
    {
        $stmt = $conn->prepare("UPDATE book SET isbn=?, author=?, title=?, description=? "
                . "WHERE isbn=$this->isbn");
        $stmt->bind_param('isss',
            $this->validIsbn($this->isbn),
            $this->sanitizeString($this->author),
            $this->sanitizeString($this->title),
            $this->sanitizeString($this->description)
            );
        $stmt->execute();

        $updateDone = !$stmt->errno;
        $stmt->close();
        $conn->close();
        
        return $updateDone;
    }

    public function deleteFromDB($conn, $isbn)
    {

        return ($conn->query("DELETE FROM book WHERE isbn = $isbn") == true) ? true
                : false;
    }

    private function validIsbn($isbn)
    {

        if (!preg_match('/^[1-9]((\d){8}|(\d){12})$/', $isbn)) {
            $isbn = null;
        }
        return $isbn;
    }

    private function sanitizeString($str)
    {
        return trim(htmlspecialchars($str, ENT_QUOTES, 'UTF-8'));
    }
}
