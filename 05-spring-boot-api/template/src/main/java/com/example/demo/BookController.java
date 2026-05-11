package com.example.demo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;
import java.util.ArrayList;

class Book {
    private String title;
    private String author;

    public Book(String title, String author) {
        this.title = title;
        this.author = author;
    }

    public String getTitle() { return title; }
    public String getAuthor() { return author; }
}

@RestController
public class BookController {

    private List<Book> books = new ArrayList<>();

    public BookController() {
        books.add(new Book("1984", "George Orwell"));
        books.add(new Book("To Kill a Mockingbird", "Harper Lee"));
    }

    // BUG: Missing the mapping annotation!
    // TODO: Add the proper annotation to make this respond to GET /api/books
    public List<Book> getBooks() {
        return books;
    }
}
