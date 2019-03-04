const chai = require('chai');
const supertest = require('supertest');
const app = require('../src/app');

global.expect = chai.expect;
global.request = supertest(app);
