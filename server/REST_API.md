## 나의 롤링페이퍼 보기
**Request**<br>
GET posts/:uid  HTTP/1.1

**Response**<br>
HTTP/1.1 200 OK<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "title":String,
  "total_message": Number,
  "messages": [
    "content": String,
    "writer": String,
    "created_at": Date
  ],
}
```
  
## 메시지 작성하기
**Request**<br>
POST posts/message HTTP/1.1<br>
Content-type: application/json;charset=utf-8
```json
{
  "owner_id": Number,
  "message": String,
  "writer": String
  "created_at": Date
}
```
**Response**<br>
HTTP/1.1 201 OK<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "pid": Number,
  "mid": Number
}
```

## 회원가입
**Request**<br>
POST users/signup HTTP/1.1<br>
Authorization: Bearer ${ACCESS_TOKEN}<br>
Content-type: application/json;charset=utf-8
```json
{
  "email": String,
  "password": String,
  "nickname": String
}
```
**Response**<br>
HTTP/1.1 201 OK<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "access_token": String,
  "uid": Number
}
```

## 로그인
**Request**<br>
POST users/signin HTTP/1.1<br>
Authorization: Bearer ${ACCESS_TOKEN}<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "email": String,
  "password": String,
}
```
**Response**<br>
HTTP/1.1 200 OK<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "access_token": String,
  "uid": Number
}
```


## 로그아웃
**Request**<br>
DELETE users/signout HTTP/1.1<br>
Authorization: Bearer ${ACCESS_TOKEN}<br>
Content-Type: application/json;charset=UTF-8<br>

**Response**<br>
HTTP/1.1 200 OK<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "uid": String
}
```
## 회원정보 조회
**Request**<br>
GET users/:uid  HTTP/1.1<br>
Authorization: Bearer ${ACCESS_TOKEN}<br>

**Response**<br>
HTTP/1.1 200 OK<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "title": String,
  "email": String,
  "nickname": String,
  "total_message": Number
}
```

## 회원 정보 수정
**Request**<br>
PATCH users/properties HTTP/1.1<br>
Authorization: Bearer ${ACCESS_TOKEN}<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "nickname": String,
  "password": String,
  "title": String,
}
```
**Response**<br>
HTTP/1.1 200 OK<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "uid": Number
}
```

## 회원 탈퇴
**Request**<br>
DELETE users/properties HTTP/1.1<br>
Authorization: Bearer ${ACCESS_TOKEN}<br>
Content-Type: application/json;charset=UTF-8

**Response**<br>
HTTP/1.1 200 OK<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "uid": Number
}
```
## 전체 메시지 목록 조회
**Request**<br>
GET posts/:pid  HTTP/1.1<br>
Authorization: Bearer ${ACCESS_TOKEN}<br>

**Response**<br>
HTTP/1.1 200 OK<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "messages": [
    "content": String,
    "create_at": String,
    "writer": String
  ]
}
```

## 메시지 삭제
**Request**<br>
DELETE posts/messages HTTP/1.1<br>
Authorization: Bearer ${ACCESS_TOKEN}<br>
Content-Type: application/json;charset=UTF-8
```
{
  "pid": Number
  "messages": [
    "mid": Number
  ]
}
```
**Response**<br>
HTTP/1.1 200 OK<br>
Content-Type: application/json;charset=UTF-8
```json
{
  "pid": Number
}
```