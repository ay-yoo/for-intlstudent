import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Calc from "./routes/Calc";
import Table from "./routes/Table";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Table />} />
      <Route path="/calc" element={<Calc />} />
    </Routes>
  );
}

export default App;
