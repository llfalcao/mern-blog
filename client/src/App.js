import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import Post from './views/Post';
import NotFound from './views/NotFound';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/mern-blog" element={<Home />} />
        <Route path="/mern-blog/posts/:post" element={<Post />} />
      </Routes>
    </>
  );
}

export default App;
