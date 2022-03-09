'use strict';

// npx sequelize-cli db:seed:all
module.exports = {
  async up(queryInterface, Sequelize) {
    // 1) 유저 데이터 먼저 입력
    const userList = [
      {
        email: 'kim@hello.com',
        password: '1111',
        nickname: 'rollKim',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'lee@hello.com',
        password: '1111',
        nickname: 'rollLee',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        email: 'park@hello.com',
        password: '1111',
        nickname: 'rollPark',
        available: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]; // end of userList
    await queryInterface.bulkInsert('Users', userList, {});

    // 2) 포스트 데이터 입력
    const postList = [
      {
        title: 'rollKim의 롤링페이퍼',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'rollLee의 롤링페이퍼',
        userId: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: 'rollPark의 롤링페이퍼',
        userId: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]; // end of bulkInsert to posts

    await queryInterface.bulkInsert('Posts', postList, {});

    // 3) 포스트에 작성된 메시지 데이터 입력
    const messageList = [
      {
        postId: 1,
        content: 'Life is what happens when you are busy making other plans.',
        writer: 'John Lennon',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 1,
        content:
          'Always remember that you are absolutely unique. Just like everyone else',
        writer: 'Margaret Mead',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 2,
        content:
          '아침에는 모든 게 가능해 보인다. 아이디어로 넘쳐흐른다! 가능성! 타인을 향한 사랑! 아무도 나를 멈출 수 없다. 하지만 오후 4시쯤 되면 나 자신과 인류에 대한 기대를 깨끗이 단념한다. 그렇게 미루기는 늦은 오후에 정점을 찍는다. ',
        writer: '미루기의 천재들',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 2,
        content: '식물에서 푸른 빛이 나는 게 분명 흔한 일은 아니죠?',
        writer: '지구 끝의 온실',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        postId: 2,
        content:
          'You will face many defeats in life, but never let yourself be defeated.',
        writer: 'Maya Angelou',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]; // end of messages

    await queryInterface.bulkInsert('Messages', messageList, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
    await queryInterface.bulkDelete('Posts', null, {});
    await queryInterface.bulkDelete('Messages', null, {});
  },
};
