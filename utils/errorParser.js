function errorParser(error) {
  console.log(error);
  if (Array.isArray(error)) {
    const res = error.map((e) => e.msg);
    return res.join('\n');
  } else if (error.response) {
    return error.response.statusText;
  } else {
    return error.message;
  }
}

module.exports = errorParser;
