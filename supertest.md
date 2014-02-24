
### post

```js
it('POST should 200 add banned', function (done) {
  request(app)
  .post('/user/banned')
  .send({
    oper: 'add',
    users: 'mock_banned_user'
  })
  .set('Cookie', mock.mockAdminCookie)
  .expect(200)
  .expect({
    success: true,
    count: 1
  }, done);
});
```