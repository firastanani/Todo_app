var seeder = require("mongoose-seed");

const db = "mongodb://127.0.0.1:27017/task-manager-api";

// (((((((Initializing users form dataForUser)))))))
seeder.connect(db, function () {
  seeder.loadModels(["./model/User.js"]);

  seeder.clearModels(["User"], function () {
    seeder.populateModels(dataForUser, function () {
      seeder.disconnect();
    });
  });
});

// (((((((Initializing todo from dataForTodo)))))))
seeder.connect(db, function () {
  seeder.loadModels(["./model/todo.js"]);

  seeder.clearModels(["Todo"], function () {
    seeder.populateModels(dataForTodo, function () {
      seeder.disconnect();
    });
  });
});

var dataForUser = [
  {
    model: "User",
    documents: [
      {
        _id: "615a664ece7f792362c3c363",
        name: "firas tanani",
        email: "user1@gmail.com",
        password: "firas123456",
        age: 23,
        tokens:[
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTVhNjY0ZWNlN2Y3OTIzNjJjM2MzNjMiLCJpYXQiOjE2MzMzMzc4MjV9.W0X2c4fEtP10e6ciMxVm_mRomJiNRbmJfoeh0atOWXk",
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTVhNjY0ZWNlN2Y3OTIzNjJjM2MzNjMiLCJpYXQiOjE2MzMzMzc4NDZ9.25ubN3VBxFEoFd3XQqegAvjihrR1bNOg3AUw1jptAYA"
        ]
      },
      {
        _id: "615a664ece7f792362c3c364",
        name: "waseem",
        email: "user2@gmail.com",
        password: "firas123456", 
        age: 11,

      },
      {
        _id: "615a664ece7f792362c3c365",
        name: "Adnan",
        email: "user3@gmail.com",
        password: "firas123456",
        age: 22,
      },
    ],
  },
];

var dataForTodo = [
  {
    model: "Todo",
    documents: [
      {
        _id: "615a664ece7f792362c3c555",
        description: "send report",
        completed: true,
        owner: "615a664ece7f792362c3c363",
      },
      {
        _id: "615a664ece7f792362c3c444",
        description: "walk along",
        completed: false,
        owner: "615a664ece7f792362c3c364",
      },
      {
        _id: "615a664ece7f792362c3c333",
        description: "play football",
        completed: false,
        owner: "615a664ece7f792362c3c365",
      },
      {
        _id: "615a664ece7f792362c3c222",
        description: "play music",
        completed: false,
        owner: "615a664ece7f792362c3c365",
      },
    ],
  },
];
