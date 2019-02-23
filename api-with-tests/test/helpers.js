const chai = require('chai');
const app = require('../src/app');
const supertest = require('supertest');

global.expect = chai.expect;
global.request = supertest(app);
global.app = app

