'use strict';
{

  // index.ejs
  const indexPage = () => {
    // search
    const search_left = document.getElementById('search_left');
    const titleSearch = document.getElementById('titleSearch');
    const search_center = document.getElementById('search_center');
    const textSearch = document.getElementById('textSearch');
    const search_right = document.getElementById('search_right');
    const tagSearch = document.getElementById('tagSearch');
    search_left.addEventListener('click', () => {
      if (!search_left.classList.contains('current')) {
        search_left.classList.add('current');
        search_center.classList.remove('current');
        search_right.classList.remove('current');
      }
      if (!titleSearch.classList.contains('use')) {
        titleSearch.classList.add('use');
        textSearch.classList.remove('use');
        tagSearch.classList.remove('use');
      }
    });
    search_center.addEventListener('click', () => {
      if (!search_center.classList.contains('current')) {
        search_center.classList.add('current');
        search_left.classList.remove('current');
        search_right.classList.remove('current');
      }
      if (!textSearch.classList.contains('use')) {
        textSearch.classList.add('use');
        titleSearch.classList.remove('use');
        tagSearch.classList.remove('use');
      }
    });
    search_right.addEventListener('click', () => {
      if (!search_right.classList.contains('current')) {
        search_right.classList.add('current');
        search_left.classList.remove('current');
        search_center.classList.remove('current');
      }
      if (!tagSearch.classList.contains('use')) {
        tagSearch.classList.add('use');
        titleSearch.classList.remove('use');
        textSearch.classList.remove('use');
      }
    });
    sort
    const menu_sort = document.getElementById('menu_sort');
    const close_sort = document.getElementById('close_sort');
    const sort_select = document.getElementById('sort');
    menu_sort.addEventListener('click', () => {
      main.style.display = "none";
      sort_select.style.display = 'block';
    });
    close_sort.addEventListener('click', () => {
      main.style.display = 'block';
      sort_select.style.display = 'none';
    });
  };
  indexPage();
}