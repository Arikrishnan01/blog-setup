import './App.css';
import Header from  "./components/Header/Header";
import { Routes, Route } from 'react-router-dom';
import Blogs from './Pages/Blogs/Blogs';
import UserBlogs from './Pages/UserBlogs/UserBlogs';
import UserBlogsDetails from './Pages/UserBlogsDetails/UserBlogsDetails';
import AddBlogs from './Pages/AddBlogs/AddBlogs';
import Homepages from './Pages/HomePage/HomePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepages/>} />
        <Route path='/main' element={<Header/>} />
        <Route path='/blogs' element={<Blogs/>} />
        <Route path='/userBlogs' element={<UserBlogs/>} />
        <Route path='/userBlogs/:id' element={<UserBlogsDetails/>} />
        <Route path='/blogs/add-blogs' element={<AddBlogs/>} />
      </Routes>
    </div>
  );
}

export default App;
