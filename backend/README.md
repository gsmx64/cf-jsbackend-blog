# CF-Backend-Blog - ENDPOINTS
Here you can get information about all endpoint from the backend part of the blog.

## NOTE:
Reeplace {{baseUrl}} with your local address, for example http://localhost:3001/api 

## Enums:
* USER STATUS: ENABLED, PENDING, BANNED
* USER ROLES: BASIC, ADMIN, MODERATOR, EDITOR
* POSTS/CATEGORIES STATUS: PUBLISHED, UNPUBLISHED, ARCHIVED, TRASHED

# 📁 Authentication

## End-point: Login
### Method: POST
>```
>{{baseUrl}}/auth/login
>```
### Body (**raw**):
It have two parameters: the username and the user password for login:
```json
{
    "username": "admin",
    "password": "abc12345"
}
```
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
A json with access_token and user data.


## End-point: Register
### Method: POST
>```
>{{baseUrl}}/users/register
>```
### Body (**raw**)
This is the body data to create a user:
```json
{
    "username": "Tester",
    "password": "abc12345",
    "status": "PENDING",
    "role": "BASIC",
    "firstName": "Tester",
    "lastName": "UserTester",
    "email": "tester@tester.com",
    "age": 31,
    "city": "Córdoba",
    "country": "Argentina",
    "avatar": "https://www.url.com/image.jpg",
    "karma": 0
}
```
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
The user data.


## End-point: Own Profile
### Method: GET
>```
>{{baseUrl}}/users/profile/
>```
### Headers:
Requires access_token.
### Access rights by Role:
Authenticated user (BASIC, ADMIN, MODERATOR, EDITOR)
### Returns:
Current user data.


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


# 📁 Users

## End-point: Verify if exists a Username
### Method: GET
>```
>{{baseUrl}}/users/verify/username/testuser
>```
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
True or False.


## End-point: Verify if exists a Email
### Method: GET
>```
>{{baseUrl}}/users/verify/email/tester@tester.com
>```
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
True or False.


## End-point: Update User Data By Id
### Method: PUT
>```
>{{baseUrl}}/users/edit/:id
>```
### Body (**raw**) - Example
```json
{
    "age": 41
}
```
### Body (**raw**) - Complete
Complete list to update:
```json
{
    "username": "Tester",
    "password": "abc12345",
    "status": "PENDING",
    "role": "BASIC",
    "firstName": "Tester",
    "lastName": "UserTester",
    "email": "tester@tester.com",
    "age": 31,
    "city": "Córdoba",
    "country": "Argentina",
    "avatar": "https://www.url.com/image.jpg",
    "karma": 0
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN and the current loged user (his own data).
### Returns:
The updated user data.


## End-point: Delete User By Id
### Method: DELETE
>```
>{{baseUrl}}/users/delete/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
```json
{
    "raw": [],
    "affected": 1
}
```

## End-point: View User Data By Id
### Method: GET
>```
>{{baseUrl}}/users/view/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
The user data.


## End-point: List Users
### Method: GET
>```
>{{baseUrl}}/users/list
>```
### Query Params:
|Param|value|
|---|---|
|page|1|
|limit|5|
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR
### Returns:
A list of users with pagination.


## End-point: Search Users
### Method: GET
>```
>{{baseUrl}}/users/search/?searchBy=tester&select=id,username,email,updateAt&sortBy=updateAt%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|tester|
|select|id,username,email,updateAt|
|sortBy|updateAt%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, username, email, status, role, firstName, lastName, age, city, country, createAt, updateAt.
* Available values : id:ASC, id:DESC, username:ASC, username:DESC, email:ASC, email:DESC, status:ASC, status:DESC, role:ASC, role:DESC, firstName:ASC, firstName:DESC, lastName:ASC, lastName:DESC, age:ASC, age:DESC, city:ASC, city:DESC, country:ASC, country:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: username,email,firstName,lastName,age
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: username, email, firstName, lastName, age, city, country.

select (string): 
* List of fields to select.
* Example: id,username,email,status,rol
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
A list of users with pagination performed by a search.


## End-point: Filter Users
### Method: GET
>```
>{{baseUrl}}/users/filter/?sortBy=updateAt:DESC&select=id,username,email,city,updateAt&filter.role=BASIC
>```
### Query Params - Example:
|Param|value|
|---|---|
|sortBy|updateAt:DESC|
|select|id,username,email,city,updateAt|
|filter.role|BASIC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.username (array[string]): 
* Filter by username query param.
* Format: filter.username={$not}:OPERATION:VALUE
* Example: filter.username=$not:$like:John Doe&filter.username=like:John
* Available Operations: $eq,  $ilike

filter.email (array[string]): 
* Filter by email query param.
* Format: filter.email={$not}:OPERATION:VALUE
* Example: filter.email=$not:$like:John Doe&filter.email=like:John
* Available Operations: $eq,  $ilike

filter.status (array[string]): 
* Filter by status query param.
* Format: filter.status={$not}:OPERATION:VALUE
* Example: filter.status=$not:$like:John Doe&filter.status=like:John
* Available Operations: $eq, $not

filter.role (array[string]): 
* Filter by role query param.
* Format: filter.role={$not}:OPERATION:VALUE
* Example: filter.role=$not:$like:John Doe&filter.role=like:John
* Available Operations: $eq, $not

filter.firstName (array[string]): 
* Filter by firstName query param.
* Format: filter.firstName={$not}:OPERATION:VALUE
* Example: filter.firstName=$not:$like:John Doe&filter.firstName=like:John
* Available Operations: $ilike

filter.lastName (array[string]): 
* Filter by lastName query param.
* Format: filter.lastName={$not}:OPERATION:VALUE
* Example: filter.lastName=$not:$like:John Doe&filter.lastName=like:John
* Available Operations: $ilike

filter.age (array[string]): 
* Filter by age query param.
* Format: filter.age={$not}:OPERATION:VALUE
* Example: filter.age=$not:$like:John Doe&filter.age=like:John
* Available Operations: $eq, $btw, $lt, $lte, $gt, $gte

filter.city (array[string]): 
* Filter by city query param.
* Format: filter.city={$not}:OPERATION:VALUE
* Example: filter.city=$not:$like:John Doe&filter.city=like:John
* Available Operations: $ilike

filter.country (array[string]): 
* Filter by country query param.
* Format: filter.country={$not}:OPERATION:VALUE
* Example: filter.country=$not:$like:John Doe&filter.country=like:John
* Available Operations: $ilike

filter.content (array[string]): 
* Filter by content query param.
* Format: filter.content={$not}:OPERATION:VALUE
* Example: filter.content=$not:$like:John Doe&filter.content=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, username, email, status, role, firstName, lastName, age, city, country, createAt, updateAt.
* Available values : id:ASC, id:DESC, username:ASC, username:DESC, email:ASC, email:DESC, status:ASC, status:DESC, role:ASC, role:DESC, firstName:ASC, firstName:DESC, lastName:ASC, lastName:DESC, age:ASC, age:DESC, city:ASC, city:DESC, country:ASC, country:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

select (string): 
* List of fields to select.
* Example: id,username,email,status,rol
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
A filtered list of users with pagination.


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


# 📁 Categories

## End-point: Create Category
### Method: POST
>```
>{{baseUrl}}/categories/create
>```
### Body (**raw**)
The body data to create a category:
```json
{
    "title": "Default Category",
    "description": "Default Category description",
    "image": "https://getlorem.com/static/images/cicero2.jpg",
    "author": "f68b3d30-e04a-4a19-b211-b3c809c2ded9",
    "status": "PUBLISHED",
    "posts": []
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR
### Returns:
The created category.


## End-point: Update Category Data By Id
### Method: PUT
>```
>{{baseUrl}}/categories/edit/:id
>```
### Body (**raw**)
```json
{
    "title": "Default Category (Updated!)"
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR
### Returns:
The updated category data.


## End-point: Delete Category By Id
### Method: DELETE
>```
>{{baseUrl}}/categories/delete/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
```json
{
    "raw": [],
    "affected": 1
}
```


## End-point: View Category Data By Id
### Method: GET
>```
>{{baseUrl}}/categories/view/:id
>```
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
The category data.


## End-point: List Categories
### Method: GET
>```
>{{baseUrl}}/categories/list
>```
### Query Params:
|Param|value|
|---|---|
|page|1|
|limit|5|
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
A list of categories with pagination.


## End-point: Search Categories
### Method: GET
>```
>{{baseUrl}}/categories/search/?searchBy=Default&select=id,title,description,updateAt&sortBy=updateAt%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|Default|
|select|id,title,description,updateAt|
|sortBy|updateAt%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, title, status, author, createAt, updateAt.
* Available values : id:ASC, id:DESC, title:DESC, status:ASC, status:DESC, author:ASC, author:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: title, description
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: title, description.

select (string): 
* List of fields to select.
* Example: id,username,email,status,rol
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
A list of categories with pagination performed by a search.


## End-point: Filter Categories
### Method: GET
>```
>{{baseUrl}}/categories/filter/?filter.author=f68b3d30-e04a-4a19-b211-b3c809c2ded9&sortBy=updateAt:DESC&select=id,title,description,updateAt
>```
### Query Params - Example:
|Param|value|
|---|---|
|filter.author|f68b3d30-e04a-4a19-b211-b3c809c2ded9|
|sortBy|updateAt:DESC|
|select|id,title,description,updateAt|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.title (array[string]): 
* Filter by title query param.
* Format: filter.title={$not}:OPERATION:VALUE
* Example: filter.title=$not:$like:John Doe&filter.title=like:John
* Available Operations: $ilike

filter.description (array[string]): 
* Filter by description query param.
* Format: filter.description={$not}:OPERATION:VALUE
* Example: filter.description=$not:$like:John Doe&filter.description=like:John
* Available Operations: $ilike

filter.status (array[string]): 
* Filter by status query param.
* Format: filter.status={$not}:OPERATION:VALUE
* Example: filter.status=$not:$like:John Doe&filter.status=like:John
* Available Operations: $eq, $not

filter.author (array[string]): 
* Filter by author query param.
* Format: filter.author={$not}:OPERATION:VALUE
* Example: filter.author=$not:$like:John Doe&filter.author=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, title, status, author, createAt, updateAt.
* Available values : id:ASC, id:DESC, title:DESC, status:ASC, status:DESC, author:ASC, author:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

select (string): 
* List of fields to select.
* Example: id,username,email,status,rol
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
A filtered list of categories with pagination.


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


# 📁 Posts 

## End-point: Create Post
### Method: POST
>```
>{{baseUrl}}/posts/create
>```
### Body (**raw**)
```json
{
    "title": "Test 01",
    "description": "Test 01 post description",
    "image": "https://getlorem.com/static/images/cicero2.jpg",
    "content": "Lorem ipsum dolor sit amet consectetur adipiscing elit curabitur sollicitudin dignissim, eget auctor facilisis platea consequat bibendum senectus gravida. Nam suscipit turpis eleifend dis praesent facilisi rhoncus lacinia habitasse pulvinar, phasellus gravida magna tincidunt ligula cubilia lectus consequat vitae, tempor vulputate integer felis eget suspendisse inceptos condimentum libero. Risus placerat fringilla enim cursus pulvinar sapien purus cum, id consequat morbi nisl turpis sodales donec mus ad, taciti fermentum ut rhoncus vel nec metus. Felis habitant nibh nunc arcu id velit dis cras ligula sociis cubilia proin commodo ridiculus ut feugiat, quis suscipit tempus justo a cum odio at mauris molestie mi inceptos nascetur netus. Nostra euismod quam aenean feugiat habitant ornare a platea luctus est, parturient nullam pharetra justo lacinia et ac curae. Magnis scelerisque mi himenaeos at arcu integer nibh quis massa morbi, torquent felis suspendisse dictum nulla consequat mattis vehicula class tellus, neque maecenas platea malesuada aenean metus vitae erat dignissim.",
    "status": "PUBLISHED",
    "author": "f68b3d30-e04a-4a19-b211-b3c809c2ded9",
    "category": "c1180585-8ab8-4f85-9316-6ab1960abf92",
    "comments": []
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR
### Returns:
The created post data.


## End-point: Update Post Data By Id
### Method: PUT
>```
>{{baseUrl}}/posts/edit/:id
>```
### Body (**raw**)
```json
{
    "title": "New title for post 08",
    "description": "New Description for post 08"
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR
### Returns:
The updated post data.


## End-point: Delete Post By Id
### Method: DELETE
>```
>{{baseUrl}}/posts/delete/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR
### Returns:
```json
{
    "raw": [],
    "affected": 1
}
```


## End-point: View Post Data By Id
### Method: GET
>```
>{{baseUrl}}/posts/view/:id
>```
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
The post data.


## End-point: View User's Post
### Method: GET
>```
>{{baseUrl}}/posts/user/:id?limit=5
>```
### Query Params:
|Param|value|
|---|---|
|page|1|
|limit|5|
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
A list of posts with pagination from that user.


## End-point: List Posts
### Method: GET
>```
>{{baseUrl}}/posts/list
>```
### Query Params:
|Param|value|
|---|---|
|page|1|
|limit|5|
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
A list of posts with pagination.


## End-point: Search Posts
### Method: GET
>```
>{{baseUrl}}/posts/search/?searchBy=sollicitudin&select=id,content,updateAt&sortBy=updateAt%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|sollicitudin|
|select|id,content,updateAt|
|sortBy|updateAt%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, title, status author, category, createAt, updateAt.
* Available values : id:ASC, id:DESC, title:ASC, title:DESC, status:ASC, status:DESC, author:ASC, author:DESC, category:ASC, category:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: title, description, content
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: title, description, content.

select (string): 
* List of fields to select.
* Example: id, title, description, content, status
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
A list of posts with pagination performed by a search.


## End-point: Filter Posts
### Method: GET
>```
>{{baseUrl}}/posts/filter/?filter.author=f68b3d30-e04a-4a19-b211-b3c809c2ded9&filter.category=c1180585-8ab8-4f85-9316-6ab1960abf92&sortBy=updateAt:DESC&select=id,title,description,updateAt
>```
### Query Params - Example:
|Param|value|
|---|---|
|filter.author|f68b3d30-e04a-4a19-b211-b3c809c2ded9|
|filter.category|c1180585-8ab8-4f85-9316-6ab1960abf92|
|sortBy|updateAt:DESC|
|select|id,title,description,updateAt|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.title (array[string]): 
* Filter by title query param.
* Format: filter.title={$not}:OPERATION:VALUE
* Example: filter.title=$not:$like:John Doe&filter.title=like:John
* Available Operations: $ilike

filter.description (array[string]): 
* Filter by description query param.
* Format: filter.description={$not}:OPERATION:VALUE
* Example: filter.description=$not:$like:John Doe&filter.description=like:John
* Available Operations: $ilike

filter.status (array[string]): 
* Filter by status query param.
* Format: filter.status={$not}:OPERATION:VALUE
* Example: filter.status=$not:$like:John Doe&filter.status=like:John
* Available Operations: $eq, $not

filter.content (array[string]): 
* Filter by content query param.
* Format: filter.content={$not}:OPERATION:VALUE
* Example: filter.content=$not:$like:John Doe&filter.content=like:John
* Available Operations: $ilike

filter.author (array[string]): 
* Filter by author query param.
* Format: filter.author={$not}:OPERATION:VALUE
* Example: filter.author=$not:$like:John Doe&filter.author=like:John
* Available Operations: $ilike

filter.category (array[string]): 
* Filter by category query param.
* Format: filter.category={$not}:OPERATION:VALUE
* Example: filter.category=$not:$like:John Doe&filter.category=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, title, status author, category, createAt, updateAt.
* Available values : id:ASC, id:DESC, title:ASC, title:DESC, status:ASC, status:DESC, author:ASC, author:DESC, category:ASC, category:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

select (string): 
* List of fields to select.
* Example: id, title, description, content, status
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
A filtered list of posts with pagination.


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


# 📁 Comments 

## End-point: Create Commentary
### Method: POST
>```
>{{baseUrl}}/comments/create
>```
### Body (**raw**)
```json
{
    "message": "This is a test comment 01",
    "reaction": ":D",
    "author": "f68b3d30-e04a-4a19-b211-b3c809c2ded9",
    "posts": []
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
The created comment data.


## End-point: Update Comment Data By Id
### Method: PUT
>```
>{{baseUrl}}/comments/edit/:id
>```
### Body (**raw**)
```json
{
    "message": "An (edited) test comment."
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR
### Returns:
The edited comment data.


## End-point: Delete Comment By Id
### Method: DELETE
>```
>{{baseUrl}}/comments/delete/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR
### Returns:
```json
{
    "raw": [],
    "affected": 1
}
```


## End-point: View Comment By Id
### Method: GET
>```
>{{baseUrl}}/comments/view/:id
>```
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
The comment data.


## End-point: View User's Comments
### Method: GET
>```
>{{baseUrl}}/comments/user/:id
>```
### Query Params:
|Param|value|
|---|---|
|page|1|
|limit|5|
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
A list of comments with pagination from that user.


## End-point: List of Coments
### Method: GET
>```
>{{baseUrl}}/comments/list
>```
### Query Params:
|Param|value|
|---|---|
|page|1|
|limit|5|
### Headers:
No required.
### Access rights by Role:
PUBLIC
### Returns:
A list of comments with pagination.


## End-point: Search Comments
### Method: GET
>```
>{{baseUrl}}/comments/search/?searchBy=prueba&select=message&sortBy=message%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|prueba|
|select|message|
|sortBy|message%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, message, author, post, createAt, updateAt.
* Available values : id:ASC, id:DESC, message:ASC, message:DESC, author:ASC, author:DESC, post:ASC, post:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: message
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: message.

select (string): 
* List of fields to select.
* Example: id, message, reaction, author, post
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
A list of comments with pagination performed by a search.


## End-point: Filter Comments
### Method: GET
>```
>{{baseUrl}}/comments/filter/?filter.author=f68b3d30-e04a-4a19-b211-b3c809c2ded9&sortBy=updateAt:DESC&select=id,message,updateAt
>```
### Query Params - Example:
|Param|value|
|---|---|
|filter.author|f68b3d30-e04a-4a19-b211-b3c809c2ded9|
|sortBy|updateAt:DESC|
|select|id,message,updateAt|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.message (array[string]): 
* Filter by message query param.
* Format: filter.message={$not}:OPERATION:VALUE
* Example: filter.message=$not:$like:John Doe&filter.message=like:John
* Available Operations: $ilike

filter.author (array[string]): 
* Filter by author query param.
* Format: filter.author={$not}:OPERATION:VALUE
* Example: filter.author=$not:$like:John Doe&filter.author=like:John
* Available Operations: $ilike

filter.post (array[string]): 
* Filter by post query param.
* Format: filter.post={$not}:OPERATION:VALUE
* Example: filter.post=$not:$like:John Doe&filter.post=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, message, author, post, createAt, updateAt.
* Available values : id:ASC, id:DESC, message:ASC, message:DESC, author:ASC, author:DESC, post:ASC, post:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

select (string): 
* List of fields to select.
* Example: id, message, reaction, author, post
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
A filtered list of comments with pagination.


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


# 📁 Search 

## End-point: Search Users
### Method: GET
>```
>{{baseUrl}}/search/users/?searchBy=tester&select=id,username,email,updateAt&sortBy=updateAt%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|tester|
|select|id,username,email,updateAt|
|sortBy|updateAt%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.username (array[string]): 
* Filter by username query param.
* Format: filter.username={$not}:OPERATION:VALUE
* Example: filter.username=$not:$like:John Doe&filter.username=like:John
* Available Operations: $eq,  $ilike

filter.email (array[string]): 
* Filter by email query param.
* Format: filter.email={$not}:OPERATION:VALUE
* Example: filter.email=$not:$like:John Doe&filter.email=like:John
* Available Operations: $eq,  $ilike

filter.status (array[string]): 
* Filter by status query param.
* Format: filter.status={$not}:OPERATION:VALUE
* Example: filter.status=$not:$like:John Doe&filter.status=like:John
* Available Operations: $eq, $not

filter.role (array[string]): 
* Filter by role query param.
* Format: filter.role={$not}:OPERATION:VALUE
* Example: filter.role=$not:$like:John Doe&filter.role=like:John
* Available Operations: $eq, $not

filter.firstName (array[string]): 
* Filter by firstName query param.
* Format: filter.firstName={$not}:OPERATION:VALUE
* Example: filter.firstName=$not:$like:John Doe&filter.firstName=like:John
* Available Operations: $ilike

filter.lastName (array[string]): 
* Filter by lastName query param.
* Format: filter.lastName={$not}:OPERATION:VALUE
* Example: filter.lastName=$not:$like:John Doe&filter.lastName=like:John
* Available Operations: $ilike

filter.age (array[string]): 
* Filter by age query param.
* Format: filter.age={$not}:OPERATION:VALUE
* Example: filter.age=$not:$like:John Doe&filter.age=like:John
* Available Operations: $eq, $btw, $lt, $lte, $gt, $gte

filter.city (array[string]): 
* Filter by city query param.
* Format: filter.city={$not}:OPERATION:VALUE
* Example: filter.city=$not:$like:John Doe&filter.city=like:John
* Available Operations: $ilike

filter.country (array[string]): 
* Filter by country query param.
* Format: filter.country={$not}:OPERATION:VALUE
* Example: filter.country=$not:$like:John Doe&filter.country=like:John
* Available Operations: $ilike

filter.content (array[string]): 
* Filter by content query param.
* Format: filter.content={$not}:OPERATION:VALUE
* Example: filter.content=$not:$like:John Doe&filter.content=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, username, email, status, role, firstName, lastName, age, city, country, createAt, updateAt.
* Available values : id:ASC, id:DESC, username:ASC, username:DESC, email:ASC, email:DESC, status:ASC, status:DESC, role:ASC, role:DESC, firstName:ASC, firstName:DESC, lastName:ASC, lastName:DESC, age:ASC, age:DESC, city:ASC, city:DESC, country:ASC, country:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: username,email,firstName,lastName,age
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: username, email, firstName, lastName, age, city, country.

select (string): 
* List of fields to select.
* Example: id, username, email, status, role
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR
### Returns:
A list of comments with pagination performed by a search.


## End-point: Search Categories
### Method: GET
>```
>{{baseUrl}}/search/categories/?searchBy=Default&select=id,title,description,updateAt&sortBy=updateAt%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|Default|
|select|id,title,description,updateAt|
|sortBy|updateAt%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.title (array[string]): 
* Filter by title query param.
* Format: filter.title={$not}:OPERATION:VALUE
* Example: filter.title=$not:$like:John Doe&filter.title=like:John
* Available Operations: $ilike

filter.description (array[string]): 
* Filter by description query param.
* Format: filter.description={$not}:OPERATION:VALUE
* Example: filter.description=$not:$like:John Doe&filter.description=like:John
* Available Operations: $ilike

filter.status (array[string]): 
* Filter by status query param.
* Format: filter.status={$not}:OPERATION:VALUE
* Example: filter.status=$not:$like:John Doe&filter.status=like:John
* Available Operations: $eq, $not

filter.author (array[string]): 
* Filter by author query param.
* Format: filter.author={$not}:OPERATION:VALUE
* Example: filter.author=$not:$like:John Doe&filter.author=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, title, status, author, createAt, updateAt.
* Available values : id:ASC, id:DESC, title:DESC, status:ASC, status:DESC, author:ASC, author:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: title, description
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: title, description.

select (string): 
* List of fields to select.
* Example: id,username,email,status,rol
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
A list of comments with pagination performed by a search.


## End-point: Search Posts
### Method: GET
>```
>{{baseUrl}}/search/posts/?searchBy=sollicitudin&select=id,content,updateAt&sortBy=updateAt%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|sollicitudin|
|select|id,content,updateAt|
|sortBy|updateAt%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.title (array[string]): 
* Filter by title query param.
* Format: filter.title={$not}:OPERATION:VALUE
* Example: filter.title=$not:$like:John Doe&filter.title=like:John
* Available Operations: $ilike

filter.description (array[string]): 
* Filter by description query param.
* Format: filter.description={$not}:OPERATION:VALUE
* Example: filter.description=$not:$like:John Doe&filter.description=like:John
* Available Operations: $ilike

filter.status (array[string]): 
* Filter by status query param.
* Format: filter.status={$not}:OPERATION:VALUE
* Example: filter.status=$not:$like:John Doe&filter.status=like:John
* Available Operations: $eq, $not

filter.content (array[string]): 
* Filter by content query param.
* Format: filter.content={$not}:OPERATION:VALUE
* Example: filter.content=$not:$like:John Doe&filter.content=like:John
* Available Operations: $ilike

filter.author (array[string]): 
* Filter by author query param.
* Format: filter.author={$not}:OPERATION:VALUE
* Example: filter.author=$not:$like:John Doe&filter.author=like:John
* Available Operations: $ilike

filter.category (array[string]): 
* Filter by category query param.
* Format: filter.category={$not}:OPERATION:VALUE
* Example: filter.category=$not:$like:John Doe&filter.category=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, title, status author, category, createAt, updateAt.
* Available values : id:ASC, id:DESC, title:ASC, title:DESC, status:ASC, status:DESC, author:ASC, author:DESC, category:ASC, category:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: title, description, content
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: title, description, content.

select (string): 
* List of fields to select.
* Example: id, title, description, content, status
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR, EDITOR, BASIC
### Returns:
A list of comments with pagination performed by a search.


## End-point: Search Comments
### Method: GET
>```
>{{baseUrl}}/search/comments/?searchBy=prueba&select=message&sortBy=message%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|prueba|
|select|message|
|sortBy|message%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.message (array[string]): 
* Filter by message query param.
* Format: filter.message={$not}:OPERATION:VALUE
* Example: filter.message=$not:$like:John Doe&filter.message=like:John
* Available Operations: $ilike

filter.author (array[string]): 
* Filter by author query param.
* Format: filter.author={$not}:OPERATION:VALUE
* Example: filter.author=$not:$like:John Doe&filter.author=like:John
* Available Operations: $ilike

filter.post (array[string]): 
* Filter by post query param.
* Format: filter.post={$not}:OPERATION:VALUE
* Example: filter.post=$not:$like:John Doe&filter.post=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, message, author, post, createAt, updateAt.
* Available values : id:ASC, id:DESC, message:ASC, message:DESC, author:ASC, author:DESC, post:ASC, post:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: message
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: message.

select (string): 
* List of fields to select.
* Example: id, message, reaction, author, post
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN, MODERATOR
### Returns:
A list of comments with pagination performed by a search.


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃


# 📁 Admin

## End-point: Admin - Update User Data By Id
### Method: PUT
>```
>{{baseUrl}}/admin/users/edit/:id
>```
### Body (**raw**) - Example
```json
{
    "age": 41
}
```
### Body (**raw**) - Complete
Complete list to update:
```json
{
    "username": "Tester",
    "password": "abc12345",
    "status": "PENDING",
    "role": "BASIC",
    "firstName": "Tester",
    "lastName": "UserTester",
    "email": "tester@tester.com",
    "age": 31,
    "city": "Córdoba",
    "country": "Argentina",
    "avatar": "https://www.url.com/image.jpg",
    "karma": 0
}
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
The updated user data.


## End-point: Admin - Delete User By Id
### Method: DELETE
>```
>{{baseUrl}}/admin/users/delete/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
```json
{
    "raw": [],
    "affected": 1
}
```


## End-point: Admin - Own Profile
### Method: GET
>```
>{{baseUrl}}/admin/users/profile/
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
The current admin user data.


## End-point: Admin - View User Data By Id
### Method: GET
>```
>{{baseUrl}}/admin/users/view/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
The user data.


## End-point: Admin - List Users
### Method: GET
>```
>{{baseUrl}}/admin/users/list
>```
### Query Params:
|Param|value|
|---|---|
|page|1|
|limit|5|
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
A list of users with pagination.


## End-point: Admin - Create Category
### Method: POST
>```
>{{baseUrl}}/admin/categories/create
>```
### Body (**raw**)
```json
{
    "title": "Default Category",
    "description": "Default Category description",
    "image": "https://getlorem.com/static/images/cicero2.jpg",
    "author": "f68b3d30-e04a-4a19-b211-b3c809c2ded9",
    "status": "PUBLISHED",
    "posts": []
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
The created category data.


## End-point: Admin - Update Category Data By Id
### Method: PUT
>```
>{{baseUrl}}/admin/categories/edit/:id
>```
### Body (**raw**)
```json
{
    "title": "Default Category (Updated!)"
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
The updated category data.


## End-point: Admin - Delete Category By Id
### Method: DELETE
>```
>{{baseUrl}}/admin/categories/delete/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
```json
{
    "raw": [],
    "affected": 1
}
```


## End-point: Admin - View Category Data By Id
### Method: GET
>```
>{{baseUrl}}/admin/categories/view/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
The category data.


## End-point: Admin - List Categories
### Method: GET
>```
>{{baseUrl}}/admin/categories/list
>```
### Query Params:
|Param|value|
|---|---|
|page|1|
|limit|5|
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
A list of categories with pagination.


## End-point: Admin - Update Post Data By Id
### Method: PUT
>```
>{{baseUrl}}/admin/posts/edit/:id
>```
### Body (**raw**)
```json
{
    "title": "New title for post 08",
    "description": "New Description for post 08"
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
The updated post data.


## End-point: Admin - Delete Post By Id
### Method: DELETE
>```
>{{baseUrl}}/admin/posts/delete/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
```json
{
    "raw": [],
    "affected": 1
}
```


## End-point: Admin - View Post Data By Id
### Method: GET
>```
>{{baseUrl}}/admin/posts/view/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
The post data.


## End-point: Admin - List Posts
### Method: GET
>```
>{{baseUrl}}/admin/posts/list
>```
### Query Params:
|Param|value|
|---|---|
|page|1|
|limit|5|
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
A list of posts with pagination.


## End-point: Admin - Update Comment Data By Id
### Method: PUT
>```
>{{baseUrl}}/comments/edit/:id
>```
### Body (**raw**)
```json
{
    "message": "An (edited) test comment."
}
```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
The updated comment data.


## End-point: Admin - Delete Comment By Id
### Method: DELETE
>```
>{{baseUrl}}/comments/delete/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
```json
{
    "raw": [],
    "affected": 1
}
```


## End-point: Admin - View Commentary By Id
### Method: GET
>```
>{{baseUrl}}/comments/view/:id
>```
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
The comment data.


## End-point: Admin - List Comments
### Method: GET
>```
>{{baseUrl}}/admin/comments/list
>```
### Query Params:
|Param|value|
|---|---|
|page|1|
|limit|5|
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
A list of comments with pagination.


## End-point: Admin - Search Users
### Method: GET
>```
>{{baseUrl}}/admin/search/users/?searchBy=tester&select=id,username,email,updateAt&sortBy=updateAt%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|page|1|
|limit|10|
|searchBy|tester|
|select|id,username,email,updateAt|
|sortBy|updateAt%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.username (array[string]): 
* Filter by username query param.
* Format: filter.username={$not}:OPERATION:VALUE
* Example: filter.username=$not:$like:John Doe&filter.username=like:John
* Available Operations: $eq,  $ilike

filter.email (array[string]): 
* Filter by email query param.
* Format: filter.email={$not}:OPERATION:VALUE
* Example: filter.email=$not:$like:John Doe&filter.email=like:John
* Available Operations: $eq,  $ilike

filter.status (array[string]): 
* Filter by status query param.
* Format: filter.status={$not}:OPERATION:VALUE
* Example: filter.status=$not:$like:John Doe&filter.status=like:John
* Available Operations: $eq, $not

filter.role (array[string]): 
* Filter by role query param.
* Format: filter.role={$not}:OPERATION:VALUE
* Example: filter.role=$not:$like:John Doe&filter.role=like:John
* Available Operations: $eq, $not

filter.firstName (array[string]): 
* Filter by firstName query param.
* Format: filter.firstName={$not}:OPERATION:VALUE
* Example: filter.firstName=$not:$like:John Doe&filter.firstName=like:John
* Available Operations: $ilike

filter.lastName (array[string]): 
* Filter by lastName query param.
* Format: filter.lastName={$not}:OPERATION:VALUE
* Example: filter.lastName=$not:$like:John Doe&filter.lastName=like:John
* Available Operations: $ilike

filter.age (array[string]): 
* Filter by age query param.
* Format: filter.age={$not}:OPERATION:VALUE
* Example: filter.age=$not:$like:John Doe&filter.age=like:John
* Available Operations: $eq, $btw, $lt, $lte, $gt, $gte

filter.city (array[string]): 
* Filter by city query param.
* Format: filter.city={$not}:OPERATION:VALUE
* Example: filter.city=$not:$like:John Doe&filter.city=like:John
* Available Operations: $ilike

filter.country (array[string]): 
* Filter by country query param.
* Format: filter.country={$not}:OPERATION:VALUE
* Example: filter.country=$not:$like:John Doe&filter.country=like:John
* Available Operations: $ilike

filter.content (array[string]): 
* Filter by content query param.
* Format: filter.content={$not}:OPERATION:VALUE
* Example: filter.content=$not:$like:John Doe&filter.content=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, username, email, status, role, firstName, lastName, age, city, country, createAt, updateAt.
* Available values : id:ASC, id:DESC, username:ASC, username:DESC, email:ASC, email:DESC, status:ASC, status:DESC, role:ASC, role:DESC, firstName:ASC, firstName:DESC, lastName:ASC, lastName:DESC, age:ASC, age:DESC, city:ASC, city:DESC, country:ASC, country:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: username,email,firstName,lastName,age
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: username, email, firstName, lastName, age, city, country.

select (string): 
* List of fields to select.
* Example: id, username, email, status, role
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
A list of users with pagination performed by a search.


## End-point: Admin - Search Categories
### Method: GET
>```
>{{baseUrl}}/admin/search/categories/?searchBy=Default&select=id,title,description,updateAt&sortBy=updateAt%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|Default|
|select|id,title,description,updateAt|
|sortBy|updateAt%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.title (array[string]): 
* Filter by title query param.
* Format: filter.title={$not}:OPERATION:VALUE
* Example: filter.title=$not:$like:John Doe&filter.title=like:John
* Available Operations: $ilike

filter.description (array[string]): 
* Filter by description query param.
* Format: filter.description={$not}:OPERATION:VALUE
* Example: filter.description=$not:$like:John Doe&filter.description=like:John
* Available Operations: $ilike

filter.status (array[string]): 
* Filter by status query param.
* Format: filter.status={$not}:OPERATION:VALUE
* Example: filter.status=$not:$like:John Doe&filter.status=like:John
* Available Operations: $eq, $not

filter.author (array[string]): 
* Filter by author query param.
* Format: filter.author={$not}:OPERATION:VALUE
* Example: filter.author=$not:$like:John Doe&filter.author=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, title, status, author, createAt, updateAt.
* Available values : id:ASC, id:DESC, title:DESC, status:ASC, status:DESC, author:ASC, author:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: title, description
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: title, description.

select (string): 
* List of fields to select.
* Example: id,username,email,status,rol
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
A list of categories with pagination performed by a search.


## End-point: Admin - Search Posts
### Method: GET
>```
>{{baseUrl}}/admin/search/posts/?searchBy=sollicitudin&select=id,content,updateAt&sortBy=updateAt%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|sollicitudin|
|select|id,content,updateAt|
|sortBy|updateAt%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.title (array[string]): 
* Filter by title query param.
* Format: filter.title={$not}:OPERATION:VALUE
* Example: filter.title=$not:$like:John Doe&filter.title=like:John
* Available Operations: $ilike

filter.description (array[string]): 
* Filter by description query param.
* Format: filter.description={$not}:OPERATION:VALUE
* Example: filter.description=$not:$like:John Doe&filter.description=like:John
* Available Operations: $ilike

filter.status (array[string]): 
* Filter by status query param.
* Format: filter.status={$not}:OPERATION:VALUE
* Example: filter.status=$not:$like:John Doe&filter.status=like:John
* Available Operations: $eq, $not

filter.content (array[string]): 
* Filter by content query param.
* Format: filter.content={$not}:OPERATION:VALUE
* Example: filter.content=$not:$like:John Doe&filter.content=like:John
* Available Operations: $ilike

filter.author (array[string]): 
* Filter by author query param.
* Format: filter.author={$not}:OPERATION:VALUE
* Example: filter.author=$not:$like:John Doe&filter.author=like:John
* Available Operations: $ilike

filter.category (array[string]): 
* Filter by category query param.
* Format: filter.category={$not}:OPERATION:VALUE
* Example: filter.category=$not:$like:John Doe&filter.category=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, title, status author, category, createAt, updateAt.
* Available values : id:ASC, id:DESC, title:ASC, title:DESC, status:ASC, status:DESC, author:ASC, author:DESC, category:ASC, category:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: title, description, content
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: title, description, content.

select (string): 
* List of fields to select.
* Example: id, title, description, content, status
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
A list of posts with pagination performed by a search.


## End-point: Admin - Search Comments
### Method: GET
>```
>{{baseUrl}}/admin/search/comments/?searchBy=prueba&select=message&sortBy=message%3ADESC
>```
### Query Params - Example:
|Param|value|
|---|---|
|searchBy|prueba|
|select|message|
|sortBy|message%3ADESC|
### Query description:
page (number): 
* Page number to retrieve. If you provide invalid value the default page number will applied
* Example: 1
* Default Value: 1

limit (number): 
* Number of records per page.
* Example: 20
* Default Value: 10
* Max Value: 100   -> If provided value is greater than max value, max value will be applied.

filter.id (array[string]): 
* Filter by id query param.
* Format: filter.id={$not}:OPERATION:VALUE
* Example: filter.id=$not:$like:John Doe&filter.id=like:John
* Available Operations: $and, $or, $not, $eq, $gt, $gte, $in, $null, $lt, $lte, $btw, $ilike, $sw, $contains

filter.message (array[string]): 
* Filter by message query param.
* Format: filter.message={$not}:OPERATION:VALUE
* Example: filter.message=$not:$like:John Doe&filter.message=like:John
* Available Operations: $ilike

filter.author (array[string]): 
* Filter by author query param.
* Format: filter.author={$not}:OPERATION:VALUE
* Example: filter.author=$not:$like:John Doe&filter.author=like:John
* Available Operations: $ilike

filter.post (array[string]): 
* Filter by post query param.
* Format: filter.post={$not}:OPERATION:VALUE
* Example: filter.post=$not:$like:John Doe&filter.post=like:John
* Available Operations: $ilike

filter.createAt (array[string]): 
* Filter by createAt query param.
* Format: filter.createAt={$not}:OPERATION:VALUE
* Example: filter.createAt=$not:$like:John Doe&filter.createAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

filter.updateAt (array[string]): 
* Filter by updateAt query param.
* Format: filter.updateAt={$not}:OPERATION:VALUE
* Example: filter.updateAt=$not:$like:John Doe&filter.updateAt=like:John
* Available Operations: $btw, $lt, $lte, $gt, $gte

sortBy (array[string]): 
* Parameter to sort by.
* To sort by multiple fields, just provide query param multiple types. The order in url defines an order of sorting.
* Format: fieldName:DIRECTION
* Example: sortBy=id:DESC&sortBy=createdAt:ASC
* Default Value: updateAt:DESC
* Available Fields: id, message, author, post, createAt, updateAt.
* Available values : id:ASC, id:DESC, message:ASC, message:DESC, author:ASC, author:DESC, post:ASC, post:DESC, createAt:ASC, createAt:DESC, updateAt:ASC, updateAt:DESC

search (string): 
* Search term to filter result values.
* Example: John
* Default Value: No default value.

searchBy (string): 
* List of fields to search by term to filter result values.
* Example: message
* Default Value: By default all fields mentioned below will be used to search by term.
* Available Fields: message.

select (string): 
* List of fields to select.
* Example: id, message, reaction, author, post
* Default Value: By default all fields returns. If you want to select only some fields, provide them in query param.
### Headers:
Requires access_token.
### Access rights by Role:
ADMIN
### Returns:
A list of comments with pagination performed by a search.

