import { React, useEffect, useContext } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { API, setAuthToken } from "./config/api";
import { UserContext } from "./context/UserContext";

import { Route, Routes, useNavigate } from 'react-router-dom';
import Landingpage from './pages/landingpage'
import DetailCharity from './pages/detailcharitypage'
import AddCharity from './pages/addcharitypage'
import Profile from './pages/profilepage'
import ProfileCharity from './pages/profilecharitypage'
import ViewCharity from './pages/viewcharitypage'


if (localStorage.token) {
  setAuthToken(localStorage.token)
}

function App() {
  const bgColor = "#E8E8E8"
  const [state, dispatch] = useContext(UserContext);
  const navigate = useNavigate()

  useEffect(() => {
    if (!localStorage.token) {
      navigate("/")
    }
    setAuthToken(localStorage.token)
  }, [localStorage.token])

  const checkUser = async () => {
    try {
      const response = await API.get('/check-auth');
      if (response === 404) {
        return dispatch({
          type: 'AUTH_ERROR',
        });
      }

      let payload = response.data.data;
      payload.token = localStorage.token;

      dispatch({
        type: 'USER_SUCCESS',
        payload,
      })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);
  console.log(state);

  return (
    <>
      <div style={{ backgroundColor: bgColor }}>
        <Routes>
          <Route exact path='/' element={<Landingpage />} />
          <Route exact path='/detail/:id' element={<DetailCharity />} />
          <Route exact path='/add-charity' element={<AddCharity />} />
          <Route exact path='/profile' element={<Profile />} />
          <Route exact path='/charity-profile' element={<ProfileCharity />} />
          <Route exact path='/charity-profile/detail/:id' element={<ViewCharity />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
