exports.getId = (front) => {
  return (
    front + Date.now().toString() + Math.floor(Math.random() * 1000).toString()
  );
};
