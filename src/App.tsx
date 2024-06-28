import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { getNodesLocalStorage } from "./redux/workFlow/FlowSlice";
import SideBar from "./layout/sideBar";
import Landing from "./layout/Landing";
import Feedback from "./layout/Feedback";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNodesLocalStorage());
  }, [dispatch]);

  return (
    <Router>
      <div style={{ height: 800 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/main" element={<SideBar />} />
          <Route path="/feedback" element={<Feedback />} />
        </Routes>
      </div>
    </Router>
  );
}
