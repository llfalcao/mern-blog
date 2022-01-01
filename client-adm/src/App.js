import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './views/Home';
import PostEditor from './views/PostEditor';
import Posts from './views/Posts';

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/posts" element={<Posts />} />
        <Route
          path="/:post/edit"
          element={<PostEditor post={window.location.pathname.split('/')[1]} />}
        />
      </Routes>
    </>
  );
}

export default App;
