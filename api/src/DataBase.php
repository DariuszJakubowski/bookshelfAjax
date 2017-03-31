<?php

namespace Bookshelf\src;

use mysqli;

class DataBase
{
    static private $conn = null;

    static public function connect()
    {
        if (self::$conn === null) {
            self::$conn = new mysqli('localhost', 'root', 'qwerty', 'bookshelf');
            mysqli_set_charset(self::$conn, 'UTF8');
            if (self::$conn->connect_error) {
                die(self::$conn->connect_error);
            }
        }
        return self::$conn;
    }
}