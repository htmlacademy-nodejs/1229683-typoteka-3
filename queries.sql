SELECT *
FROM categories;

-- список категорий для которых создана минимум одна публикация
SELECT
    id, name
FROM categories
    INNER JOIN articles_categories
    ON id = category_id;


-- список категорий с количеством публикаций
SELECT
    id, name, count(article_id)
FROM categories
    INNER JOIN articles_categories
    ON id = category_id
GROUP BY id;


-- список публикаций (идентификатор публикации, заголовок публикации, анонс публикации, дата публикации,
-- имя и фамилия автора, контактный email, количество комментариев, наименование категорий). Сначала свежие публикации
SELECT articles.id, articles.title, articles.announce, articles.created_date,
 users.first_name, users.last_name, users.email, COUNT(comments.id) AS comments_count, STRING_AGG(DISTINCT categories.name, ', ') AS category_list
FROM articles
INNER JOIN articles_categories
ON articles.id = articles_categories.article_id
INNER JOIN categories
ON  articles_categories.category_id = categories.id
INNER JOIN users
ON articles.user_id = users.id
LEFT JOIN comments
ON articles.id = comments.article_id
GROUP BY articles.id, users.id
ORDER BY articles.created_date DESC;

--  полную информацию определённой публикации (идентификатор публикации, заголовок публикации, анонс, полный текст публикации,
-- дата публикации, путь к изображению, имя и фамилия автора, контактный email, количество комментариев, наименование категорий)
SELECT articles.*,  users.first_name, users.last_name, users.email, COUNT(comments.id) AS comments_count, STRING_AGG(categories.name, ', ') AS category_list
FROM articles
INNER JOIN articles_categories
ON articles.id = articles_categories.article_id
INNER JOIN categories
ON categories.id = articles_categories.category_id
INNER JOIN users
ON articles.user_id = users.id
LEFT JOIN comments
ON articles.id = comments.article_id
WHERE articles.id = 3
GROUP BY articles.id, users.id;


--  список из 5 свежих комментариев
SELECT comments.id, comments.article_id, comments.text, users.first_name, users.last_name
FROM comments
INNER JOIN users
ON comments.user_id = users.id
ORDER BY comments.created_at DESC
LIMIT 5;


--  список комментариев для определённой публикации
SELECT comments.*, users.first_name, users.last_name, users.email
FROM comments
INNER JOIN users
ON comments.user_id = users.id
WHERE comments.article_id = 2
ORDER BY comments.created_at DESC;


UPDATE articles
SET title = 'Как я встретил Новый год'
WHERE id = 1;
