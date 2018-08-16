import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import csrf from 'csurf'
import path from 'path'
import paginate from 'express-paginate'

import pages from './routes/pages'
import * as post from './routes/post'
import {
  qiitaItems,
  qiitaTags,
  dropbox_paperItems,
  dropbox_paperTags,
} from './db'

import Qiita from './api/Qiita'
const qiita = new Qiita()
import DropboxApi from './api/Dropbox'
const dropbox = new DropboxApi()

const app = express();

// middleware
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../public')));
app.use(paginate.middleware(10, 50))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride((req) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method
    delete req.body._method
    return method
  }
}));

// csrf対策
app.use(cookieParser());
app.use(session({
  resave: true,
  saveUninitialized: false,
  secret: '929nfwamicl'
}));
app.use(csrf());
app.use((req, res, next) => {
  res.locals.csrftoken = req.csrfToken();
  next();
})
app.use(logger('dev'));

// routing
app.get('/update/qiita', (req, res) => {
  if(!req.query.api_key) {
    return res.status(400).send('パラメーターが間違ってるよ')
  }

  qiita.API_KEY = req.query.api_key
  qiita.saveEntries().then((values) => {
    console.log('complated!!')
    res.json(values)
  }).catch((err) => {
    console.log(err)
    return res.status(500).send('Something broke!')
  })
})
app.get('/update/dropbox', (req, res) => {
  if(!req.query.api_key) {
    return res.status(400).send('パラメーターが間違ってるよ')
  }

  dropbox.API_KEY = req.query.api_key
  dropbox.saveEntries().then((values) => {
    console.log('complated!!')
    res.json(values)
  }).catch((err) => {
    console.log(err)
    return res.status(500).send('Something broke!')
  })
})

pages.forEach((page) => {
  app[page.method](page.url, page.complete)
})

qiitaItems.find({}, (err, posts) => {
  posts.forEach(({ uuid }) => {
    app.get(`/items/${uuid}`, (req, res) => post.entry(req, res, 'items', 'qiitaItems'));
  })
})
dropbox_paperItems.find({}, (err, posts) => {
  posts.forEach(({ uuid }) => {
    app.get(`/doc/${uuid}`, (req, res) => post.entry(req, res, 'doc', 'dropbox_paperItems'))
  })
})

app.get('/photo', post.photo);
app.get('/weblog', post.weblog);
app.get('/illust', post.illust);
app.get('/diary', post.diary);
app.get('/design', post.design);


qiitaTags.find({}, (err, posts) => {
  posts.forEach(({ name }) => {
    app.get(`/tags/${encodeURI(name)}`, post.index);
  })
})
dropbox_paperTags.find({}, (err, posts) => {
  posts.forEach(({ name }) => {
    app.get(`/tags/${encodeURI(name)}`, post.index);
  })
})

// feed
app.get('/feed', post.feed);
app.get('/feed/illust', post.feedChild);
app.get('/feed/photo', post.feedChild);
app.get('/feed/weblog', post.feedChild);
app.get('/feed/diary', post.feedChild);
app.get('/feed/design', post.feedDesign);

// sitemap
app.get('/sitemap.xml', post.sitemap);

// error
app.use((err, req, res, next) => {
  console.log(res)
  if (res.headersSent) {
    return next(err);
  }
  res.status(500);
  res.render('error', { error: err });
});

export default app
