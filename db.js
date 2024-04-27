const { Sequelize, DataTypes } = require("sequelize");

// 从环境变量中读取数据库配置
const { MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_ADDRESS = "" } = process.env;

const [host, port] = MYSQL_ADDRESS.split(":");

const sequelize = new Sequelize("nodejs_demo", MYSQL_USERNAME, MYSQL_PASSWORD, {
  host,
  port,
  dialect: "mysql" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
});

// 定义数据模型
const Counter = sequelize.define("Counter", {
  count: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
  },
});

// 数据库初始化方法
async function init() {
  await Counter.sync({ alter: true });
}

// 定义用户数据模型
const User = sequelize.define("User", {
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true, // 设置为主键
    autoIncrement: true, // 自动递增
  },
  nickname: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  imgurl: {
    type: DataTypes.STRING,
  },
  star: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  head_deco: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  body_deco: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  eye_deco: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
});

// 添加User模型到导出的初始化方法中
module.exports = {
  init,
  Counter,
  User,
};
