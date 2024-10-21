// ERROR handling middleware
app.use(errorHandler);

//ROUTES BELOW
app.get("/", (req, res) => {
  res.send("working");
});

// APP CONFIG START
app.listen(port, () => {
  console.log("Server running in port http://localhost:${port}");
});
