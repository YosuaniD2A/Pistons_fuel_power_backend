const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const cron = require('node-cron');
const { getAllInfluencersModel, updateInfluencerModel } = require('./models/influencers.model');
const { getOrdersXMonthAgoModel } = require('./models/orders.model');

require('dotenv').config();
const app = express();
const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  preflightContinue: false,
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization', 'Access-Control-Allow-Origin', 'Access-Control-Allow-Methods'],
  optionsSuccessStatus: 200
};

// View engine setup ----------------------------------------------------------------------
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares ----------------------------------------------------------------------------
app.use(cors(corsOptions));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Routes ---------------------------------------------------------------------------------
// Dashboard
app.use('/', require('./routes/index'));
app.use('/api/dashboard/auth', require('./routes/dashboard/auth'));
app.use('/api/dashboard/collections', require('./routes/dashboard/collections'));
app.use('/api/dashboard/products', require('./routes/dashboard/products'));
app.use('/api/dashboard/variants', require('./routes/dashboard/variants'));
app.use('/api/dashboard/images', require('./routes/dashboard/images'));
app.use('/api/dashboard/discounts', require('./routes/dashboard/discounts'));
app.use('/api/dashboard/gallery', require('./routes/dashboard/gallery'));
app.use('/api/dashboard/influencers', require('./routes/dashboard/influencers'));
app.use('/api/dashboard/requests', require('./routes/dashboard/requests'));
app.use('/api/dashboard/sendMailer', require('./routes/dashboard/sendMailer'));
// Shop
app.use('/api/shop/products', require('./routes/shop/products'));
app.use('/api/shop/collections', require('./routes/shop/collections'));
app.use('/api/shop/gallery', require('./routes/shop/gallery'));
app.use('/api/shop/payment', require('./routes/shop/payment'));
app.use('/api/shop/orders', require('./routes/shop/orders'));
app.use('/api/shop/influencers', require('./routes/shop/influencers'));
app.use('/api/shop/requests', require('./routes/shop/requests'));

//Scheduled Task (Update balance) ----------------------------------------------------------
cron.schedule('0 0 1 * *', async () => {
  const [influencers] = await getAllInfluencersModel();
  
  for (const influencer of influencers) {
    if (influencer.status !== 0) {
      continue; 
    }

    const discountCode = influencer.discount_code;

    const response = await getOrdersXMonthAgoModel(1, discountCode);
    const orders = response[0];

    const totalSales = (orders[0].order_count * 24.99) * 0.5;

    // const totalSales = orders.reduce((acc, order) => {
    //   return acc + (order.order_count * 24.99 * 0.5); // Cálculo del total de ventas
    // }, 0);

    const result = await updateInfluencerModel({ balance: influencer.balance + totalSales }, influencer.id);
  }
}, {
  timezone: 'America/New_York'
});


// Errors handlers ------------------------------------------------------------------------
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
