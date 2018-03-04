module.exports = [
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Yes, and I use Gifted Chat!',
    createdAt: new Date(2016, 7, 22, 17, 20, 0),
    user: {
      _id: 1,
      name: '郑华',
    },
    // location: {
    //   latitude: 48.864601,
    //   longitude: 2.398704
    // },
  },
  {
    _id: Math.round(Math.random() * 1000000),
    text: 'Are you building a chat app?',
    createdAt: new Date(2016, 7, 22, 17, 20, 0),
    user: {
      _id: 2,
      name: '面包派对',
    },
  },
];
