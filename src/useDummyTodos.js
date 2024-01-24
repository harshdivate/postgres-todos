const generateDummyTodos = () => {
  const todos = Array.from({ length: 20 }, (_, index) => {
    return {
      id: Date.now() + Math.random() * 10,
      todoHeading: `Todo ${index + 1}`,
      todoDescription: `Description ${index + 1}`,
      date: new Date().toISOString(), // You may replace this with your desired date logic
      status: "Pending", // You may replace this with your desired status logic
      isFavourite: "F",
    };
  });

  return todos;
};

export default generateDummyTodos;
