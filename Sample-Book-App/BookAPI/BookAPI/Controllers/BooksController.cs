﻿using BookAPI.Models;
using Microsoft.AspNetCore.Mvc;

namespace BookAPI.Controllers
{
    [Route("api/[Controller]")]
    [ApiController]
    public class BooksController : ControllerBase
    {
        private Book[] _books = new Book[]
        {
            new Book { Id = 1, Author = "Author One", Title = "Book One" },
            new Book { Id = 1, Author = "Author One", Title = "Book One" },
            new Book { Id = 1, Author = "Author One", Title = "Book One" }
        };


        [HttpGet]
        public ActionResult<IEnumerable<Book>> GetBooks()
        {
            return Ok(_books);
        }
    }
}
