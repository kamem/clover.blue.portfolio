import express from 'express'
import logger from 'morgan'
import bodyParser from 'body-parser'
import methodOverride from 'method-override'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import csrf from 'csurf'
import path from 'path'

import * as post from './routes/post'
import {
  qiitaItems,
  qiitaTags,
  tumblrItems,
  tumblrTags
} from './db'

const app = express();


// middleware
app.set('views', `${__dirname}/views`)
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, '../public')));

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
app.get('/', post.index);
app.get('/about', post.about);
app.get('/photo', post.photo);
app.get('/weblog', post.weblog);
app.get('/illust', post.illust);
app.get('/diary', post.diary);
app.get('/design', post.design);
qiitaItems.find({}, (err, posts) => {
  posts.forEach(({ uuid }) => {
    app.get(`/items/${uuid}`, post.entry);
  })
});

qiitaTags.find({}, (err, posts) => {
  posts.forEach(({ name }) => {
    app.get(`/weblog/tags/${encodeURI(name)}`, post.tag);
  })
});
tumblrItems.find({}, (err, posts) => {
  posts.forEach(({ uuid }) => {
    app.get(`/post/${uuid}`, post.diaryEntry);
  })
});
tumblrTags.find({}, (err, posts) => {
  posts.forEach(({ name }) => {
    app.get(`/diary/tags/${encodeURI(name)}`, post.tag);
  })
});

// template
app.get('/template/*', post.template);

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
