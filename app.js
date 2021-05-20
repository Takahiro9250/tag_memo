const express = require('express');
const mysql = require('mysql');
const app = express();

// CSSや画像ファイルを置くフォルダを指定
app.use(express.static('public'));
// サーバー側でフォームの値を受け取れるように
app.use(express.urlencoded({ extended: false }));

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '***********',
  database: 'tag_memo'
});

let searchMode = "all";
let searchWord = "";
let returnPoint = "/";
app.get('/', (req, res) => {
  connection.query(
    "SELECT * FROM entry ORDER BY favorite DESC, id DESC",
    (error, results) => {
      searchMode = "all";
      returnPoint = "/";
      res.render('index.ejs', { entry: results });
    }
  );
});
app.get('/sort123', (req, res) => {
  if (searchMode === "all") {
    connection.query(
      "SELECT * FROM entry ORDER BY favorite DESC, id DESC",
      (error, results) => {
        returnPoint = "/sort123";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "title") {
    connection.query(
      "SELECT * FROM entry WHERE memo_title LIKE ? ORDER BY favorite DESC, id DESC",
      ["%" + searchWord + "%"],
      (error, results) => {
        returnPoint = "/sort123";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "text") {
    connection.query(
      "SELECT * FROM entry WHERE memo_text LIKE ? ORDER BY favorite DESC, id DESC",
      ["%" + searchWord + "%"],
      (error, results) => {
        returnPoint = "/sort123";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "tag") {
    connection.query(
      "SELECT entry.id, entry.memo_title, entry.memo_text, entry.favorite, tag.name FROM entry LEFT JOIN tag_map ON entry.id = tag_map.entry_id LEFT JOIN tag ON tag.id = tag_map.tag_id WHERE tag.name = ? ORDER BY favorite DESC, id DESC",
      [searchWord],
      (error, results) => {
        returnPoint = "/sort123";
        res.render('index.ejs', { entry: results });
      }
    );
  }
});
app.get('/sort321', (req, res) => {
  if (searchMode === "all") {
    connection.query(
      "SELECT * FROM entry ORDER BY favorite DESC, id ASC",
      (error, results) => {
        returnPoint = "/sort321";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "title") {
    connection.query(
      "SELECT * FROM entry WHERE memo_title LIKE ? ORDER BY favorite DESC, id ASC",
      ["%" + searchWord + "%"],
      (error, results) => {
        returnPoint = "/sort321";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "text") {
    connection.query(
      "SELECT * FROM entry WHERE memo_text LIKE ? ORDER BY favorite DESC, id ASC",
      ["%" + searchWord + "%"],
      (error, results) => {
        returnPoint = "/sort321";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "tag") {
    connection.query(
      "SELECT entry.id, entry.memo_title, entry.memo_text, entry.favorite, tag.name FROM entry LEFT JOIN tag_map ON entry.id = tag_map.entry_id LEFT JOIN tag ON tag.id = tag_map.tag_id WHERE tag.name = ?  ORDER BY favorite DESC, id ASC",
      [searchWord],
      (error, results) => {
        returnPoint = "/sort321";
        res.render('index.ejs', { entry: results });
      }
    );
  }
});
app.get('/sortABC', (req, res) => {
  if (searchMode === "all") {
    connection.query(
      "SELECT * FROM entry ORDER BY favorite DESC, memo_title ASC",
      (error, results) => {
        returnPoint = "/sortABC";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "title") {
    connection.query(
      "SELECT * FROM entry WHERE memo_title LIKE ? ORDER BY favorite DESC, memo_title ASC",
      ["%" + searchWord + "%"],
      (error, results) => {
        returnPoint = "/sortABC";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "text") {
    connection.query(
      "SELECT * FROM entry WHERE memo_text LIKE ? ORDER BY favorite DESC, memo_title ASC",
      ["%" + searchWord + "%"],
      (error, results) => {
        returnPoint = "/sortABC";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "tag") {
    connection.query(
      "SELECT entry.id, entry.memo_title, entry.memo_text, entry.favorite, tag.name FROM entry LEFT JOIN tag_map ON entry.id = tag_map.entry_id LEFT JOIN tag ON tag.id = tag_map.tag_id WHERE tag.name = ?  ORDER BY favorite DESC, memo_title ASC",
      [searchWord],
      (error, results) => {
        returnPoint = "/sortABC";
        res.render('index.ejs', { entry: results });
      }
    );
  }
});
app.get('/sortCBA', (req, res) => {
  if (searchMode === "all") {
    connection.query(
      "SELECT * FROM entry ORDER BY favorite DESC, memo_title DESC",
      (error, results) => {
        returnPoint = "/sortCBA";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "title") {
    connection.query(
      "SELECT * FROM entry WHERE memo_title LIKE ? ORDER BY favorite DESC, memo_title DESC",
      ["%" + searchWord + "%"],
      (error, results) => {
        returnPoint = "/sortCBA";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "text") {
    connection.query(
      "SELECT * FROM entry WHERE memo_text LIKE ? ORDER BY favorite DESC, memo_title DESC",
      ["%" + searchWord + "%"],
      (error, results) => {
        returnPoint = "/sortCBA";
        res.render('index.ejs', { entry: results });
      }
    );
  } else if (searchMode === "tag") {
    connection.query(
      "SELECT entry.id, entry.memo_title, entry.memo_text, entry.favorite, tag.name FROM entry LEFT JOIN tag_map ON entry.id = tag_map.entry_id LEFT JOIN tag ON tag.id = tag_map.tag_id WHERE tag.name = ? ORDER BY favorite DESC, memo_title DESC",
      [searchWord],
      (error, results) => {
        returnPoint = "/sortCBA";
        res.render('index.ejs', { entry: results });
      }
    );
  }
});
app.post('/searchTitle', (req, res) => {
  connection.query(
    "SELECT * FROM entry WHERE memo_title LIKE ? ORDER BY favorite DESC, id DESC",
    ["%" + req.body.search_title + "%"],
    function (error, results) {
      res.render('index.ejs', { entry: results });
      searchMode = "title";
      searchWord = req.body.search_title;
      returnPoint = "/returnSearchTitle";
    }
  );
});
app.post('/returnSearchTitle', (req, res) => {
  connection.query(
    "SELECT * FROM entry WHERE memo_title LIKE ? ORDER BY favorite DESC, id DESC",
    ["%" + searchWord + "%"],
    function (error, results) {
      res.render('index.ejs', { entry: results });
    }
  );
});
app.post('/searchText', (req, res) => {
  connection.query(
    "SELECT * FROM entry WHERE memo_text LIKE ? ORDER BY favorite DESC, id DESC",
    ["%" + req.body.search_text + "%"],
    function (error, results) {
      res.render('index.ejs', { entry: results });
      searchMode = "text";
      searchWord = req.body.search_text;
      returnPoint = "/ReturnSearchText";
    }
  );
});
app.post('/returnSearchText', (req, res) => {
  connection.query(
    "SELECT * FROM entry WHERE memo_text LIKE ? ORDER BY favorite DESC, id DESC",
    ["%" + searchWord + "%"],
    function (error, results) {
      res.render('index.ejs', { entry: results });
    }
  );
});
app.post('/searchTag', (req, res) => {
  connection.query(
    "SELECT entry.id, entry.memo_title, entry.memo_text, entry.favorite, tag.name FROM entry LEFT JOIN tag_map ON entry.id = tag_map.entry_id LEFT JOIN tag ON tag.id = tag_map.tag_id WHERE tag.name = ? ORDER BY favorite DESC, id DESC",
    [req.body.search_tag],
    function (error, results) {
      res.render('index.ejs', { entry: results });
      searchMode = "tag";
      searchWord = req.body.search_tag;
      returnPoint = "/returnSearchTag";
    }
  );
});
app.post('/returnSearchTag', (req, res) => {
  connection.query(
    "SELECT entry.id, entry.memo_title, entry.memo_text, entry.favorite, tag.name FROM entry LEFT JOIN tag_map ON entry.id = tag_map.entry_id LEFT JOIN tag ON tag.id = tag_map.tag_id WHERE tag.name = ? ORDER BY favorite DESC, id DESC",
    [searchWord],
    function (error, results) {
      console.log(searchWord);
      res.render('index.ejs', { entry: results });
    }
  );
});
app.get('/note/:id', (req, res) => {
  connection.query(
    'SELECT * FROM entry WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('note.ejs', {entry: results[0]});
    }
  );
});
let paramsId = "";
let openPage = "";
app.get('/noteTag/:id', (req, res) => {
  connection.query(
    'SELECT tag_map.entry_id, tag_map.tag_id, tag.id, tag.name FROM tag_map JOIN tag ON tag_map.tag_id = tag.id WHERE entry_id = ?',
    [req.params.id],
    (error, results) => {
      res.render('noteTag.ejs', {tag_map: results});
      paramsId = req.params.id;
      openPage = "noteTag";
    }
  );
});
app.post('/removeTag/:id', (req, res) => {
  connection.query(
    'DELETE FROM tag_map WHERE entry_id = ? AND tag_id = ?',
    [paramsId, req.body.tagId],
    (error, results) => {
      res.redirect('/noteTag/' + paramsId);
    }
  );
});
app.get('/addTag', (req, res) => {
  connection.query(
    'SELECT * FROM tag',
    (error, results) => {
      res.render('addTag.ejs', {tag: results});
    }
  );
});
app.get('/newTag', (req, res) => {
  res.render('newTag.ejs');
});
let rename_id;
app.get('/rename/:id', (req, res) => {
  connection.query(
    'SELECT * FROM tag WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('rename.ejs', { tag: results[0] });
      rename_id = req.params.id;
      console.log(rename_id);
    }
  );
});
app.post('/renameTag', (req, res) => {
  connection.query(
    'UPDATE tag SET name = ? WHERE id = ?',
    [req.body.rename_name, rename_id],
    (error, results) => {
      res.redirect('/tag');
      console.log(req.params.id);
    }
  );
});
app.get('/tag', (req, res) => {
  connection.query(
    'SELECT * FROM tag',
    (error, results) => {
      res.render('tag.ejs', { tag: results });
      openPage = "tag";
    }
  );
});
app.post('/deleteTag', (req, res) => {
  connection.query(
    'DELETE FROM tag WHERE id = ?',
    [req.body.tagId],
    (error, results) => {
      res.redirect('/tag');
    }
  );
});
app.post('/newAddTag', (req, res) => {
  connection.query(
    'INSERT INTO tag(name) VALUES (?)',
    [req.body.newTag_name],
    (error, results) => {
      if (openPage === "noteTag") {
        res.redirect('/addTag');
      } else if (openPage === "tag") {
        res.redirect('/tag');
      }
    }
  );
});
app.post('/appendTag', (req, res) => {
  connection.query(
    'INSERT INTO tag_map(entry_id, tag_id) SELECT ?, ? WHERE NOT EXISTS (SELECT * FROM tag_map WHERE entry_id = ? AND tag_id = ?)',
    [paramsId, req.body.tagId, paramsId, req.body.tagId],
    (error, results) => {
      res.redirect('/noteTag/' + paramsId);
    }
  );
});
app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM entry WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {entry: results[0]});
    }
  );
});
app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE entry SET memo_title = ?, memo_text = ?, favorite = ? WHERE id = ?',
    [req.body.memo_title, req.body.memo_text, req.body.favorite, req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});
app.get('/new', (req, res) => {
  connection.query(
    "SELECT entry.id as 'memo_id', memo_title, tag.id as 'tag_id', tag.name FROM entry LEFT JOIN tag_map ON entry.id = tag_map.entry_id LEFT JOIN tag ON tag_map.tag_id = tag.id GROUP BY entry.id, entry.memo_title, tag.id, tag.name",
    (error, results) => {
      res.render('new.ejs', { entry: results });
    }
  );
});
app.post('/create', (req, res) => {
  connection.query(
    'INSERT INTO entry(memo_title, memo_text, favorite) VALUES (?, ?, ?)',
    [req.body.memo_title, req.body.memo_text, req.body.favorite],
    (error, results) => {
      res.redirect('/');
    }
  );
});
app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM entry WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    }
  );
});

app.listen(3000);