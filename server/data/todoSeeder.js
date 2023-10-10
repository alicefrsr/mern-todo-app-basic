import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

// MODELS we check imported data against
import Todo from '../models/todoModel.js';

// DATABASE CONNECTION
dotenv.config();
import connectDB from '../config/db.js';
connectDB();

// DATA TO IMPORT
// 1. from JS file: import todos from './data/todosData.js';
// OR 2. from JSON file: READ + CONVERT file into JS
import fs from 'fs';
////////////////////////////////////////////
// to fix ReferenceError: __dirname is not defined in ES module scope
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// console.log('directory name: ', __dirname);
////////////////////////////////////////////
const todos = JSON.parse(
  fs.readFileSync(`${__dirname}/todosData.json`, 'utf-8')
);

// IMPORT DATA TO DB
const importData = async () => {
  try {
    await Todo.create(todos);
    console.log('Todos successfully imported to db'.green.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// DELETE ALL DATA FROM DB
const deleteData = async () => {
  try {
    await Todo.deleteMany();
    console.log('Todos successfully deleted from db'.red.inverse);
    process.exit();
  } catch (error) {
    console.log(`${error}`.red.inverse);
    process.exit(1);
  }
};

// to run either of these function from CLI:
if (process.argv[2] === '--import') importData();
// --> node data/todoSeeder.js --import
if (process.argv[2] === '--delete') deleteData();
// --> node data/todoSeeder.js --delete
