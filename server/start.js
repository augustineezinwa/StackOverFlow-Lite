import app from './app.js';

const port = process.env.PORT || 8000;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`server is active on port ${port}`);
});
