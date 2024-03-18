function status(request, response) {
  response.status(200).json({ key: "up the average" });
}

export default status;
