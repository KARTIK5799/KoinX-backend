 const GiveMsg = async (req, res) => {
  try {
    return res.send("hello world");
  } catch (error) {
    console.error("Error in GiveMsg:", error);
    res.send("An error occurred while processing your request");
  }
};

export default GiveMsg