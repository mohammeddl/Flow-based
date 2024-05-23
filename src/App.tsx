import { useEffect } from "react";
import SideBar from "./layout/sideBar";
import { useDispatch } from "react-redux";
import { getNodesLocalStorage } from "./redux/workFlow/FlowSlice";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getNodesLocalStorage());
  }, [dispatch]);
  return (
    <>
      <SideBar />
    </>
  );
}
